import { Component } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/interfaces/user.type';
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
})
export class SetPasswordComponent {
  changePWForm!: UntypedFormGroup;
  changeEmailForm!: UntypedFormGroup;
  changePreferencesForm!: UntypedFormGroup;
  currentPasswordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  reNewPasswordVisible: boolean = false;
  passwordLoading: boolean = false;
  loading: boolean = false;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private message: NzMessageService,
    private authService: AuthService
  ) {
    this.changePWForm = this.fb.group({
      current_password: new FormControl(null, Validators.required),
      new_password: new FormControl(null, Validators.required),
      re_new_password: new FormControl(null, Validators.required),
    });

    this.changeEmailForm = this.fb.group({
      current_email: new FormControl(null, Validators.required),
      new_email: new FormControl(null, Validators.required),
      re_new_email: new FormControl(null, Validators.required),
    });

    this.changePreferencesForm = this.fb.group({
      timezone: new FormControl(null, Validators.required),
      enable_2FA: new FormControl(true, Validators.required),
      enable_BOIF: new FormControl(true, Validators.required),
      enable_notification_alert: new FormControl(true, Validators.required),
    });
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>Do you want to change your password?</i>',
      nzOnOk: () => this.message.success('Password Change Successfully'),
    });
  }
  submitchangePassword(): void {
    if (this.changePWForm.valid) {
      this.passwordLoading = true;
      const passBody = {
        current_password: this.changePWForm.get('current_password')?.value,
        new_password: this.changePWForm.get('new_password')?.value,
        re_new_password: this.changePWForm.get('re_new_password')?.value,
      };

      this.authService.updatePassword(passBody).subscribe({
        next: () => {
          this.message.success('Password Updated');
          this.passwordLoading = false;
        },
        error: () => {
          this.message.error('Password Update Failed');
          this.passwordLoading = false;
        },
      });
    } else {
      Object.values(this.changePWForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submitchangeEmail() {}

  submitchangePreference() {}
}
