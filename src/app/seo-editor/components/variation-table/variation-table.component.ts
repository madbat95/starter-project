import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { TableLoaderService } from 'src/app/shared/services/table-loader.service';

@Component({
  selector: 'app-variation-table',
  templateUrl: './variation-table.component.html',
  styleUrls: ['./variation-table.component.scss'],
})
export class VariationTableComponent implements AfterViewInit {
  @ViewChild('virtualTable', { static: false }) nzTableComponent?: NzTableComponent<{ word: string; count: { meta: number, summer_note: number }, index: number }[]>;
  constructor(public tableLoader: TableLoaderService) {}

  searchValue = '';
  visible = false;
  tableData: { word: string; count: { meta: number, summer_note: number }, index: number }[] = [
  ];
  originalData: any;
  @Input() set data(val: { word: string; count: { meta: number, summer_note: number } }[]) {
    console.log('val', val);
    this.tableData = [];
    this.tableLoader.variationTableLoader = true
    for (let i = 0; i < val.length; i++) {
      this.tableData.push({
        index: i,
        ...val[i]
      });
    }
    this.tableLoader.variationTableLoader = false
    console.log('table data',this.tableData)
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

  scrollToIndex(index: number): void {
    this.nzTableComponent?.cdkVirtualScrollViewport?.scrollToIndex(index);
  }

  trackByIndex(_: number, data: any): number {
    return data.index
  }

  ngAfterViewInit(): void {
    this.nzTableComponent?.cdkVirtualScrollViewport?.scrolledIndexChange
      // .pipe(takeUntil(this.destroy$))
      .subscribe((data: number) => {
        console.log('scroll index to', data);
      });
  }
}
