import { Component } from '@angular/core';

@Component({
  selector: 'app-add-ons',
  templateUrl: './add-ons.component.html',
  styleUrls: ['./add-ons.component.scss'],
})
export class AddOnsComponent {
  data = [
    {
      options: 'Beneficial Owner or Senior Officer',
      price: '$20/Owner',
      quantity: '1',
      cost: '$20',
    },
    {
      options: 'BOI Report Update Filing',
      price: '$20/Filing',
      quantity: '1',
      cost: '$20',
    },
    {
      options: 'Expedited',
      price: '$20/Filing',
      quantity: '1',
      cost: '$20',
    },
    {
      options: 'Companyu FinCEN ID',
      price: '$20',
      quantity: '1',
      cost: '$20',
    },
  ];
}
