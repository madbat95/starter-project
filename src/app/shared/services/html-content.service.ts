import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HtmlContentService {
  contentRetrieved: boolean;
  constructor(private http: HttpClient) {}

  getContents() {
    return this.http.get(`reporting/content/`);
  }

  getContentById(id: any) {
    return this.http.get(`reporting/content/?report_id=${id}`);
  }

  createContent(requestBody: any) {
    return this.http.post(`reporting/content/`, requestBody);
  }

  updateContent(id: any, requestBody: any) {
    return this.http.patch(`reporting/content/${id}/`, requestBody);
  }
}
