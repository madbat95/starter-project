import { Component, OnInit } from '@angular/core';
import { WordCounterService } from '../../service/word-counter.service';
import { MetaDataService } from 'src/app/shared/services/meta-data.service';

@Component({
  selector: 'meta-button',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss'],
})
export class MetaComponent implements OnInit {
  metaTitle: string = '';
  metaDescription: string = '';

  constructor(
    private wordCounter: WordCounterService,
    private metaDataService: MetaDataService
  ) {
    this.metaDataService
      .getMetaTitle$()
      .subscribe((title) => (this.metaTitle = title));

    this.metaDataService
      .getMetaDescription$()
      .subscribe((description) => (this.metaDescription = description));
  }

  ngOnInit(): void {}

  updateWordCounts() {
    this.resetWordCounts();

    const parser = new DOMParser();

    let meta = ['metaTitle', 'metaDescription'];

    for (const property of meta) {
      this.updateCountsForElement(this[property], property, parser);
      this.wordCounter.wordCount['WordTags'][property] =
        this.wordCounter.calculateTotalMetaWordCount(property);
    }
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
