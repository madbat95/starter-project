import { Component, OnInit } from '@angular/core';
import { WordCounterService } from '../../service/word-counter.service';
import { MetaDataService } from 'src/app/shared/services/meta-data.service';
import { TableLoaderService } from 'src/app/shared/services/table-loader.service';

@Component({
  selector: 'meta-button',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss'],
})
export class MetaComponent implements OnInit {
  metaTitle: string = '';
  metaDescription: string = '';
  isHighlightedKey = {};

  constructor(
    private wordCounter: WordCounterService,
    private metaDataService: MetaDataService,
    public tableLoaderService: TableLoaderService
  ) {
    this.metaDataService.getMetaTitle$().subscribe((title) => {
      this.metaTitle = title;
      this.updateWordCounts();
    });

    this.metaDataService.getMetaDescription$().subscribe((description) => {
      this.metaDescription = description;
      this.updateWordCounts();
    });
  }

  ngOnInit(): void {}

  highlightMeta(target: string, key: string, color: string) {
    const highlightedKeyStyle = `background-color: ${color};`;

    // Clone the target content
    const metaClone = this[target];

    if (this.isHighlightedKey && this.isHighlightedKey[key]) {
      this.isHighlightedKey[key] = false;

      const regex = new RegExp(
        `<span style="${highlightedKeyStyle}">(.*?)<\/span>`,
        'gi'
      );
      const unhighlightedContent = metaClone.replace(regex, '$1');
      this[target] = unhighlightedContent;
    } else {
      this.isHighlightedKey[key] = true;

      // Get the words associated with the specified key
      const words = this.wordCounter.wordObject[key];

      if (!words || words.length === 0) {
        return;
      }

      // Create a regular expression pattern to match the words
      const wordPattern = words.map((word) => `\\b${word.word}\\b`).join('|');
      const regex = new RegExp(`(${wordPattern})`, 'gi');

      const highlightedContent = metaClone.replace(
        regex,
        `<span style="${highlightedKeyStyle}">$1</span>`
      );

      // Update the target content with the highlighted content
      this[target] = highlightedContent;
    }
  }

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
