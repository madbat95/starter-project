import { switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  submitForm(): void {
    if (this.signupForm.valid) {
      this.loading = true;
      this.authService
        .signup(this.signupForm.value)
        .pipe(
          switchMap((user) =>
            this.authService.login({
              username: this.signupForm.get('username').value,
              password: this.signupForm.get('password').value,
            })
          ),
          switchMap((response) => {
            this.authService.setAccessToken(response.access);
            this.authService.setRefreshToken(response.refresh);
            return this.authService.createProfile({
              phone_number: 1234678,
              address: 'Test address',
            });
          }),
          switchMap((userDetail) => {
            return this.authService.getLoggedInUser();
          })
        )
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/new-quote/step/1']);
            this.loading = false;
          },
          error: (error) => {
            this.loading = false;
          },
        });
    } else {
      Object.values(this.signupForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() =>
      this.signupForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };
}
