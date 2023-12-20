import { Component } from '@angular/core';

@Component({
  selector: 'app-billing-overview',
  templateUrl: './billing-overview.component.html',
  styleUrls: ['./billing-overview.component.scss'],
})
export class BillingOverviewComponent {
  data = [
    {
      fieldName: 'Initial BOI Report',
      available: '1',
      purchased: '1',
    },
    {
      fieldName: 'beneficial Owners',
      available: '1',
      purchased: '1',
    },
    {
      fieldName: 'BOI Report Updates',
      available: '5',
      purchased: '5',
    },
    {
      fieldName: 'Expedite',
      available: '1',
      purchased: '1',
    },
  ];
}
