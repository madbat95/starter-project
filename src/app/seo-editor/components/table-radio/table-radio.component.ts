import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-radio',
  templateUrl: './table-radio.component.html',
  styleUrls: ['./table-radio.component.scss'],
})
export class TableRadioComponent implements OnInit {
  selectedTable: string = 'Variation';
  @Output() data = new EventEmitter<any[]>();
  @Output() selectedTableChange = new EventEmitter<string>();

  LSIData: any[] = [
    { name: 'LSI Keyword 1', quantity: 0 },
    { name: 'LSI Keyword 2', quantity: 0 },
    { name: 'LSI Keyword 3', quantity: 0 },
    { name: 'LSI Keyword 4', quantity: 0 },
  ];
  EntityData: any[] = [
    { name: 'Entity 1', quantity: 0 },
    { name: 'Entity 2', quantity: 0 },
    { name: 'Entity 3', quantity: 0 },
    { name: 'Entity 4', quantity: 0 },
  ];
  ngOnInit(): void {
    this.onTableSelectionChange();
  }

  onTableSelectionChange(): void {
    if (this.selectedTable === 'LSI') {
      this.data.emit(this.LSIData);

      this.selectedTableChange.emit(this.selectedTable);
    } else if (this.selectedTable === 'Entity') {
      this.data.emit(this.EntityData);
      this.selectedTableChange.emit(this.selectedTable);
    } else if (this.selectedTable === 'Variation') {
      this.data.emit([]);
      this.selectedTableChange.emit(this.selectedTable);
    }
  }
}
