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
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      re_password: [null, [Validators.required]],
      // checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  submitForm(): void {
    if (this.signupForm.valid) {
      this.loading = true;
      this.authService.signup(this.signupForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.modal.info({
            nzTitle: 'Sign Up Successful',
            nzContent:
              'Please Check your regiestered email for verification purposes',
            nzOnOk: () => console.log('Info OK'),
          });

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
