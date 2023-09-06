import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { WordCounterService } from '../../service/word-counter.service';
import { HighlightService } from '../../service/highlight.service';

@Component({
  selector: 'app-suggestion-table',
  templateUrl: './suggestion-table.component.html',
  styleUrls: ['./suggestion-table.component.scss'],
})
export class SuggestionTableComponent implements OnInit {
  tableData: any;
  blurState: boolean = false;
  titleIds: string[] = [
    'titleCount',
    'entityTitleCount',
    'lsiTitleCount',
    'variationTitleCount',
    'titleRequired',
    'entityTitleRequired',
    'lsiTitleRequired',
    'variationTitleRequired',
  ];

  descrIds: string[] = [
    'DescrCount',
    'entityDescrCount',
    'lsiDescrCount',
    'variationDescrCount',
    'DescrRequired',
    'entityDescrRequired',
    'lsiDescrRequired',
    'variationDescrRequired',
  ];

  H1Ids: string[] = [
    'H1Count',
    'entityH1Count',
    'lsiH1Count',
    'variationH1Count',
    'H1Required',
    'entityH1Required',
    'lsiH1Required',
    'variationH1Required',
  ];

  H2Ids: string[] = [
    'H2Count',
    'entityH2Count',
    'lsiH2Count',
    'variationH2Count',
    'H2Required',
    'entityH2Required',
    'lsiH2Required',
    'variationH2Required',
  ];
  H3Ids: string[] = [
    'H3Count',
    'entityH3Count',
    'lsiH3Count',
    'variationH3Count',
    'H3Required',
    'entityH3Required',
    'lsiH3Required',
    'variationH3Required',
  ];
  H4Ids: string[] = [
    'H4Count',
    'entityH4Count',
    'lsiH4Count',
    'variationH4Count',
    'H4Required',
    'entityH4Required',
    'lsiH4Required',
    'variationH4Required',
  ];
  H5Ids: string[] = [
    'H5Count',
    'entityH5Count',
    'lsiH5Count',
    'variationH5Count',
    'H5Required',
    'entityH5Required',
    'lsiH5Required',
    'variationH5Required',
  ];
  H6Ids: string[] = [
    'H6Count',
    'entityH6Count',
    'lsiH6Count',
    'variationH6Count',
    'H6Required',
    'entityH6Required',
    'lsiH6Required',
    'variationH6Required',
  ];

  contentIds: string[] = [
    'contentCount',
    'entityContentCount',
    'lsiContentCount',
    'variationContentCount',
    'contentRequired',
    'entityContentRequired',
    'lsiContentRequired',
    'variationContentRequired',
  ];

  constructor(
    private wordCounter: WordCounterService,
    private renderer: Renderer2,
    private el: ElementRef,
    private highlightService: HighlightService
  ) {}

  ngOnInit(): void {
    this.tableData = this.wordCounter.wordCount;
  }

  cellClass(metaTitle: number, metaTitleR: number): string {
    const ratio = metaTitle / metaTitleR;
    console.log();
    if (ratio >= 0 && ratio <= 0.5) {
      return 'bad';
    } else if (ratio >= 0.6 && ratio <= 0.7) {
      return 'better';
    } else if (ratio >= 0.8 && ratio <= 0.9) {
      return 'perfect';
    } else if (ratio >= 1.0) {
      return 'over-optimized';
    } else {
      return '';
    }
  }

  highlightKey(key: string, color: string) {
    this.highlightService.highlightKey(key, color);
  }

  highlightTag(tag: string) {
    this.highlightService.highlightTag(tag);
  }
  // titleBlur(): void {
  //   console.log('button pressed');

  //   this.blurState = !this.blurState;

  //   const allElements = this.el.nativeElement.querySelectorAll('[id]');
  //   allElements.forEach((element: HTMLElement) => {
  //     const id = element.getAttribute('id');
  //     if (id && !this.titleIds.includes(id)) {
  //       if (this.blurState) {
  //         this.renderer.setStyle(element, 'filter', 'blur(5px)');
  //       } else {
  //         this.renderer.removeStyle(element, 'filter');
  //       }
  //     }
  //   });
  // }

  // DescrBlur(): void {
  //   console.log('description button pressed');

  //   this.blurState = !this.blurState;

  //   const allElements = this.el.nativeElement.querySelectorAll('[id]');
  //   allElements.forEach((element: HTMLElement) => {
  //     const id = element.getAttribute('id');
  //     if (id && !this.descrIds.includes(id)) {
  //       if (this.blurState) {
  //         this.renderer.setStyle(element, 'filter', 'blur(5px)');
  //       } else {
  //         this.renderer.removeStyle(element, 'filter');
  //       }
  //     }
  //   });
  // }

  // toggleBlur(ids: string[]): void {
  //   this.blurState = !this.blurState;

  //   const allElements = this.el.nativeElement.querySelectorAll('[id]');
  //   allElements.forEach((element: HTMLElement) => {
  //     const id = element.getAttribute('id');
  //     if (id && !ids.includes(id)) {
  //       if (this.blurState) {
  //         this.renderer.setStyle(element, 'filter', 'blur(5px)');
  //       } else {
  //         this.renderer.removeStyle(element, 'filter');
  //       }
  //     }
  //   });
  // }
}
