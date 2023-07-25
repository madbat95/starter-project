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
export class AppGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private authRoleService: AuthRoleService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.authRoleService.getHomePage]);
      return false;
    }
  }
}
