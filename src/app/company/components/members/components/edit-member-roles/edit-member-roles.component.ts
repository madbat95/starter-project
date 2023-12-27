import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-member-roles',
  templateUrl: './edit-member-roles.component.html',
  styleUrls: ['./edit-member-roles.component.scss'],
})
export class EditMemberRolesComponent {
  data = [
    {
      role: 'Account Manager',
      Description: 'Description here',
    },
    {
      role: 'Beneficial Owner',
      Description: 'Description here',
    },
    {
      role: 'Company Applicant',
      Description: 'Description here',
    },
    {
      role: 'Registered Agent',
      Description: 'Description here',
    },
    {
      role: 'Account Supervisor',
      Description: 'Description here',
    },
    {
      role: 'Billing',
      Description: 'Description here',
    },
  ];
}
