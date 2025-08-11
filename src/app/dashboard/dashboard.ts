import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
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
      <app-security-scan #scanComp></app-security-scan>
      <app-scan-history [scanHistory]="scanComp.scanHistory"></app-scan-history>
    </div>
  `,
  styleUrls: ['../app.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  
  @ViewChild('scanComp') scanComponent?: SecurityScanComponent;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    console.log('Dashboard initialized');
    console.log('Authentication status:', this.authService.isAuthenticated());
    console.log('Current user:', this.authService.getCurrentUser());
    console.log('Token:', this.authService.getToken() ? 'Token exists' : 'No token');
    
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
