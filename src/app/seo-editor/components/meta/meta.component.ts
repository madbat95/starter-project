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
    this.resetWordCounts();

    const parser = new DOMParser();

    this.updateCountsForElement(this.metaTitle, 'metaTitle', parser);
    this.updateCountsForElement(
      this.metaDescription,
      'metaDescription',
      parser
    );
  }

  resetWordCounts() {
    for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
      this.wordCounter.wordObject[entityType].forEach((word) => {
        word.count.meta = 0;
      });
    }
  }

  updateCountsForElement(
    elementContent: string,
    entityType: string,
    parser: DOMParser
  ) {
    const docElement = parser.parseFromString(elementContent, 'text/html');
    const elementContentWordCount =
      this.wordCounter.countWordsInHeadersAndContent(docElement.body, []);

    this.wordCounter.wordCountCalculate(elementContent, 'meta');

    for (const type of ['Entity', 'Variations', 'LSIKeywords']) {
      this.wordCounter.wordCount[type][entityType] =
        elementContentWordCount[type].content;
    }
  }
}
