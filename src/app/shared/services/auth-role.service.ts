import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthRoleService {
  private HOMEPAGE = '/home';
  constructor() {}

  get getHomePage() {
    return this.HOMEPAGE;
  }
}
