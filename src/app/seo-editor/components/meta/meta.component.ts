import { Component } from '@angular/core';
import { WordCounterService } from '../../service/word-counter.service';

@Component({
  selector: 'meta-button',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss'],
})
export class MetaComponent {
  metaTitle: string = '';
  metaDescription: string = '';

  constructor(private wordCounter: WordCounterService) {}

  updateWordCounts() {
    // // this code block will reset the word counts
    for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
      for (const word of this.wordCounter.wordObject[entityType]) {
        word.count.meta = 0;
      }
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(this.metaTitle, 'text/html');
    const metaElementCount = this.wordCounter.countWordsInHeadersAndContent(
      doc.body,
      []
    );
    this.wordCounter.wordCountCalculate(this.metaTitle, 'meta');

    const parser2 = new DOMParser();
    const doc2 = parser2.parseFromString(this.metaDescription, 'text/html');
    const metaElementCount2 = this.wordCounter.countWordsInHeadersAndContent(
      doc2.body,
      []
    );
    this.wordCounter.wordCountCalculate(this.metaDescription, 'meta');
  }
}
