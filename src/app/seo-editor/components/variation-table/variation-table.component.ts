import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-variation-table',
  templateUrl: './variation-table.component.html',
  styleUrls: ['./variation-table.component.scss'],
})
export class VariationTableComponent implements OnInit {
  VariationData: any[] = [];
  LSIData: any[] = [];
  EntityData: any[] = [];

  selectedTable: string = 'Variation';
  data: any[] = [];

  ngOnInit(): void {
    this.VariationData = [
      { name: 'Variation 1', quantity: 0 },
      { name: 'Variation 2', quantity: 0 },
      { name: 'Variation 3', quantity: 0 },
      { name: 'Variation 4', quantity: 0 },
    ];

    this.LSIData = [
      { name: 'LSI Keyword 1', quantity: 0 },
      { name: 'LSI Keyword 2', quantity: 0 },
      { name: 'LSI Keyword 3', quantity: 0 },
      { name: 'LSI Keyword 4', quantity: 0 },
    ];

    this.EntityData = [
      { name: 'Entity 1', quantity: 0 },
      { name: 'Entity 2', quantity: 0 },
      { name: 'Entity 3', quantity: 0 },
      { name: 'Entity 4', quantity: 0 },
    ];

    this.data = this.VariationData;
  }

  onTableSelectionChange(): void {
    if (this.selectedTable === 'Variation') {
      this.data = this.VariationData;
    } else if (this.selectedTable === 'LSI') {
      this.data = this.LSIData;
    } else if (this.selectedTable === 'Entity') {
      this.data = this.EntityData;
    }
  }
}
