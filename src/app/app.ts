import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { SecurityScanComponent } from './security-scan/security-scan';
import { ScanHistoryComponent } from './scan-history/scan-history';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SecurityScanComponent, ScanHistoryComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
