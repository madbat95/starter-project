import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  private highlightSubject = new Subject<{ key: string; color: string }>();
  constructor() {}

  getHighlightObservable() {
    return this.highlightSubject.asObservable();
  }

  highlightKey(key: string, color: string) {
    return this.highlightSubject.next({ key, color });
  }
}
