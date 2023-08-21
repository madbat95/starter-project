import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ScrapeService {

  constructor(private http: HttpClient) {}
  
  getHTML(url: any) {
    const headers = new HttpHeaders({ 'Accept': 'text/html' });
    return this.http.get(`reporting/scrap/?site_url=${url}`, { headers, responseType: 'text' });
  }
}
