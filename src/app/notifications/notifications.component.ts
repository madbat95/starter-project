import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  data = [
    {
      alertTime: 'June 5, 2024',
      companyMember: 'John Malkovich',
      alertType: 'Beneficial Ownership',
      shortPreview: 'this is a short preview',
    },
    {
      alertTime: 'June 5, 2024',
      companyMember: 'John Malkovich',
      alertType: 'Beneficial Ownership',
      shortPreview: 'this is a short preview',
    },
    {
      alertTime: 'June 5, 2024',
      companyMember: 'John Malkovich',
      alertType: 'Beneficial Ownership',
      shortPreview: 'this is a short preview',
    },
    {
      alertTime: 'June 5, 2024',
      companyMember: 'John Malkovich',
      alertType: 'Beneficial Ownership',
      shortPreview: 'this is a short preview',
    },
    {
      alertTime: 'June 5, 2024',
      companyMember: 'John Malkovich',
      alertType: 'Beneficial Ownership',
      shortPreview: 'this is a short preview',
    },
  ];
}
