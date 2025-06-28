import { HttpClient, HttpParams } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  startScan() {
    if (!this.url) {
      this.error = 'Please enter a URL.';
      return;
    }
    this.loading = true;
    this.error = '';
    this.scanResult = null;

    const params = new HttpParams().set('url', this.url);

    this.http.post('http://localhost:8080/api/scan', params).subscribe({
      next: (result) => {
        this.scanResult = result;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Scan failed. Please try again.';
        this.loading = false;
      },
    });
  }
}

