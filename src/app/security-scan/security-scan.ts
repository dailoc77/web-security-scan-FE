import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services';

@Component({
  selector: 'app-security-scan',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './security-scan.html',
  styleUrls: ['./security-scan.css'],
})
export class SecurityScanComponent {
  url: string = '';
  scanResult: any = null;
  loading: boolean = false;
  error: string = '';
  scanHistory: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  // Hàm lọc alerts trùng lặp
  private filterDuplicateAlerts(alerts: any[]): any[] {
    if (!alerts || !Array.isArray(alerts)) return [];

    const uniqueAlerts = new Map();

    alerts.forEach((alert) => {
      const key = `${alert.name || ''}_${alert.description || ''}`;
      if (!uniqueAlerts.has(key)) {
        uniqueAlerts.set(key, alert);
      }
    });

    return Array.from(uniqueAlerts.values());
  }

  startScan() {
    if (!this.url) {
      this.error = 'Please enter a URL.';
      return;
    }

    // Kiểm tra authentication state
    if (!this.authService.isAuthenticated()) {
      this.error = 'You must be logged in to perform a scan.';
      return;
    }

    // Đảm bảo chạy trong Angular zone
    this.ngZone.run(() => {
      this.loading = true;
      this.error = '';
      this.scanResult = null;
      this.cdr.detectChanges(); // Force change detection
    });

    // Get token để đảm bảo có authorization header
    const token = this.authService.getToken();
    console.log('Starting scan with token:', token ? 'Token exists' : 'No token');
    console.log('Authentication status:', this.authService.isAuthenticated());
    console.log('Current user:', this.authService.getCurrentUser());

    // Tạo headers với token nếu có
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    this.http
      .post<any>('http://127.0.0.1:8080/api/v1/scan', 
        { url: this.url },
        { headers }
      )
      .subscribe({
        next: (response) => {
          this.ngZone.run(() => {
            console.log('Scan completed', response);
            if (response) {
              // Lọc alerts trùng lặp nếu có
              if (response.alerts && Array.isArray(response.alerts)) {
                response.alerts = this.filterDuplicateAlerts(response.alerts);
              }

              // Lưu toàn bộ response để hiển thị chi tiết
              this.scanResult = response;
              
              // Thêm vào scanHistory
              const historyItem = {
                url: response.url || this.url,
                result: response,
                time: new Date(),
                riskLevel: response.risk_level,
                scan_time: response.scan_time,
              };
              
              console.log('Adding to scan history:', historyItem);
              this.scanHistory.unshift(historyItem);
              console.log('Updated scan history length:', this.scanHistory.length);
              
              this.loading = false;
              this.cdr.detectChanges(); // Force change detection
            } else {
              this.error = 'No scan result received from API';
              this.loading = false;
              this.cdr.detectChanges();
            }
          });
        },
        error: (err) => {
          this.ngZone.run(() => {
            console.error('Scan error:', err);
            if (err.status === 401) {
              this.error = 'Authentication failed. Please login again.';
              // Optionally redirect to login
              this.authService.logout();
            } else if (err.status === 403) {
              this.error = 'Access denied. You do not have permission to perform scans.';
            } else {
              this.error = 'Scan failed. Please try again.';
            }
            this.loading = false;
            this.cdr.detectChanges();
          });
        },
      });

    // getScanSummary(scanId: string) {
    //   this.http
    //     .get<any>(`http://127.0.0.1:8080/api/v1/scan/${scanId}`)
    //     .subscribe({
    //       next: (summary) => {
    //         console.log('Scan summary', summary);
    //         this.loading = false;
    //       },
    //       error: (err) => {
    //         this.error = 'Failed to get scan summary';
    //         this.loading = false;
    //         console.error('Summary error:', err);
    //       },
    //     });
  }

  // getScanSummary(scanId: string) {
  //   this.http
  //     .get<ScanSummary>(`http://localhost:8080/api/scan/${scanId}/summary`)
  //     .subscribe({
  //       next: (summary) => {
  //         console.log('Scan summary received', summary);
  //         this.scanResult = summary;

  //         // Add to scan history with timestamp and summary
  //         this.scanHistory.unshift({
  //           url: this.url,
  //           result: summary,
  //           time: new Date(),
  //           scanId: scanId,
  //         });

  //         this.loading = false;
  //       },
  //       error: (err) => {
  //         this.error = 'Failed to get scan summary. Please try again.';
  //         this.loading = false;
  //         console.error('Summary fetch error:', err);
  //       },
  //     });
  // }
}
