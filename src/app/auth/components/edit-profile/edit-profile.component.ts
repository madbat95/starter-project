import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  editUserForm!: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editUserForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    // Fetch the logged-in user data
    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.editUserForm.patchValue({
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        });
      },
      error: () => {
        this.notificationService.error('Error fetching user details:');
      },
    });
  }

  submitForm(): void {
    if (this.editUserForm.valid) {
      this.loading = true;
      this.authService.updateUser(this.editUserForm.value).subscribe({
        next: () => {
          this.notificationService.success('User profile updated');
          this.router.navigate(['/new-quote/step/1']);
          this.loading = false;
        },
        error: (error: any) => {
          this.notificationService.error(error);
          this.loading = false;
        },
      });
    } else {
      Object.values(this.editUserForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
