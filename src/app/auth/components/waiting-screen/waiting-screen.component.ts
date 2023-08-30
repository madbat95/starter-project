import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-waiting-screen',
  templateUrl: './waiting-screen.component.html',
  styleUrls: ['./waiting-screen.component.scss'],
})
export class WaitingScreenComponent implements OnInit {
  email: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
  }

  onSubmit() {
    this.authService.resendActivationMail({ email: this.email }).subscribe({
      next: (response: any) => {
        this.message.success('Verification Email has been resent');
      },
      error: (error: any) => {
        this.message.error('User already exists');
      },
    });
  }
}
