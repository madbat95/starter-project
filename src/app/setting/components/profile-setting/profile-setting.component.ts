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
import { forkJoin } from 'rxjs';

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
  profileForm!: FormGroup;

  // networkList = [
  //     {
  //         name: 'Facebook',
  //         icon: 'facebook',
  //         avatarColor: '#4267b1',
  //         avatarBg: 'rgba(66, 103, 177, 0.1)',
  //         status: true,
  //         link: 'https://facebook.com'
  //     },
  //     {
  //         name: 'Instagram',
  //         icon: 'instagram',
  //         avatarColor: '#fff',
  //         avatarBg: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',
  //         status: false,
  //         link: 'https://instagram.com'
  //     },
  //     {
  //         name: 'Twitter',
  //         icon: 'twitter',
  //         avatarColor: '#1ca1f2',
  //         avatarBg: 'rgba(28, 161, 242, 0.1)',
  //         status: true,
  //         link: 'https://twitter.com'
  //     },
  //     {
  //         name: 'Dribbble',
  //         icon: 'dribbble',
  //         avatarColor: '#d8487e',
  //         avatarBg: 'rgba(216, 72, 126, 0.1)',
  //         status: false,
  //         link: 'https://dribbble.com'
  //     },
  //     {
  //         name: 'Github',
  //         icon: 'github',
  //         avatarColor: '#323131',
  //         avatarBg: 'rgba(50, 49, 49, 0.1)',
  //         status: true,
  //         link: 'https://github.com'
  //     },
  //     {
  //         name: 'Linkedin',
  //         icon: 'linkedin',
  //         avatarColor: '#0174af',
  //         avatarBg: 'rgba(1, 116, 175, 0.1)',
  //         status: true,
  //         link: 'https://linkedin.com'
  //     },
  //     {
  //         name: 'Dropbox',
  //         icon: 'dropbox',
  //         avatarColor: '#005ef7',
  //         avatarBg: 'rgba(0, 94, 247, 0.1)',
  //         status: false,
  //         link: 'https://dropbox.com'
  //     }
  // ];

  // notificationConfigList = [
  //     {
  //         title: "Everyone can look me up",
  //         desc: "Allow people found on your public.",
  //         icon: "user",
  //         color: "ant-avatar-blue",
  //         status: true
  //     },
  //     {
  //         title: "Everyone can contact me",
  //         desc: "Allow any peole to contact.",
  //         icon: "mobile",
  //         color: "ant-avatar-cyan",
  //         status: true
  //     },
  //     {
  //         title: "Show my location",
  //         desc: "Turning on Location lets you explore what's around you.",
  //         icon: "environment",
  //         color: "ant-avatar-gold",
  //         status: false
  //     },
  //     {
  //         title: "Email Notifications",
  //         desc: "Receive daily email notifications.",
  //         icon: "mail",
  //         color: "ant-avatar-purple",
  //         status: true
  //     },
  //     {
  //         title: "Unknow Source ",
  //         desc: "Allow all downloads from unknow source.",
  //         icon: "question",
  //         color: "ant-avatar-red",
  //         status: false
  //     },
  //     {
  //         title: "Data Synchronization",
  //         desc: "Allow data synchronize with cloud server",
  //         icon: "swap",
  //         color: "ant-avatar-green",
  //         status: true
  //     },
  //     {
  //         title: "Groups Invitation",
  //         desc: "Allow any groups invitation",
  //         icon: "usergroup-add",
  //         color: "ant-avatar-orange",
  //         status: true
  //     },
  // ]

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private message: NzMessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      email: new FormControl({ value: '', disabled: true }),
      phone_number: new FormControl(''),
      date_of_birth: new FormControl(''),
      address: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
    });

    forkJoin([
      this.authService.getLoggedInUser(),
      this.authService.getLoggedInUserProfile(),
    ]).subscribe(([loggedInUser, loggedInUserProfile]) => {
      this.user = {
        id: loggedInUser.id,
        username: loggedInUser.username,
        first_name: loggedInUser.first_name,
        last_name: loggedInUser.last_name,
        email: loggedInUser.email,
        phone_number: loggedInUserProfile.phone_number,
        address: loggedInUserProfile.address,
        state: loggedInUserProfile.state,
        country: loggedInUserProfile.country,
        date_of_birth: loggedInUserProfile.date_of_birth,
        avatar: loggedInUserProfile.avatar,
      };

      this.profileForm.patchValue({
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        username: this.user.username,
        phone_number: this.user.phone_number,
        date_of_birth: this.user.date_of_birth,
        address: this.user.address,
        state: this.user.state,
        country: this.user.country,
      });
      console.log(this.user);
    });

    this.changePWForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  loadProfile(): void {}

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>Do you want to change your password?</i>',
      nzOnOk: () => this.message.success('Password Change Successfully'),
    });
  }

  submitchangePassword(): void {
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

  updateProfile(): void {
    if (this.profileForm.valid) {
      // const updatedUser: User = { ...this.user, ...this.profileForm.value };

      const updatedUser = {
        username: this.profileForm.value.username,
        first_name: this.profileForm.value.first_name,
        last_name: this.profileForm.value.last_name,
      };
      const updatedUserProfile = {
        user_id: this.user.id,
        phone_number: this.profileForm.value.phone_number,
        address: this.profileForm.value.address,
        state: this.profileForm.value.state,
        country: this.profileForm.value.country,
        date_of_birth: this.profileForm.value.date_of_birth,
      };

      forkJoin([
        this.authService.updateUser(updatedUser),
        this.authService.updateLoggedInUserProfile(updatedUserProfile),
      ]).subscribe(
        ([updatedUserData, updatedProfileData]) => {
          this.message.success('Profile updated successfully!');

          this.user = {
            ...this.user,
            ...updatedUserData,
            ...updatedProfileData,
          };
        },
        (error) => {
          // Handle error
          this.message.error('Error updating profile.');
        }
      );
    } else {
      this.message.warning('Please fill all required fields correctly.');
    }
  }
}
