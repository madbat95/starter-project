import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { VariationPipe } from 'src/app/shared/pipes/variation.pipe';
import { TableLoaderService } from 'src/app/shared/services/table-loader.service';

@Component({
  selector: 'app-variation-table',
  templateUrl: './variation-table.component.html',
  styleUrls: ['./variation-table.component.scss'],
})
export class VariationTableComponent {
  @ViewChild('virtualTable', { static: false })
  nzTableComponent?: NzTableComponent<
    {
      word: string;
      count: { meta: number; summer_note: number };
      index: number;
    }[]
  >;
  constructor(
    public tableLoader: TableLoaderService,
    private variationPipe: VariationPipe
  ) {}

  searchValue = '';
  visible = false;
  tableData: {
    word: string;
    count: { meta: number; summer_note: number };
    index: number;
  }[] = [];
  originalData: any;
  @Input() set data(
    val: { word: string; count: { meta: number; summer_note: number } }[]
  ) {
    this.tableData = [];
    this.tableLoader.variationTableLoader = true;
    for (let i = 0; i < val.length; i++) {
      this.tableData.push({
        index: i,
        ...val[i],
      });
    }
    console.log('in table', this.tableData);
    this.tableLoader.variationTableLoader = false;
    this.originalData = [...this.tableData];
  }
  // reset(): void {
  //   this.searchValue = '';
  //   this.search();
  // }

  // search(): void {
  //   this.visible = false;
  //   this.tableData = this.originalData.filter(
  //     (item) => item.word.indexOf(this.searchValue) !== -1
  //   );
  // }

  deleteRow(word: string): void {
    this.tableData = this.tableData.filter((deleted) => deleted.word !== word);
  }

  trackByIndex(_: number, data: any): number {
    return data.index;
  }

  filterTable(): void {
    this.visible = false;
    this.tableData = this.variationPipe.transform(
      this.originalData,
      this.searchValue
    );
  }
  calculatePositiveCount(tableData: any): number {
    return tableData.filter(
      (item) => item.count.meta > 0 || item.count.summer_note > 0
    ).length;
  }
}
