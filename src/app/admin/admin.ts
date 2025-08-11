import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header';
import { AuthService } from '../services';
import { HttpClient } from '@angular/common/http';

interface AdminStats {
  totalUsers: number;
  activeScans: number;
  totalScans: number;
  failedScans: number;
}

interface ChartData {
  day: string;
  scans: number;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './admin.html',
  styleUrls: ['../app.css', './admin.css']
})
export class AdminComponent implements OnInit {
  
  stats: AdminStats = {
    totalUsers: 0,
    activeScans: 0,
    totalScans: 0,
    failedScans: 0
  };

  chartData: ChartData[] = [];
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadAdminStats();
    this.loadChartData();
  }

  loadAdminStats() {
    this.loading = true;
    
    // Mock data - thay thế bằng API call thực tế
    setTimeout(() => {
      this.stats = {
        totalUsers: 4,
        activeScans: 3,
        totalScans: 20,
        failedScans: 3
      };
      this.loading = false;
    }, 1000);

    // Uncomment khi có API thực tế
    /*
    this.http.get<AdminStats>(`${this.API_BASE_URL}/api/admin/stats`).subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load admin statistics';
        this.loading = false;
      }
    });
    */
  }

  loadChartData() {
    // Mock data cho biểu đồ
    this.chartData = [
      { day: 'Day 1', scans: 28 },
      { day: 'Day 2', scans: 26 },
      { day: 'Day 3', scans: 35 },
      { day: 'Day 4', scans: 30 },
      { day: 'Day 5', scans: 28 },
      { day: 'Day 6', scans: 42 },
      { day: 'Day 7', scans: 38 },
      { day: 'Day 8', scans: 26 },
      { day: 'Day 9', scans: 30 },
      { day: 'Day 10', scans: 35 }
    ];
  }

  getChartHeight(scans: number): number {
    const maxScans = Math.max(...this.chartData.map(d => d.scans));
    return (scans / maxScans) * 100;
  }
}
