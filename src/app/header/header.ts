import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  
  currentUser: any = null;
  isAdmin = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Header - Current user:', this.currentUser);
    
    // Sử dụng method isAdmin() từ AuthService
    this.isAdmin = this.authService.isAdmin();
    console.log('Header - Is admin:', this.isAdmin);
    console.log('Header - User role:', this.authService.getUserRole());
  }

  onLogout() {
    // Đăng xuất thông qua AuthService
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  goToAdmin() {
    console.log('Navigate to admin clicked');
    this.router.navigate(['/admin']);
  }

  goToDashboard() {
    console.log('Navigate to dashboard clicked');
    this.router.navigate(['/dashboard']);
  }
}
