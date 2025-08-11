import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface GoogleLoginRequest {
  id_token: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user?: {
    id: string;
    username: string;
    email: string;
    role?: string; // Thêm role field
    is_admin?: boolean; // Alternative field cho admin check
  };
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Đăng nhập bằng Google (id_token)
   */
  loginWithGoogle(googleData: GoogleLoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/api/auth/google-login/`, googleData)
      .pipe(
        tap((response: AuthResponse) => {
          console.log('Google login response:', response);
          // Lưu thông tin user và token (chỉ khi browser)
          if (this.isBrowser && response.access) {
            localStorage.setItem('authToken', response.access);
            localStorage.setItem('refreshToken', response.refresh);
            if (response.user) {
              localStorage.setItem('user', JSON.stringify(response.user));
              this.currentUserSubject.next(response.user);
            }
            console.log('Google login tokens saved:', {
              access: !!response.access,
              refresh: !!response.refresh,
              user: response.user
            });
          }
        }),
        catchError(this.handleError)
      );
  }

  private readonly API_BASE_URL = 'http://localhost:8080'; // Cập nhật theo backend của bạn
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    // Kiểm tra user đã đăng nhập từ localStorage (chỉ khi browser)
    if (this.isBrowser) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.currentUserSubject.next(JSON.parse(savedUser));
      }
    }
  }

  /**
   * Đăng ký tài khoản mới
   */
  register(registerData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/api/auth/register/`, registerData)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Đăng nhập
   */
  login(loginData: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/api/auth/login/`, loginData)
      .pipe(
        tap(response => {
          console.log('Regular login response:', response);
          
          // MOCK: Tạm thời set admin role cho test (Remove khi có BE thực tế)
          if (loginData.username === 'admin' || loginData.username === 'truongdailoc.dev') {
            if (response.user) {
              response.user.role = 'admin';
              response.user.is_admin = true;
            } else {
              response.user = {
                id: '1',
                username: loginData.username,
                email: loginData.username + '@admin.com',
                role: 'admin',
                is_admin: true
              };
            }
            console.log('MOCK: Set admin role for test user');
          }
          
          // Lưu thông tin user và token (chỉ khi browser)
          if (this.isBrowser && response.access) {
            localStorage.setItem('authToken', response.access);
            localStorage.setItem('refreshToken', response.refresh);
            if (response.user) {
              localStorage.setItem('user', JSON.stringify(response.user));
              this.currentUserSubject.next(response.user);
            }
            console.log('Regular login tokens saved:', {
              access: !!response.access,
              refresh: !!response.refresh,
              user: response.user
            });
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Đăng xuất
   */
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
    this.currentUserSubject.next(null);
  }

  /**
   * Kiểm tra user đã đăng nhập chưa
   */
  isAuthenticated(): boolean {
    if (!this.isBrowser) return false;
    const token = localStorage.getItem('authToken');
    const isAuth = !!token;
    console.log('Checking authentication:', isAuth);
    return isAuth;
  }

  /**
   * Lấy token
   */
  getToken(): string | null {
    if (!this.isBrowser) return null;
    const token = localStorage.getItem('authToken');
    console.log('Getting token:', token ? 'Token exists' : 'No token found');
    return token;
  }

  /**
   * Lấy thông tin user hiện tại
   */
  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  /**
   * Kiểm tra user có phải admin không
   */
  isAdmin(): boolean {
    if (!this.isBrowser) return false;
    const user = this.getCurrentUser();
    return user?.role === 'admin' || user?.is_admin === true;
  }

  /**
   * Lấy role của user hiện tại
   */
  getUserRole(): string {
    const user = this.getCurrentUser();
    return user?.role || 'user';
  }

  /**
   * Redirect user sau khi đăng nhập thành công
   */
  redirectAfterLogin(): void {
    if (this.isAdmin()) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  /**
   * Xử lý lỗi HTTP
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Có lỗi xảy ra!';
    
    if (error.error instanceof ErrorEvent) {
      // Lỗi phía client
      errorMessage = `Lỗi: ${error.error.message}`;
    } else {
      // Lỗi phía server
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Dữ liệu không hợp lệ';
          break;
        case 401:
          errorMessage = 'Email hoặc mật khẩu không đúng';
          break;
        case 409:
          errorMessage = 'Email đã được sử dụng';
          break;
        case 422:
          errorMessage = error.error?.message || 'Dữ liệu không hợp lệ';
          break;
        case 500:
          errorMessage = 'Lỗi server. Vui lòng thử lại sau';
          break;
        case 0:
          errorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng';
          break;
        default:
          errorMessage = `Lỗi ${error.status}: ${error.error?.message || 'Không xác định'}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
