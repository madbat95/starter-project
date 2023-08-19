import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ScrapeService {
  constructor(private http: HttpClient) {}

  getHTML(url: any) {
    return this.http.get(`reporting/scrap/?site_url=${url}`);
  }
}
