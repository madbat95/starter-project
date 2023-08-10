import { Component, Input } from '@angular/core';

@Component({
  selector: 'badge',
  templateUrl: './table-data-row.component.html',
  styleUrls: ['./table-data-row.component.scss'],
})
export class TableDataRowComponent {
  @Input() data: any;
}
