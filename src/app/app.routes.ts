import { Routes } from '@angular/router';
import { AuthComponent } from './auth';
import { DashboardComponent } from './dashboard/dashboard';
import { authGuard, publicGuard } from './guards';

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
    path: '', 
    redirectTo: '/auth', 
    pathMatch: 'full' 
  }
];
