import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header';
import { SecurityScanComponent } from '../security-scan';
import { ScanHistoryComponent } from '../scan-history';

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
export class DashboardComponent {
}
