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
  templateUrl: './profile-setting.component.html',
})
export class ProfileSettingComponent {
  selectedCountry: any;
  selectedLanguage: any;
  user!: User;
  profileForm!: FormGroup;
  changePWForm!: UntypedFormGroup;
  currentPasswordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  reNewPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private message: NzMessageService,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      email: new FormControl({ value: '', disabled: true }),
    });

    this.changePWForm = this.fb.group({
      current_password: new FormControl(null, Validators.required),
      new_password: new FormControl(null, Validators.required),
      re_new_password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe({
      next: (user: User) => {
        this.user = user;
        this.profileForm.patchValue({
          username: this.user.username,
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          email: this.user.email,
        });
        console.log(user);
      },
      error: (error: any) => {
        this.message.error(error);
      },
    });
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>Do you want to change your password?</i>',
      nzOnOk: () => this.message.success('Password Change Successfully'),
    });
  }

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  submitchangePassword(): void {
    const passBody = {
      current_password: this.changePWForm.get('current_password')?.value,
      new_password: this.changePWForm.get('new_password')?.value,
      re_new_password: this.changePWForm.get('re_new_password')?.value,
    };

    this.authService.updatePassword(passBody).subscribe({
      next: () => {
        this.message.success('Password Updated');
      },
      error: () => {
        this.message.error('Password Update Failed');
      },
    });
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      const updatedUser = {
        username: this.profileForm.value.username,
        first_name: this.profileForm.value.first_name,
        last_name: this.profileForm.value.last_name,
      };

      this.authService.updateUser(updatedUser).subscribe({
        next: (updatedUserData) => {
          this.message.success('Profile updated successfully!');
          this.authService.setUserDetails(updatedUserData);
        },
        error: (error) => {
          this.message.error('Error updating profile.');
        },
      });
    } else {
      this.message.warning('Please fill all required fields correctly.');
    }
  }
}
