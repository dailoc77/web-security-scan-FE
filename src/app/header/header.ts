import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {}

  onLogout() {
    // Đăng xuất thông qua AuthService
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
