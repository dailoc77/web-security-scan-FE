import { Routes } from '@angular/router';
import { AuthComponent } from './auth';
import { DashboardComponent } from './dashboard/dashboard';
import { AdminComponent } from './admin';
import { authGuard, publicGuard, adminGuard } from './guards';

export const routes: Routes = [
  { 
    path: 'auth', 
    component: AuthComponent,
    title: 'Đăng nhập - WebGuardian',
    canActivate: [publicGuard]
  },
  { 
    path: 'login', 
    redirectTo: '/auth' 
  },
  { 
    path: 'register', 
    redirectTo: '/auth' 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    title: 'Dashboard - WebGuardian',
    canActivate: [authGuard]
  },
  { 
    path: 'admin', 
    component: AdminComponent,
    title: 'Admin Panel - WebGuardian',
    canActivate: [adminGuard] // Sử dụng adminGuard đã cập nhật
  },
  { 
    path: '', 
    redirectTo: '/auth', 
    pathMatch: 'full' 
  }
];
