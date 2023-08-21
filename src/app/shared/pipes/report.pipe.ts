import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'report',
})
export class ReportPipe implements PipeTransform {
  transform(reports: any[], searchKeyword: string): any[] {
    if (!searchKeyword) {
      return reports;
    }

    searchKeyword = searchKeyword.toLowerCase();
    return reports.filter((report) => {
      return report.keyword.toLowerCase().includes(searchKeyword);
    });
  }
}
