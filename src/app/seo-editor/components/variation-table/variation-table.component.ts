import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { VariationPipe } from 'src/app/shared/pipes/variation.pipe';
import { TableLoaderService } from 'src/app/shared/services/table-loader.service';
import { WordCounterService } from '../../service/word-counter.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-variation-table',
  templateUrl: './variation-table.component.html',
  styleUrls: ['./variation-table.component.scss'],
})
export class VariationTableComponent {
  @Input() selectedTable: string;
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
    private variationPipe: VariationPipe,
    private wordCounterService: WordCounterService,
    private notificationService: NotificationService
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

  deleteRow(id: number): void {
    this.tableLoader.variationTableLoader = true;
    this.wordCounterService
      .deleteWord(id)
      .pipe(finalize(() => (this.tableLoader.variationTableLoader = false)))
      .subscribe({
        next: () => {
          this.tableData = this.tableData.filter((data: any) => data.id !== id);
          this.notificationService.success('Word removed.');

          //updatig the radio count
          this.wordCounterService.wordObject[this.selectedTable] =
            this.wordCounterService.wordObject[this.selectedTable].filter(
              (data: any) => data.id !== id
            );
        }
      });
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
