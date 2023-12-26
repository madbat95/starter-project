import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent {
  memberForm!: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private nzMessageService: NzMessageService
  ) {
    this.memberForm = this.fb.group({
      role: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
  }
  sendInvite(): void {}
}
