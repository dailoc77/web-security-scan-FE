import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  console.log('Auth Interceptor - URL:', req.url);
  console.log('Auth Interceptor - Token exists:', !!token);

  // Nếu có token, thêm vào header Authorization
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log('Auth Interceptor - Added token to request');
    return next(authReq);
  }

  console.log('Auth Interceptor - No token, proceeding without auth header');
  return next(req);
};
