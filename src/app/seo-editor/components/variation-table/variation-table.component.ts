import { Component, Input, OnInit } from '@angular/core';
import { WordCountService } from '../../service/word-count.service';

@Component({
  selector: 'app-variation-table',
  templateUrl: './variation-table.component.html',
  styleUrls: ['./variation-table.component.scss'],
})
export class VariationTableComponent implements OnInit {
  // VariationData: any[] = [
  //   { name: 'Variation 1', quantity: 0 },
  //   { name: 'Variation 2', quantity: 0 },
  //   { name: 'Variation 3', quantity: 0 },
  //   { name: 'Variation 4', quantity: 0 },
  // ];
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
  // @Input() wordCountData: { [word: string]: number };
  @Input() data: { name: string; quantity: number }[] = [];
  json = JSON;
  selectedTable: string = 'Variation';
  constructor(private wordCountService: WordCountService) {}

  ngOnInit(): void {
    this.onTableSelectionChange();
  }

  onTableSelectionChange(): void {
    if (this.selectedTable == 'LSI') {
      this.data = this.LSIData;
    } else if (this.selectedTable == 'Entity') {
      this.data = this.EntityData;
    }
  }

  // if (this.selectedTable === 'Variation') {
  //   this.data = this.LSIData; } else

  // private mapDataToTable(wordCountData: {
  //   [word: string]: number;
  // }): { name: string; quantity: number }[] {
  //   return Object.entries(wordCountData).map(([name, quantity]) => ({
  //     name,
  //     quantity,
  //   }));
  // }
}
