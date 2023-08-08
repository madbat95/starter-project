import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seo-editor',
  templateUrl: './seo-editor.component.html',
  styleUrls: ['./seo-editor.component.css'],
})
export class SeoEditorComponent implements OnInit {
  wordObject: any; //this is for variation table
  wordCount: any; //this is for suggestion table
  metaTitle: any = ''; //title for summernote
  metaDescription: any = ''; //description for summernote
  tableData: any[] = [];
  selectedTable: string = 'Entity';

  onMetaTitle(metaTitle: any) {
    this.metaTitle = metaTitle;
  }
  onMetaDescription(metaDescription: any) {
    this.metaDescription = metaDescription;
  }

  onTableSelection(selectedTable: any): void {
    this.selectedTable = selectedTable;
  }

  onWordObject(onWordObject): void {
    console.log('onWordObject', onWordObject);
    this.wordObject = onWordObject;
  }
  onWordCount(onWordCount): void {
    this.wordCount = onWordCount;
  }

  getData() {
    return this.wordObject ? this.wordObject[this.selectedTable] : [];
  }

  getWordCount() {
    return this.wordCount ? this.wordCount : [];
  }

  getMetaTitle() {
    return this.metaTitle ? this.metaTitle : '';
  }
  getMetaDescription() {
    return this.metaDescription ? this.metaDescription : '';
  }

  ngOnInit(): void {}
}
