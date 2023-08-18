import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReportService } from 'src/app/shared/services/report.service';

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss'],
})
export class ReportsTableComponent {
  searchKeyword = '';
  reports: any[] = [];
  loading = false;

  @Input() set newReport(val: any) {
    if (val) {
      this.reports.push(val);
    }
  }

  constructor(
    private reportService: ReportService,
    private NzMessageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.loading = true;
    this.reportService.getReports().subscribe((reports: any) => {
      this.reports = reports;
      this.loading = false;
    });
  }

  deleteReport(report: any): void {
    this.loading = true;
    this.reportService.deleteReport(report.id).subscribe({
      next: () => {
        this.NzMessageService.success('Report Deleted');
        this.loadReports();
        this.loading = false;
      },
      error: () => {
        this.NzMessageService.error('Report could not be deleted');
        this.loading = false;
      },
    });
  }
}
