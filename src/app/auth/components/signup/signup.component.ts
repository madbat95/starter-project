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
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm: FormGroup;
  loading: boolean = false;
  showPassword = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService,
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
          this.loading = false;
          // this.router.navigate([
          //   '/auth/waiting',
          //   { email: this.signupForm.value.email },
          // ]
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.loading = false;
          this.message.error(error);
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
