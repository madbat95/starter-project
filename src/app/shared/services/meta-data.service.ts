import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MetaDataService {
  private metaTitleSubject = new Subject<string>();
  private metaDescriptionSubject = new Subject<string>();

  setMetaTitle(title: string) {
    this.metaTitleSubject.next(title);
  }

  getMetaTitle$() {
    return this.metaTitleSubject.asObservable();
  }

  setMetaDescription(description: string) {
    this.metaDescriptionSubject.next(description);
  }

  getMetaDescription$() {
    return this.metaDescriptionSubject.asObservable();
  }
}
