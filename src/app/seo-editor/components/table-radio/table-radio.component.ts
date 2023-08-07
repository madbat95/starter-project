import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-radio',
  templateUrl: './table-radio.component.html',
  styleUrls: ['./table-radio.component.scss'],
})
export class TableRadioComponent implements OnInit {
  selectedTable: string = 'Entity';
  @Output() data = new EventEmitter<any[]>();
  @Output() selectedTableChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.onTableSelectionChange();
  }

  onTableSelectionChange(): void {
    if (this.selectedTable === 'LSIKeywords') {
      this.selectedTableChange.emit(this.selectedTable);
    } else if (this.selectedTable === 'Entity') {
      this.selectedTableChange.emit(this.selectedTable);
    } else if (this.selectedTable === 'Variations') {
      this.selectedTableChange.emit(this.selectedTable);
    }
  }
}
