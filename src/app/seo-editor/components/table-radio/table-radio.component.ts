import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-radio',
  templateUrl: './table-radio.component.html',
  styleUrls: ['./table-radio.component.scss'],
})
export class TableRadioComponent implements OnInit {
  selectedTable: string = 'Entity';
  @Output() selectedTableChange = new EventEmitter<string>();
  constructor() {}
  ngOnInit(): void {
    this.onTableSelectionChange();
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
}
