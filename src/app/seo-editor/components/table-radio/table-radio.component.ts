import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { WordCounterService } from '../../service/word-counter.service';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'app-table-radio',
  templateUrl: './table-radio.component.html',
  styleUrls: ['./table-radio.component.scss'],
})
export class TableRadioComponent implements OnInit {
  @ViewChild('temp', { static: true, read: TemplateRef }) templateRef!: TemplateRef<{
    $implicit: NzSegmentedOption;
    index: number;
  }>;
  selectedTable: string = 'Entity';
  @Output() selectedTableChange = new EventEmitter<string>();
  constructor(private wordCounterService: WordCounterService) {}
  options = [
    { label: 'Entities', value: 'Entity', useTemplate: true },
    { label: 'Variations', value: 'Variations', useTemplate: true },
    { label: 'LSI KWs', value: 'LSIKeywords', useTemplate: true }
  ];

  handleIndexChange(e: any): void {
    this.selectedTableChange.emit(e.value);
  }
  ngOnInit(): void {
    // this.onTableSelectionChange();
  }

  onTableSelectionChange(): void {
    console.log('radiovalueemit', this.selectedTable);
    if (this.selectedTable === 'LSIKeywords') {
      this.selectedTableChange.emit(this.selectedTable);
    } else if (this.selectedTable === 'Entity') {
      this.selectedTableChange.emit(this.selectedTable);
    } else if (this.selectedTable === 'Variations') {
      this.selectedTableChange.emit(this.selectedTable);
    }
  }
  calculateRadioLength(selectedTable: any): number {
    return this.wordCounterService.wordObject[selectedTable].length;
  }
}
