import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { DatePipe, NgClass, CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface ScanSummary {
  riskLevel: string; // Critical, High, Medium, Low
  riskScore: number;
  scannedUrl: string;
  criticalVulnerabilities: string | string[];
}

interface ScanHistoryItem {
  url: string;
  time: Date;
  scanId?: string;
  result?: ScanSummary | any;
  error?: string;
}

@Component({
  selector: 'app-scan-history',
  standalone: true,
  imports: [DatePipe, NgClass, CommonModule],
  templateUrl: './scan-history.html',
  styleUrls: ['./scan-history.css'],
})
export class ScanHistoryComponent {
  @Input() scanHistory: ScanHistoryItem[] = [];

  // Extract recommendations by priority section (HIGH, MEDIUM, LOW)
  extractRecommendations(scanningResult: string): { title: string, content: string }[] {
    if (!scanningResult) return [];
    const recSection = scanningResult.split('RECOMMENDATIONS:')[1];
    if (!recSection) return [];
    // Match sections like 'HIGH PRIORITY:', 'MEDIUM PRIORITY:', 'LOW PRIORITY:'
    const matches = recSection.matchAll(/([A-Z ]+PRIORITY:)([\s\S]*?)(?=[A-Z ]+PRIORITY:|$)/g);
    const result: { title: string, content: string }[] = [];
    for (const match of matches) {
      const title = match[1].trim();
      const content = match[2].trim();
      if (content) {
        result.push({ title, content });
      }
    }
    return result;
  }
}
