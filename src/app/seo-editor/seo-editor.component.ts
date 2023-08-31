import { Component, OnInit } from '@angular/core';
import { WordCounterService } from './service/word-counter.service';
import { ThemeConstantService } from '../shared/services/theme-constant.service';

@Component({
  selector: 'app-seo-editor',
  templateUrl: './seo-editor.component.html',
  styleUrls: ['./seo-editor.component.css'],
})
export class SeoEditorComponent implements OnInit {
  wordObject: any; //this is for variation table
  wordCount: any; //this is for suggestion table
  tableData: any[] = [];
  selectedTable: string = 'Entity';
  editorContent: any;
  isFolded: boolean = true;
  constructor(
    public wordCounter: WordCounterService,
    private themeService: ThemeConstantService
  ) {}

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
    // this.themeService.toggleFold(V);
    this.toggleFold();
  }

  toggleFold() {
    this.themeService.toggleFold(this.isFolded);
  }
}
