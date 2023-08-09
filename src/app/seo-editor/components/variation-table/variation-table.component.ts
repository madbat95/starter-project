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
  @Input() set data(val: { word: string; count: number }[]) {
    this.tableData = val;
  }
  @Input() selectedTable: string = '';

  // tableData = [...this.tableData];
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.tableData = this.tableData.filter(
      (item) => item.word.indexOf(this.searchValue) !== -1
    );
  }
}
