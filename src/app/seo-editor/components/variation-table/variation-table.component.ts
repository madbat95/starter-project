import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-variation-table',
  templateUrl: './variation-table.component.html',
  styleUrls: ['./variation-table.component.scss'],
})
export class VariationTableComponent {
  searchValue = '';
  visible = false;
  tableData: { word: string; count: number }[] = [];
  originalData: any;
  @Input() set data(val: { word: string; count: number }[]) {
    this.tableData = val;
    this.originalData = [...this.tableData];
  }
  @Input() selectedTable: string = '';

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.tableData = this.originalData.filter(
      (item) => item.word.indexOf(this.searchValue) !== -1
    );
  }

  deleteRow(word: string): void {
    this.tableData = this.tableData.filter((deleted) => deleted.word !== word);
  }
}
