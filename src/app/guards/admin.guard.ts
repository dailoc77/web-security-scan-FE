import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Kiểm tra đăng nhập trước
  if (!authService.isAuthenticated()) {
    console.log('AdminGuard: User not authenticated, redirecting to auth');
    router.navigate(['/auth']);
    return false;
  }

  // Kiểm tra quyền admin
  if (authService.isAdmin()) {
    console.log('AdminGuard: User is admin, access granted');
    return true;
  } else {
    console.log('AdminGuard: User is not admin, redirecting to dashboard');
    console.log('User role:', authService.getUserRole());
    console.log('User data:', authService.getCurrentUser());
    // Không phải admin -> chuyển về dashboard với thông báo
    router.navigate(['/dashboard'], { 
      queryParams: { error: 'access_denied' } 
    });
    return false;
  }
};
