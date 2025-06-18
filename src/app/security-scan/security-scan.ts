import { Component, Input } from '@angular/core';
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
  startScan() {
    if (!this.url) {
      alert('Please enter a URL.');
      return;
    }
    // TODO: Call backend API here
    console.log('Scanning:', this.url);
  }
}

