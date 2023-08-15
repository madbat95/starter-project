import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getReports() {
    return this.http.get(`reporting/reports/`);
  }

  createReport(requestBody: any) {
    return this.http.post(`reporting/reports/`, requestBody);
  }

  deleteReport(id: any) {
    return this.http.delete(`reporting/reports/${id}/`);
  }
}
