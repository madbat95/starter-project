import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seo-editor',
  templateUrl: './seo-editor.component.html',
  styleUrls: ['./seo-editor.component.css'],
})
export class SeoEditorComponent implements OnInit {
  wordObject: any;
  wordCountData: { [word: string]: number } = {};
  tableData: any[] = [];
  selectedTable: string = 'Entity';

  onTableSelection(selectedTable: any): void {
    this.selectedTable = selectedTable;
  }

  onDataReceived(data: any[]): void {
    console.log('onDataReceived', data);
    this.tableData = data;
  }

  onChange(wordCountData): void {
    // console.log('onchange', wordCountData);
    this.wordCountData = wordCountData;
  }

  onWordObject(onWordObject): void {
    console.log('onWordObject', onWordObject);
    this.wordObject = onWordObject;
  }

  getData() {
    console.log('wordObject', this.wordObject);
    console.log('selectedTable', this.selectedTable);
    return this.wordObject ? this.wordObject[this.selectedTable] : [];
  }

  // mapDataToTable(entityName: string, wordObject: any): any[] {
  // const entityData = [];

  // wordObject[entityName].forEach((word) => {
  //   entityData.push({ name: word.word, quantity: word.count });
  // });

  // console.log('entityData', entityData);
  // return entityData;

  // return this.wordObject[entityName]
  // }

  ngOnInit(): void {}
}
