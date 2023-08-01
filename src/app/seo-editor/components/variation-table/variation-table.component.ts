import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-variation-table',
  templateUrl: './variation-table.component.html',
  styleUrls: ['./variation-table.component.scss'],
})
export class VariationTableComponent implements OnInit {
  @Input() data: { name: string; quantity: number }[] = [];
  @Input() selectedTable: string = 'Variation';
  json = JSON;

  ngOnInit(): void {}
}
