import { Component } from '@angular/core';

@Component({
  selector: 'app-boif-table',
  templateUrl: './boif-table.component.html',
  styleUrls: ['./boif-table.component.scss'],
})
export class BoifTableComponent {
  data = [
    {
      time: 'June 5, 2024',
      filingType: 'BOI Report Update',
      requestedBy: 'John Malkovich',
      status: 'Pending',
    },
    {
      time: 'June 5, 2024',
      filingType: 'BOI Report Update',
      requestedBy: 'John Malkovich',
      status: 'Processing',
    },
    {
      time: 'June 5, 2024',
      filingType: 'BOI Report Update',
      requestedBy: 'John Malkovich',
      status: 'Completed',
    },
  ];
}
