import { Component } from '@angular/core';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.scss'],
})
export class InvitesComponent {
  data = [
    {
      date: 'April 5, 2024',
      sent: 'someone1@email.com',
      role: 'Beneficial Owner',
      invitedBy: 'someone00@email.com',
      status: 'Declined',
    },
    {
      date: 'April 5, 2024',
      sent: 'someone2@email.com',
      role: 'Beneficial Owner',
      invitedBy: 'someone00@email.com',
      status: 'Pending',
    },
    {
      date: 'April 5, 2024',
      sent: 'someone3@email.com',
      role: 'Beneficial Owner',
      invitedBy: 'someone00@email.com',
      status: 'Accepted',
    },
    {
      date: 'April 5, 2024',
      sent: 'someone4@email.com',
      role: 'Beneficial Owner',
      invitedBy: 'someone00@email.com',
      status: 'Canceled',
    },
    {
      date: 'April 5, 2024',
      sent: 'someone5@email.com',
      role: 'Beneficial Owner',
      invitedBy: 'someone00@email.com',
      status: 'Pending',
    },
  ];
}
