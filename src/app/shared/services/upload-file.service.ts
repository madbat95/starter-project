import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient) {}

  private files: any[] = [];
  private filesSubject: BehaviorSubject<string[]> = new BehaviorSubject<any[]>(
    this.files
  );

  addFiles(files: NzUploadFile | NzUploadFile[]): void {
    if (Array.isArray(files)) {
      this.files.push(...files);
    } else {
      this.files.push(files);
    }
    this.filesSubject.next([...this.files]);
  }
  getFiles(): Observable<any[]> {
    return this.filesSubject.asObservable();
  }

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
