import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EditorContentService {
  private scrapedDataSubject = new BehaviorSubject<string>('');

  constructor() {}

  getScrapedDataObservable() {
    return this.scrapedDataSubject.asObservable();
  }

  updateScrapedData(data: string) {
    this.scrapedDataSubject.next(data);
  }
}
