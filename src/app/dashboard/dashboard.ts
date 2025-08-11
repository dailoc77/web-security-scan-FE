import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header';
import { SecurityScanComponent } from '../security-scan';
import { ScanHistoryComponent } from '../scan-history';
import { AuthService } from '../services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SecurityScanComponent, ScanHistoryComponent],
  template: `
    <div class="app-container">
      <app-header ngSkipHydration></app-header>
      
      <!-- Access Denied Message -->
      <div *ngIf="accessDeniedMessage" class="error-message access-denied">
        <span class="error-icon">🚫</span>
        <span>{{ accessDeniedMessage }}</span>
      </div>
      
      <app-security-scan #scanComp></app-security-scan>
      <app-scan-history [scanHistory]="scanComp.scanHistory"></app-scan-history>
    </div>
  `,
  styleUrls: ['../app.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  
  @ViewChild('scanComp') scanComponent?: SecurityScanComponent;
  accessDeniedMessage = '';

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('Dashboard initialized');
    console.log('Authentication status:', this.authService.isAuthenticated());
    console.log('Current user:', this.authService.getCurrentUser());
    console.log('Token:', this.authService.getToken() ? 'Token exists' : 'No token');
    console.log('Is admin:', this.authService.isAdmin());
    console.log('User role:', this.authService.getUserRole());
    
    // Kiểm tra query params cho access denied
    this.route.queryParams.subscribe(params => {
      if (params['error'] === 'access_denied') {
        this.accessDeniedMessage = 'Bạn không có quyền truy cập trang Admin. Chỉ có Admin mới có thể truy cập.';
        // Tự động ẩn thông báo sau 5 giây
        setTimeout(() => {
          this.accessDeniedMessage = '';
        }, 5000);
      }
    });
    
    // Force change detection sau khi init
    this.ngZone.run(() => {
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    console.log('Dashboard view initialized');
    console.log('Scan component:', this.scanComponent);
    if (this.scanComponent) {
      console.log('Scan component history length:', this.scanComponent.scanHistory.length);
    }
    
    // Force change detection sau khi view init
    this.ngZone.run(() => {
      this.cdr.detectChanges();
    });
  }
}
