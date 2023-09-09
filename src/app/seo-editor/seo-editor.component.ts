import { Component, OnDestroy, OnInit } from '@angular/core';
import { WordCounterService } from './service/word-counter.service';
import { ThemeConstantService } from '../shared/services/theme-constant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seo-editor',
  templateUrl: './seo-editor.component.html',
  styleUrls: ['./seo-editor.component.css'],
})
export class SeoEditorComponent implements OnInit, OnDestroy {
  wordObject: any; //this is for variation table
  wordCount: any; //this is for suggestion table
  tableData: any[] = [];
  selectedTable: string = 'Entity';
  editorContent: any;
  isFolded: boolean = true;
  reportId!: number;
  averageRatio: number = 0;
  constructor(
    private route: ActivatedRoute,
    public wordCounter: WordCounterService,
    private themeService: ThemeConstantService
  ) {}

  onAverageRatioChanged(averageRatio: number): void {
    this.averageRatio = averageRatio;
    console.log('Average Ratio changed:', averageRatio);
  }

  onTableSelection(selectedTable: any): void {
    this.selectedTable = selectedTable;
  }

  onEditorContent(onEditorContent): void {
    this.editorContent = onEditorContent;
  }

  get data() {
    return this.wordCounter.wordObject[this.selectedTable];
  }

  getWordCount() {
    return this.wordCounter.wordCount;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(({ params }: any) => {
      this.reportId = +params.id;
    });

    // this.themeService.toggleFold(V);
    this.toggleFold();
  }

  toggleFold() {
    this.themeService.toggleFold(this.isFolded);
  }

  ngOnDestroy(): void {
    this.wordCounter.wordCount = {
      Entity: {
        metaTitle: 0,
        metaTitleR: 0,
        metaDescription: 0,
        metaDescriptionR: 0,
        content: 0,
        contentR: 0,
        headers: {
          H1: 0,
          H1R: 0,
          H2: 0,
          H2R: 0,
          H3: 0,
          H3R: 0,
          H4: 0,
          H4R: 0,
          H5: 0,
          H5R: 0,
          H6: 0,
          H6R: 0,
        },
      },
      Variations: {
        metaTitle: 0,
        metaTitleR: 0,
        metaDescription: 0,
        metaDescriptionR: 0,
        content: 0,
        contentR: 0,
        headers: {
          H1: 0,
          H1R: 0,
          H2: 0,
          H2R: 0,
          H3: 0,
          H3R: 0,
          H4: 0,
          H4R: 0,
          H5: 0,
          H5R: 0,
          H6: 0,
          H6R: 0,
        },
      },
      LSIKeywords: {
        metaTitle: 0,
        metaTitleR: 0,
        metaDescription: 0,
        metaDescriptionR: 0,
        content: 0,
        contentR: 0,
        headers: {
          H1: 0,
          H1R: 0,
          H2: 0,
          H2R: 0,
          H3: 0,
          H3R: 0,
          H4: 0,
          H4R: 0,
          H5: 0,
          H5R: 0,
          H6: 0,
          H6R: 0,
        },
      },
      Words: {
        metaTitle: 0,
        metaTitleR: 0,
        metaDescription: 0,
        metaDescriptionR: 0,
        content: 0,
        contentR: 0,
        headers: {
          H1: 0,
          H1R: 0,
          H2: 0,
          H2R: 0,
          H3: 0,
          H3R: 0,
          H4: 0,
          H4R: 0,
          H5: 0,
          H5R: 0,
          H6: 0,
          H6R: 0,
        },
      },
    };
    this.wordCounter.wordObject = {
      Entity: [],
      Variations: [],
      LSIKeywords: [],
    };
    this.wordCounter.metaTitle = '';
    this.wordCounter.metaDescription = '';
  }
}
