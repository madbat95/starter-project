import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { EditMemberRolesComponent } from './components/edit-member-roles/edit-member-roles.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent {
  constructor(private modalService: NzModalService) {}
  data = [
    {
      memberName: 'John Malkovich',
      beneficialOwner: 'Yes',
      roles: 'Account Manager, Account Supervisor, Billing',
      actions: 'Action',
    },
    {
      memberName: 'John Malkovich',
      beneficialOwner: 'Yes',
      roles: 'Account Manager, Account Supervisor, Billing',
      actions: 'Action',
    },
    {
      memberName: 'John Malkovich',
      beneficialOwner: 'Yes',
      roles: 'Account Manager, Account Supervisor, Billing',
      actions: 'Action',
    },
    {
      memberName: 'John Malkovich',
      beneficialOwner: 'Yes',
      roles: 'Account Manager, Account Supervisor, Billing',
      actions: 'Action',
    },
    {
      memberName: 'John Malkovich',
      beneficialOwner: 'Yes',
      roles: 'Account Manager, Account Supervisor, Billing',
      actions: 'Action',
    },
  ];

  addMember(): void {
    const modal = this.modalService.create({
      nzTitle:
        '<ng-template><h2 class="text-[23px]">Add Member</h2></ng-template>',
      nzContent: AddMemberComponent,
      nzWidth: 600,
      nzFooter: null,
    });

    modal.afterClose.subscribe((res) => {
      if (res) {
      }
    });
  }

  editMember(): void {
    const modal = this.modalService.create({
      nzTitle:
        '<ng-template><h2 class="text-[23px]">Update Member Roles</h2></ng-template>',
      nzContent: EditMemberRolesComponent,
      nzWidth: 600,
      nzFooter: null,
    });

    modal.afterClose.subscribe((res) => {
      if (res) {
      }
    });
  }
}
