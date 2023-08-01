import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordCountService {
  wordCountData: { [word: string]: number } = {};

  constructor() {}
}
