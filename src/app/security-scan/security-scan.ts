import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ScanSummary {
  url: string;
  timestamp: string;
  riskLevel: string;
  highRiskVulnerabilities: {
    name: string;
    recommendation: string;
  }[];
}

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
      .post<any>('http://127.0.0.1:8080/api/v1/scan', {url: this.url})
      .subscribe({
        next: (response) => {
          console.log('Scan initiated', response);
          if (response && response.scanId) {
            // this.getScanSummary(response.scanId);
            console.log('Scan ID:', response.scanId);
          } else {
            this.error = 'No scan ID received from API';
            this.loading = false;
          }
        },
        error: (err) => {
          this.error = 'Scan failed. Please try again.';
          this.loading = false;
          console.error('Scan error:', err);
        },
      });

    // First: start scan and get scanId (POST)
    // this.http.post<any>('http://localhost:8080/api/v1/scan', null, { params }).subscribe({
    //   next: (response) => {
    //     console.log('Scan initiated', response);
    //     if (response && response.scanId) {
    //       // Second: get the scan summary with scanId
    //       this.getScanSummary(response.scanId);
    //     } else {
    //       this.error = 'No scan ID received from API';
    //       this.loading = false;
    //     }
    //   },
    //   error: (err) => {
    //     this.error = 'Scan failed. Please try again.';
    //     this.loading = false;
    //     console.error('Scan error:', err);
    //   },
    // });
  }

  getScanSummary(scanId: string) {
    this.http
      .get<any>(`http://localhost:8080/api/v1/scan/${scanId}`)
      .subscribe({
        next: (summary) => {
          console.log('Scan summary', summary);
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to get scan summary';
          this.loading = false;
          console.error('Summary error:', err);
        },
      });
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
