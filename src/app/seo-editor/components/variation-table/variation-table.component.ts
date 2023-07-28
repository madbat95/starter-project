import { Component, OnInit } from '@angular/core';
import { WordCountService } from '../../service/word-count.service';

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
  static_data: any[] = [];
  data: { name: string; quantity: number }[] = [];
  constructor(private wordCountService: WordCountService) {}

  ngOnInit(): void {
    this.updateTableData();
    // this.VariationData = [
    //   { name: 'Variation 1', quantity: 0 },
    //   { name: 'Variation 2', quantity: 0 },
    //   { name: 'Variation 3', quantity: 0 },
    //   { name: 'Variation 4', quantity: 0 },
    // ];

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

    this.static_data = this.VariationData;
  }

  onTableSelectionChange(): void {
    this.updateTableData();
  }

  // onTableSelectionChange(): void {
  //   if (this.selectedTable === 'Variation') {
  //     this.data = this.VariationData;
  //   } else if (this.selectedTable === 'LSI') {
  //     this.static_data = this.LSIData;
  //   } else if (this.selectedTable === 'Entity') {
  //     this.static_data = this.EntityData;
  //   }
  // }
  private updateTableData(): void {
    if (this.selectedTable === 'Variation') {
      this.data = this.mapDataToTable(this.wordCountService.wordCountData);
    } else if (this.selectedTable === 'LSI') {
      // Replace with LSI data or any other data you want to display
      this.data = [];
    } else if (this.selectedTable === 'Entity') {
      // Replace with Entity data or any other data you want to display
      this.data = [];
    }
  }

  private mapDataToTable(wordCountData: {
    [word: string]: number;
  }): { name: string; quantity: number }[] {
    return Object.entries(wordCountData).map(([name, quantity]) => ({
      name,
      quantity,
    }));
  }
}
