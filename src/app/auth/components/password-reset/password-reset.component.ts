import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        console.log('response', response);
        this.uid = response.params.uid;
        console.log('uid:', this.uid);
        this.token = response.params.token;
        console.log('token', this.token);
      },
    });
    this.newPasswordForm = this.fb.group({
      password: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
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
        this.router.navigate(['/auth/login']);
        this.loading = false;
      },
    });
  }
}
