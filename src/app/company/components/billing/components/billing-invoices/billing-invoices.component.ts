import { Component } from '@angular/core';

@Component({
  selector: 'app-billing-invoices',
  templateUrl: './billing-invoices.component.html',
  styleUrls: ['./billing-invoices.component.scss'],
})
export class BillingInvoicesComponent {
  data = [
    {
      issuedDate: 'May 5, 2023',
      payment: '****9343',
      description: 'description here',
      price: '$20',
      status: 'Paid',
    },
  ];
}
