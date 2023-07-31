import { Component } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/interfaces/user.type';

@Component({
  templateUrl: './profile-setting.component.html',
})
export class ProfileSettingComponent {
  changePWForm: UntypedFormGroup;
  avatarUrl: string =
    'http://www.themenate.net/applicator/dist/assets/images/avatars/thumb-13.jpg';
  selectedCountry: any;
  selectedLanguage: any;
  user!: User;

  constructor(
    private fb: UntypedFormBuilder,
    private modalService: NzModalService,
    private message: NzMessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: () => {
        this.message.error('Error fetching user details:');
      },
    });

    this.changePWForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>Do you want to change your password?</i>',
      nzOnOk: () => this.message.success('Password Change Successfully'),
    });
  }

  submitForm(): void {
    for (const i in this.changePWForm.controls) {
      this.changePWForm.controls[i].markAsDirty();
      this.changePWForm.controls[i].updateValueAndValidity();
    }

    this.showConfirm();
  }

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    this.getBase64(info.file.originFileObj, (img: string) => {
      this.avatarUrl = img;
    });
  }
}
