import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  constructor(private http: HttpClient) {}

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
    this.loading = true;
    this.error = '';
    this.scanResult = null;

    // Prepare params for scan
    // const params = new HttpParams().set('url', this.url);

    this.http
      .post<any>('http://127.0.0.1:8080/api/v1/scan', { url: this.url })
      .subscribe({
        next: (response) => {
          console.log('Scan completed', response);
          if (response) {
            // Lọc alerts trùng lặp nếu có
            if (response.alerts && Array.isArray(response.alerts)) {
              response.alerts = this.filterDuplicateAlerts(response.alerts);
            }

            // Lưu toàn bộ response để hiển thị chi tiết
            this.scanResult = response;
            // Thêm vào scanHistory
            this.scanHistory.unshift({
              url: response.url,
              result: response,
              time: new Date(),
              riskLevel: response.risk_level,
              scan_time: response.scan_time,
            });
            this.loading = false;
          } else {
            this.error = 'No scan result received from API';
            this.loading = false;
          }
        },
        error: (err) => {
          this.error = 'Scan failed. Please try again.';
          this.loading = false;
          console.error('Scan error:', err);
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
