import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { EditMemberRolesComponent } from './components/edit-member-roles/edit-member-roles.component';
import { MembersService } from 'src/app/shared/services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  @Input() companyId: string;
  members: any;
  loading: boolean = false;
  constructor(
    private modalService: NzModalService,
    private memberService: MembersService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    if (this.companyId) {
      this.memberService.getMemebrs(this.companyId).subscribe({
        next: (members: any) => {
          this.members = members.results.map((result: any) => {
            const organizationUser = result.organization_user;
            const user = organizationUser.user;
            const groups = result.organization_group.map(
              (orgGroup: any) => orgGroup.group.name
            );

            const populatedUser: any = {
              firstname: user.first_name,
              lastname: user.last_name,
              groups: groups,
            };

            return populatedUser;
          });
          console.log(this.members);
          this.loading = false;
        },
      });
    }
  }

  hasBeneficialOwnerGroup(user: any): string {
    // const user = this.members.find((u) => u.firstname === userId);

    if (user && user.groups.includes('Beneficial Owner')) {
      return 'yes';
    } else {
      return 'no';
    }
  }

  addMember(): void {
    const modal = this.modalService.create({
      nzTitle:
        '<ng-template><h2 class="text-[23px]">Add Member</h2></ng-template>',
      nzContent: AddMemberComponent,
      nzWidth: 600,
      nzFooter: null,
      nzComponentParams: { companyId: this.companyId },
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
