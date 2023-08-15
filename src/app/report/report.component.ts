import { Component } from '@angular/core';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  newReport: any;
  onNewReport(newReport: any): void {
    this.newReport = newReport;
  }
}
