import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services';

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
  
  constructor(private router: Router, private authService: AuthService) {}
  
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
        this.router.navigate(['/dashboard']);
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
}
