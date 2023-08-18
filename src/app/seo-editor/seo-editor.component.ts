import { Component, OnInit } from '@angular/core';
import { WordCounterService } from './service/word-counter.service';

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
  constructor(public wordCounter: WordCounterService) {}

  onTableSelection(selectedTable: any): void {
    console.log('tableselected', selectedTable);
    this.selectedTable = selectedTable;
  }

  onEditorContent(onEditorContent): void {
    console.log('editor content', onEditorContent);
    this.editorContent = onEditorContent;
  }

  getData() {
    return this.wordObject
      ? this.wordObject[this.selectedTable]
      : this.wordCounter.wordObject[this.selectedTable];
  }

  getWordCount() {
    return this.wordCounter.wordCount;
  }

  ngOnInit(): void {}
}
