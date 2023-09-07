import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { WordCounterService } from '../../service/word-counter.service';
import { HighlightService } from '../../service/highlight.service';

@Component({
  selector: 'app-suggestion-table',
  templateUrl: './suggestion-table.component.html',
  styleUrls: ['./suggestion-table.component.scss'],
})
export class SuggestionTableComponent implements OnInit {
  tableData: any;
  // blurState: boolean = false;
  // titleIds: string[] = [
  //   'titleCount',
  //   'entityTitleCount',
  //   'lsiTitleCount',
  //   'variationTitleCount',
  //   'titleRequired',
  //   'entityTitleRequired',
  //   'lsiTitleRequired',
  //   'variationTitleRequired',
  // ];

  // descrIds: string[] = [
  //   'DescrCount',
  //   'entityDescrCount',
  //   'lsiDescrCount',
  //   'variationDescrCount',
  //   'DescrRequired',
  //   'entityDescrRequired',
  //   'lsiDescrRequired',
  //   'variationDescrRequired',
  // ];

  // H1Ids: string[] = [
  //   'H1Count',
  //   'entityH1Count',
  //   'lsiH1Count',
  //   'variationH1Count',
  //   'H1Required',
  //   'entityH1Required',
  //   'lsiH1Required',
  //   'variationH1Required',
  // ];

  // H2Ids: string[] = [
  //   'H2Count',
  //   'entityH2Count',
  //   'lsiH2Count',
  //   'variationH2Count',
  //   'H2Required',
  //   'entityH2Required',
  //   'lsiH2Required',
  //   'variationH2Required',
  // ];
  // H3Ids: string[] = [
  //   'H3Count',
  //   'entityH3Count',
  //   'lsiH3Count',
  //   'variationH3Count',
  //   'H3Required',
  //   'entityH3Required',
  //   'lsiH3Required',
  //   'variationH3Required',
  // ];
  // H4Ids: string[] = [
  //   'H4Count',
  //   'entityH4Count',
  //   'lsiH4Count',
  //   'variationH4Count',
  //   'H4Required',
  //   'entityH4Required',
  //   'lsiH4Required',
  //   'variationH4Required',
  // ];
  // H5Ids: string[] = [
  //   'H5Count',
  //   'entityH5Count',
  //   'lsiH5Count',
  //   'variationH5Count',
  //   'H5Required',
  //   'entityH5Required',
  //   'lsiH5Required',
  //   'variationH5Required',
  // ];
  // H6Ids: string[] = [
  //   'H6Count',
  //   'entityH6Count',
  //   'lsiH6Count',
  //   'variationH6Count',
  //   'H6Required',
  //   'entityH6Required',
  //   'lsiH6Required',
  //   'variationH6Required',
  // ];

  // contentIds: string[] = [
  //   'contentCount',
  //   'entityContentCount',
  //   'lsiContentCount',
  //   'variationContentCount',
  //   'contentRequired',
  //   'entityContentRequired',
  //   'lsiContentRequired',
  //   'variationContentRequired',
  // ];
  @Output() onAverageRatioChange: EventEmitter<number> =
    new EventEmitter<number>();

  constructor(
    private wordCounter: WordCounterService,
    private renderer: Renderer2,
    private el: ElementRef,
    private highlightService: HighlightService
  ) {}

  ngOnInit(): void {
    this.tableData = this.wordCounter.wordCount;
  }

  calculateAverageRatios(): number {
    let totalRatio = 0;
    let ratioCount = 0;

    const elementsToCalculateRatiosFor = [
      this.wordCounter.wordCount.Entity?.metaTitle,
      this.wordCounter.wordCount.Entity?.metaTitleR,
      this.wordCounter.wordCount.Entity?.metaDescription,
      this.wordCounter.wordCount.Entity?.metaDescriptionR,
      this.wordCounter.wordCount.Entity?.headers.H1,
      this.wordCounter.wordCount.Entity?.headers.H1R,
      this.wordCounter.wordCount.Entity?.headers.H2,
      this.wordCounter.wordCount.Entity?.headers.H2R,
      this.wordCounter.wordCount.Entity?.headers.H2,
      this.wordCounter.wordCount.Entity?.headers.H2R,
      this.wordCounter.wordCount.Entity?.headers.H3,
      this.wordCounter.wordCount.Entity?.headers.H3R,
      this.wordCounter.wordCount.Entity?.headers.H4,
      this.wordCounter.wordCount.Entity?.headers.H4R,
      this.wordCounter.wordCount.Entity?.headers.H5,
      this.wordCounter.wordCount.Entity?.headers.H5R,
      this.wordCounter.wordCount.Entity?.headers.H6,
      this.wordCounter.wordCount.Entity?.headers.H6R,
      this.wordCounter.wordCount.Entity?.content,
      this.wordCounter.wordCount.Entity?.contentR,

      this.wordCounter.wordCount.LSIKeywords?.metaTitle,
      this.wordCounter.wordCount.LSIKeywords?.metaTitleR,
      this.wordCounter.wordCount.LSIKeywords?.metaDescription,
      this.wordCounter.wordCount.LSIKeywords?.metaDescriptionR,
      this.wordCounter.wordCount.LSIKeywords?.headers.H1,
      this.wordCounter.wordCount.LSIKeywords?.headers.H1R,
      this.wordCounter.wordCount.LSIKeywords?.headers.H2,
      this.wordCounter.wordCount.LSIKeywords?.headers.H2R,
      this.wordCounter.wordCount.LSIKeywords?.headers.H2,
      this.wordCounter.wordCount.LSIKeywords?.headers.H2R,
      this.wordCounter.wordCount.LSIKeywords?.headers.H3,
      this.wordCounter.wordCount.LSIKeywords?.headers.H3R,
      this.wordCounter.wordCount.LSIKeywords?.headers.H4,
      this.wordCounter.wordCount.LSIKeywords?.headers.H4R,
      this.wordCounter.wordCount.LSIKeywords?.headers.H5,
      this.wordCounter.wordCount.LSIKeywords?.headers.H5R,
      this.wordCounter.wordCount.LSIKeywords?.headers.H6,
      this.wordCounter.wordCount.LSIKeywords?.headers.H6R,
      this.wordCounter.wordCount.LSIKeywords?.content,
      this.wordCounter.wordCount.LSIKeywords?.contentR,

      this.wordCounter.wordCount.Variations?.metaTitle,
      this.wordCounter.wordCount.Variations?.metaTitleR,
      this.wordCounter.wordCount.Variations?.metaDescription,
      this.wordCounter.wordCount.Variations?.metaDescriptionR,
      this.wordCounter.wordCount.Variations?.headers.H1,
      this.wordCounter.wordCount.Variations?.headers.H1R,
      this.wordCounter.wordCount.Variations?.headers.H2,
      this.wordCounter.wordCount.Variations?.headers.H2R,
      this.wordCounter.wordCount.Variations?.headers.H2,
      this.wordCounter.wordCount.Variations?.headers.H2R,
      this.wordCounter.wordCount.Variations?.headers.H3,
      this.wordCounter.wordCount.Variations?.headers.H3R,
      this.wordCounter.wordCount.Variations?.headers.H4,
      this.wordCounter.wordCount.Variations?.headers.H4R,
      this.wordCounter.wordCount.Variations?.headers.H5,
      this.wordCounter.wordCount.Variations?.headers.H5R,
      this.wordCounter.wordCount.Variations?.headers.H6,
      this.wordCounter.wordCount.Variations?.headers.H6R,
      this.wordCounter.wordCount.Variations?.content,
      this.wordCounter.wordCount.Variations?.contentR,
    ];

    for (let i = 0; i < elementsToCalculateRatiosFor.length; i += 2) {
      const count = elementsToCalculateRatiosFor[i];
      const required = elementsToCalculateRatiosFor[i + 1];

      if (count !== undefined && required !== undefined && required !== 0) {
        const ratio = count / required;
        totalRatio += ratio;
        ratioCount++;
      }
    }

    const averageRatio = Math.round((totalRatio / ratioCount) * 100);

    this.onAverageRatioChange.emit(averageRatio);
    return averageRatio;
  }

  cellClass(count: number, required: number): string {
    const ratio = count / required;
    console.log();
    if (ratio >= 0 && ratio < 0.6) {
      return 'bad';
    } else if (ratio >= 0.6 && ratio < 0.9) {
      return 'better';
    } else if (ratio >= 0.9 && ratio <= 1.2) {
      return 'perfect';
    } else if (ratio > 1.2) {
      return 'over-optimized';
    }
  }

  EntityFunction() {
    this.highlightKey('Entity', '#87f6e5');
    this.highlightMeta('metaDescription', 'Entity', '#87f6e5');
    this.highlightMeta('metaTitle', 'Entity', '#87f6e5');
  }

  VariationsFunction() {
    this.highlightKey('Variations', '#e58d3e');
    this.highlightMeta('metaDescription', 'Variations', '#e58d3e');
    this.highlightMeta('metaTitle', 'Variations', '#e58d3e');
  }

  LSIKeywordsFunction() {
    this.highlightKey('LSIKeywordsFunction', '#f6a9a9');
    this.highlightMeta('metaDescription', 'LSIKeywordsFunction', '#f6a9a9');
    this.highlightMeta('metaTitle', 'LSIKeywordsFunction', '#f6a9a9');
  }

  highlightKey(key: string, color: string) {
    this.highlightService.highlightKey(key, color);
  }

  highlightTag(tag: string) {
    this.highlightService.highlightTag(tag);
  }

  highlightMeta(meta: string, key: string, color: string) {
    this.highlightService.highlightMeta(meta, key, color);
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
