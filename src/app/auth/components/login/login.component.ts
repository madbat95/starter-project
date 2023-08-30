import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/shared/services/auth.service';
// import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { User } from 'src/app/shared/interfaces/user.type';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logInForm!: FormGroup;
  loading = false;
  passwordVisible: boolean = false;
  user: User;
  // userProfile: UserProfile;

  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private authRoleService: AuthRoleService
  ) {}

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    console.log('Login');
    if (this.logInForm.valid) {
      this.loading = true;
      this.authService
        .login(this.logInForm.value)
        .pipe(
          switchMap((response) => {
            this.authService.setAccessToken(response.access);
            this.authService.setRefreshToken(response.refresh);
            console.log(this.authService.getLoggedInUser());
            return this.authService.getLoggedInUser();
          })
        )
        .subscribe({
          next: (user: User) => {
            this.authService.setUserDetails(user);
            this.router.navigate([this.authRoleService.getHomePage]);
          },
          error: (error) => {
            this.loading = false;
            // console.log(error);
          },
        });
    } else {
      Object.values(this.logInForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
