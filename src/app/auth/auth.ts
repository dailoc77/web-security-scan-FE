  import { Component, signal, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class AuthComponent {
  isLogin = signal(true);
  loading = signal(false);
  
  // Form data
  loginData = {
    username: '',
    password: ''
  };
  
  registerData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      (window as any).ngAuthComponentInstance = this;
      (window as any).ngZoneForGoogleLogin = ngZone;
    }
  }

  // Google Sign-In popup (client only)
  async googleSignIn() {
    if (typeof window === 'undefined') return;
    // Load Google Identity Services script nếu chưa có
    if (!document.getElementById('google-identity-script')) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.id = 'google-identity-script';
      document.body.appendChild(script);
      await new Promise(resolve => { script.onload = resolve; });
    }

    // Hiển thị popup đăng nhập Google
    const clientId = '151790877094-u6f3dkk7oe4opbe6n2p6nnc74s0ds0vn.apps.googleusercontent.com'; // Thay bằng client_id của bạn
    const callback = (response: any) => {
      if (response.credential) {
        // Đảm bảo callback chạy trong Angular zone
        this.ngZone.run(() => {
          this.onGoogleLogin(response.credential);
        });
      }
    };
    // @ts-ignore
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback,
      ux_mode: 'popup',
    });
    // @ts-ignore
    window.google.accounts.id.prompt();
  }
  
  // Toggle between login and register
  toggleMode() {
    this.isLogin.set(!this.isLogin());
    this.clearForms();
  }
  
  // Clear form data
  clearForms() {
    this.loginData = { username: '', password: '' };
    this.registerData = { username: '', email: '', password: '', confirmPassword: '' };
  }
  
  // Handle login  
  onLogin() {
    if (!this.loginData.username || !this.loginData.password) {
      alert('Vui lòng điền đầy đủ thông tin đăng nhập');
      return;
    }
    
    this.loading.set(true);
    
    const loginPayload = {
      username: this.loginData.username,
      password: this.loginData.password
    };

    console.log('Sending login request:', loginPayload);
    
    // Gọi API đăng nhập thông qua AuthService
    this.authService.login(loginPayload).subscribe({
      next: (response) => {
        this.loading.set(false);
        console.log('Login response:', response);
        alert('Đăng nhập thành công!');
        // Redirect based on user role
        this.authService.redirectAfterLogin();
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Login error:', error);
        alert(error.message || 'Đăng nhập thất bại. Vui lòng thử lại!');
      }
    });
  }
  
  // Handle register
  onRegister() {
    if (!this.registerData.username || !this.registerData.email || 
        !this.registerData.password || !this.registerData.confirmPassword) {
      alert('Vui lòng điền đầy đủ thông tin đăng ký');
      return;
    }
    
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp');
      return;
    }
    
    if (this.registerData.password.length < 6) {
      alert('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    
    this.loading.set(true);
    
    const registerPayload = {
      username: this.registerData.username,
      email: this.registerData.email,
      password: this.registerData.password
    };

    console.log('Sending register request:', registerPayload);
    
    // Gọi API đăng ký thông qua AuthService
    this.authService.register(registerPayload).subscribe({
      next: (response) => {
        this.loading.set(false);
        console.log('Register response:', response);
        alert('Đăng ký thành công!');
        // Chuyển về form đăng nhập sau khi đăng ký thành công
        this.isLogin.set(true);
        this.clearForms();
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Register error:', error);
        alert(error.message || 'Đăng ký thất bại. Vui lòng thử lại!');
      }
    });
  }

  // Đăng nhập Google
  onGoogleLogin(idToken: string) {
    this.ngZone.run(() => {
      this.loading.set(true);
      console.log('Processing Google login with token');
      
      this.authService.loginWithGoogle({ id_token: idToken }).subscribe({
        next: (response) => {
          this.ngZone.run(() => {
            this.loading.set(false);
            console.log('Google login successful:', response);
            
            // Đợi một chút để đảm bảo token được lưu và change detection hoàn tất
            setTimeout(() => {
              console.log('Navigation after Google login based on role');
              alert('Đăng nhập Google thành công!');
              // Redirect based on user role
              this.authService.redirectAfterLogin();
            }, 200); // Tăng timeout
          });
        },
        error: (error) => {
          this.ngZone.run(() => {
            this.loading.set(false);
            console.error('Google login error:', error);
            alert(error.message || 'Đăng nhập Google thất bại!');
          });
        }
      });
    });
  }
}
