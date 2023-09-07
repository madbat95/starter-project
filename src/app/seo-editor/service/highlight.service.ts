import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  private highlightMetaSubject = new Subject<{
    meta: string;
    key: string;
    color: string;
  }>();

  private highlightKeySubject = new Subject<{ key: string; color: string }>();
  private highlightTagSubject = new Subject<{ tag: string }>();
  constructor() {}

  getHighlightKeyObservable() {
    return this.highlightKeySubject.asObservable();
  }

  highlightKey(key: string, color: string) {
    return this.highlightKeySubject.next({ key, color });
  }

  getHighlightMetaObservable() {
    return this.highlightMetaSubject.asObservable();
  }

  highlightMeta(meta: string, key: string, color: string) {
    return this.highlightMetaSubject.next({ meta, key, color });
  }

  getHighlightTagObservable() {
    return this.highlightTagSubject.asObservable();
  }

  highlightTag(tag: any) {
    return this.highlightTagSubject.next(tag);
  }
}
