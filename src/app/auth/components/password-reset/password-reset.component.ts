import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  uid: any;
  token: any;
  newPasswordForm!: FormGroup;
  loading: boolean = false;
  passwordVisible = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response: any) => {
        this.uid = response.params.uid;
        this.token = response.params.token;
      },
    });
    this.newPasswordForm = this.fb.group({
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  confirmationValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.newPasswordForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.newPasswordForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  onSubmit(): void {
    if (this.newPasswordForm.valid) {
      this.loading = true;
      const requestBody = {
        uid: this.uid,
        token: this.token,
        new_password: this.newPasswordForm.get('password')?.value,
      };

      this.authService.resetAccount(requestBody).subscribe({
        next: (response: any) => {
          this.message.success('Password updated successfully');
          this.router.navigate(['/auth/login']);
          this.loading = false;
        },
        error: (error: any) => {
          this.message.error('Password reset failed');
          this.loading = false;
        },
      });
    } else {
      Object.values(this.newPasswordForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
