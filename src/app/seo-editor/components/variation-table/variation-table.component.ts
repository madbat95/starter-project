import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-variation-table',
  templateUrl: './variation-table.component.html',
  styleUrls: ['./variation-table.component.scss'],
})
export class VariationTableComponent implements OnInit {
  tableData: { word: string; count: number }[] = [];
  @Input() set data(val: { word: string; count: number }[]) {
    console.log('val', val);
    this.tableData = val;
  }
  @Input() selectedTable: string = '';
  json = JSON;

  ngOnInit(): void {}
}
