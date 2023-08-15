import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient) {}

  postFile(requestBody: any) {
    return this.http.post(`reporting/configurations/`, requestBody);
  }
}
