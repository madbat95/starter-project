import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  emailForm!: FormGroup;
  loading = false;

  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private authRoleService: AuthRoleService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
    });
  }

  submitForm(): void {
    if (this.emailForm.valid) {
      this.loading = true;
      this.authService.recoverAccount(this.emailForm.value).subscribe({
        next: (response: any) => {
          this.message.success('please check your email');
          this.loading = false;
        },
        error: (error: any) => {
          this.message.error('error:', error);
          this.loading = false;
        },
      });
    } else {
      Object.values(this.emailForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
