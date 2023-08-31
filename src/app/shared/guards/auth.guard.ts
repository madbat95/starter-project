import { NotificationService } from './../services/notification.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthRoleService } from '../services/auth-role.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private authRoleService: AuthRoleService,
    private notificationService: NotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      if (state.url === '/') {
        this.router.navigate([this.authRoleService.getHomePage]);
        return false;
      }
      return true;
    } else {
      // this.notificationService.error('Your session is expired');
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
