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
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './profile-setting.component.html',
})
export class ProfileSettingComponent {
  selectedCountry: any;
  selectedLanguage: any;
  user!: User;
  userProfile!: any;
  profileForm!: FormGroup;

  loading: boolean = false;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private message: NzMessageService,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl({ value: '', disabled: true }),
      fincen_id: new FormControl('', [Validators.required]),
      suffix: new FormControl('', [Validators.required]),
      address_line1: new FormControl('', [Validators.required]),
      address_line2: new FormControl('', [Validators.required]),
      address_line3: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip_code: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.authService
      .getLoggedInUser()
      .pipe(
        switchMap((user: User) => {
          console.log('user', user);
          this.user = user;
          this.profileForm.patchValue({
            username: this.user.username,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            email: this.user.email,
            fincen_id: this.user.fincen_id,
            suffix: this.user.suffix,
          });

          return this.authService.getLoggedInUserProfile(this.user.id);
        })
      )
      .subscribe({
        next: (profile: any) => {
          this.userProfile = profile.results[0];
          console.log(profile);
          this.profileForm.patchValue({
            address_line1: this.userProfile.address_line1,
            address_line2: this.userProfile.address_line2,
            address_line3: this.userProfile.address_line3,
            city: this.userProfile.city,
            country: this.userProfile.country,
            state: this.userProfile.state,
            zip_code: this.userProfile.zip_code,
          });
        },
        error: (error: any) => {
          this.message.error(error);
        },
      });
  }

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  updateProfile(): void {
    this.loading = true;
    if (this.profileForm.valid) {
      const updatedUser = {
        username: this.profileForm.value.username,
        first_name: this.profileForm.value.first_name,
        last_name: this.profileForm.value.last_name,
        suffix: this.profileForm.value.suffix,
        email: this.profileForm.value.email,
      };

      const updatedUserProfile = {
        address_line1: this.profileForm.value.address_line1,
        address_line2: this.profileForm.value.address_line2,
        address_line3: this.profileForm.value.address_line3,
        city: this.profileForm.value.city,
        country: this.profileForm.value.country,
        state: this.profileForm.value.state,
        zip_code: this.profileForm.value.zip_code,
      };

      this.authService.updateUser(this.user.id, updatedUser).subscribe({
        next: (updatedUserData) => {
          this.message.success('Profile updated successfully!');
          this.authService.setUserDetails(updatedUserData);
          this.loading = false;
        },
        error: (error) => {
          this.message.error('Error updating profile.');
          this.loading = false;
        },
      });

      this.authService
        .updateLoggedInUserProfile(
          this.user.id,
          this.userProfile.results[0].id,
          updatedUserProfile
        )
        .subscribe({
          next: (updatedUserProfileData) => {
            this.message.success('Profile updated successfully!');
            this.authService.setUserDetails(updatedUserProfileData);
            this.loading = false;
          },
          error: (error) => {
            this.message.error('Error updating profile.');
            this.loading = false;
          },
        });
    } else {
      this.message.warning('Please fill all required fields correctly.');
    }
  }
}
