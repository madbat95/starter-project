import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReportService } from 'src/app/shared/services/report.service';
import { Router } from '@angular/router';

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

  @Input() set newReport(val: any) {
    if (val) {
      this.reports.push(val);
    }
  }

  constructor(
    private reportService: ReportService,
    private NzMessageService: NzMessageService,
    private router: Router
  ) {
    // if (this.newReport) {
    //   this.reports = [...this.reports, this.newReport];
    // }
  }

  reports: any[] = [];
  loading = false;

  ngOnInit(): void {
    this.loadReports();
  }

  navigate(id: any): void {
    this.router.navigate([`/admin/report/${id}`]);
  }

  loadReports(): void {
    this.loading = true;
    this.reportService.getReports().subscribe((reports: any) => {
      this.reports = reports;
      this.loading = false;
    });
  }

  deleteReport(report: any): void {
    this.reportService.deleteReport(report.id).subscribe({
      next: () => {
        this.NzMessageService.success('Report Deleted');
        this.loadReports();
      },
      error: () => {
        this.NzMessageService.error('Report could not be deleted');
      },
    });
  }
}
