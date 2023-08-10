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
    for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
      for (const word of this.wordCounter.wordObject[entityType]) {
        word.count.meta = 0;
      }
    }

    const parser = new DOMParser();
    const docTitle = parser.parseFromString(this.metaTitle, 'text/html');
    const metaTitleElementCount =
      this.wordCounter.countWordsInHeadersAndContent(docTitle.body, []);

    this.wordCounter.wordCountCalculate(this.metaTitle, 'meta');

    for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
      this.wordCounter.wordCount[entityType].metaTitle =
        metaTitleElementCount[entityType].content;
    }

    ////////////////////////////////////////////

    const docDescription = parser.parseFromString(
      this.metaDescription,
      'text/html'
    );
    const metaDescriptionElementCount =
      this.wordCounter.countWordsInHeadersAndContent(docDescription.body, []);

    this.wordCounter.wordCountCalculate(this.metaDescription, 'meta');

    for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
      this.wordCounter.wordCount[entityType].metaDescription =
        metaDescriptionElementCount[entityType].content;
    }
  }
}
