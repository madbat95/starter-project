import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReportService } from 'src/app/shared/services/report.service';

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss'],
})
export class ReportsTableComponent {
  reportsData: any[] = [
    {
      reportKeyword: 'kitchen remodeling los angeles',
      country: 'US',
      language: 'EN',
      created: 'an hour ago',
      wordCount: 0,
      contentGrade: '1/10',
      user: 'Saad Wakeel',
    },
    {
      reportKeyword: 'personal injury attorney los angeles',
      country: 'US',
      language: 'EN',
      created: 'an hour ago',
      wordCount: 0,
      contentGrade: '1/10',
      user: 'Saad Wakeel',
    },
    {
      reportKeyword: 'public adjuster los angeles',
      country: 'US',
      language: 'EN',
      created: 'an hour ago',
      wordCount: 0,
      contentGrade: '1/10',
      user: 'Saad Wakeel',
    },
  ];

  constructor(
    private reportService: ReportService,
    private NzMessageService: NzMessageService
  ) {}

  reports: any[] = [];
  loading = false;

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

  deleteLead(report: any): void {
    this.reportService.deleteReport(report.id).subscribe({
      next: () => {
        this.NzMessageService.success('Lead Deleted');
        this.loadReports();
      },
      error: () => {
        this.NzMessageService.error('Lead could not be deleted');
      },
    });
  }
}
