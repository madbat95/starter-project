import { Component, OnInit } from '@angular/core';
import { WordCounterService } from '../../service/word-counter.service';
import { MetaDataService } from 'src/app/shared/services/meta-data.service';
import { TableLoaderService } from 'src/app/shared/services/table-loader.service';
import { HighlightService } from '../../service/highlight.service';

@Component({
  selector: 'meta-button',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss'],
})
export class MetaComponent implements OnInit {
  metaTitle: string = '';
  metaDescription: string = '';
  isTitleHighlightedKey = {};
  isDescriptionHighlighted = {};

  constructor(
    private wordCounter: WordCounterService,
    private metaDataService: MetaDataService,
    public tableLoaderService: TableLoaderService,
    private highlightService: HighlightService
  ) {}

  ngOnInit(): void {
    this.metaDataService.getMetaTitle$().subscribe((title) => {
      this.metaTitle = title;
      this.updateWordCounts();
    });

    this.metaDataService.getMetaDescription$().subscribe((description) => {
      this.metaDescription = description;
      this.updateWordCounts();
    });

    this.highlightService.getHighlightMetaObservable().subscribe((data) => {
      this.highlightMeta(data.meta, data.key, data.color);
    });
  }

  highlightMeta(target: string, key: string, color: string) {
    const highlightedKeyStyle = `background-color: ${color};`;

    const isHighlightedKey =
      target === 'metaTitle'
        ? this.isTitleHighlightedKey
        : this.isDescriptionHighlighted;

    const metaClone = this[target];

    if (isHighlightedKey[key]) {
      isHighlightedKey[key] = false;

      const regex = new RegExp(
        `<span style="${highlightedKeyStyle}">(.*?)<\/span>`,
        'gi'
      );
      const unhighlightedContent = metaClone.replace(regex, '$1');
      this[target] = unhighlightedContent;
    } else {
      isHighlightedKey[key] = true;

      const words = this.wordCounter.wordObject[key];

      if (!words || words.length === 0) {
        return;
      }

      const wordPattern = words.map((word) => `\\b${word.word}\\b`).join('|');
      const regex = new RegExp(`(${wordPattern})`, 'gi');

      const highlightedContent = metaClone.replace(
        regex,
        `<span style="${highlightedKeyStyle}">$1</span>`
      );

      this[target] = highlightedContent;
    }
  }

  updateWordCounts() {
    this.resetWordCounts();
    const parser = new DOMParser();
    let meta = ['metaTitle', 'metaDescription'];

    for (const property of meta) {
      const metaText = this[property];
      this.updateCountsForElement(this[property], property, parser);

      this.wordCounter.calculateMetaTagWordCount(metaText, property);
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
