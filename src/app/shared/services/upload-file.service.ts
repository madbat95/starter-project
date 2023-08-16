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

  getFile(fileName: any) {
    return this.http.get(`reporting/configurations/?filename=${fileName}`);
  }

  getAllFiles() {
    return this.http.get(`reporting/configurations/`);
  }

  getWordsFromFiles(item_type: any, filename: any) {
    return this.http.get(
      `reporting/count-details/?item_type=${item_type}&filename=${filename}`
    );
  }
}
