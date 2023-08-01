import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seo-editor',
  templateUrl: './seo-editor.component.html',
  styleUrls: ['./seo-editor.component.css'],
})
export class SeoEditorComponent implements OnInit {
  wordCountData: { [word: string]: number } = {};
  tableData: any[] = [];
  selectedTable: string = '';

  onTableSelection(selectedTable: any): void {
    this.selectedTable = selectedTable;
  }

  onDataReceived(data: any[]): void {
    console.log('onDataReceived', data);
    this.tableData = data;
  }

  onChange(wordCountData): void {
    console.log('onchange', wordCountData);
    this.wordCountData = wordCountData;
  }

  mapDataToTable(wordCountData: {
    [word: string]: number;
  }): { name: string; quantity: number }[] {
    return Object.entries(wordCountData).map(([name, quantity]) => ({
      name,
      quantity,
    }));
  }

  ngOnInit(): void {}
}
