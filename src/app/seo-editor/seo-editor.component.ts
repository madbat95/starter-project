import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seo-editor',
  templateUrl: './seo-editor.component.html',
  styleUrls: ['./seo-editor.component.css'],
})
export class SeoEditorComponent implements OnInit {
  wordObject: any;
  wordCount: any;

  tableData: any[] = [];
  selectedTable: string = 'Entity';

  onTableSelection(selectedTable: any): void {
    this.selectedTable = selectedTable;
  }

  onWordObject(onWordObject): void {
    console.log('onWordObject', onWordObject);
    this.wordObject = onWordObject;
  }
  onWordCount(onWordCount): void {
    console.log('onWordCount', onWordCount);
    this.wordCount = onWordCount;
  }

  getData() {
    return this.wordObject ? this.wordObject[this.selectedTable] : [];
  }

  ngOnInit(): void {}
}
