import { Component, Input } from '@angular/core';
import { TableLoaderService } from 'src/app/shared/services/table-loader.service';

@Component({
  selector: 'app-variation-table',
  templateUrl: './variation-table.component.html',
  styleUrls: ['./variation-table.component.scss'],
})
export class VariationTableComponent {
  constructor(public tableLoader: TableLoaderService) {}

  searchValue = '';
  visible = false;
  tableData: { word: string; count: number }[] = [];
  originalData: any;
  @Input() set data(val: { word: string; count: number }[]) {
    console.log('val', val);
    this.tableData = val;
    this.originalData = [...this.tableData];
  }

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
