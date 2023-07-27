import { Component } from '@angular/core';

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
}
