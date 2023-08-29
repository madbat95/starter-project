import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss'],
})
export class ActivateComponent implements OnInit {
  loading: boolean = false;
  uid: any;
  token: any;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
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
  }

  onClick() {
    this.loading = true;
    const requestBody = {
      uid: this.uid,
      token: this.token,
    };

    this.authService.activateAccount(requestBody).subscribe({
      next: (response: any) => {
        this.message.success('Account succesfully activated');
        this.loading = false;
        this.router.navigate(['auth/login']);
      },
      error: (error: any) => {
        this.message.error('error:', error);
        this.router.navigate(['auth/login']);
        this.loading = false;
      },
    });
  }
}
