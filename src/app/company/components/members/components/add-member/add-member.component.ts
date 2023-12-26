import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { MembersService } from 'src/app/shared/services/members.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {
  @Input() companyId: any;
  memberForm!: FormGroup;
  loading: boolean = false;
  roles: any[] = [];
  selectedRoleIds: number[] = [];

  constructor(
    private fb: FormBuilder,
    private nzMessageService: NzMessageService,
    private memberService: MembersService,
    private modal: NzModalRef
  ) {
    this.memberForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.memberService.getOrganizationRoles(this.companyId).subscribe({
      next: (roles: any) => {
        this.roles = roles.results.map((role: any) => ({
          id: role.id,
          name: role.name,
          direction: 'left',
          checked: false,
        }));
        console.log('this.roles', this.roles);
      },
    });
  }

  change(ret: any): void {
    if (ret.from === 'left' && ret.to === 'right') {
      this.selectedRoleIds = ret.list.map((item: any) => item.id);
      console.log('IF this.selectedRoleIds', this.selectedRoleIds);
    } else if (ret.from === 'right' && ret.to === 'left') {
      this.selectedRoleIds = [];
      console.log('ELSE this.selectedRoleIds', this.selectedRoleIds);
    }
  }

  sendInvite(): void {
    this.loading = true;
    const requestBody = {
      email: this.memberForm.value.email,
      organization: this.companyId,
      organization_group: this.selectedRoleIds,
      is_admin: true,
    };

    this.memberService.sendInvite(requestBody).subscribe({
      next: (response: any) => {
        this.nzMessageService.success('Invitation sent successfully!');
        this.loading = false;
        this.modal.close();
      },
      error: (error: any) => {
        console.error('Error sending invite:', error);
        this.nzMessageService.error(
          'Error sending invitation. Please try again.'
        );
        this.loading = false;
        this.modal.close();
      },
    });
  }
}
