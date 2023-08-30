import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

// const AUTH_API = 'http://45.79.160.5:8000/';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
// };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private userDetailsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  userDetails$: Observable<any> = this.userDetailsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  login(requestBody: any): Observable<any> {
    return this.http.post('auth/jwt/create/', requestBody);
  }

  signup(requestBody: any): Observable<any> {
    return this.http.post('auth/users/', requestBody);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }

  getUserDetails(): any {
    return this.userDetailsSubject.value;
  }

  setUserDetails(user: any): void {
    this.userDetailsSubject.next(user);
  }

  createProfile(requestBody: any) {
    return this.http.post('profile/me/', requestBody);
  }

  updatePassword(requestBody) {
    return this.http.post('auth/users/set_password/', requestBody);
  }

  getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey);
  }

  setAccessToken(accessToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
  }

  verifyToken(token: string): boolean {
    return !this.jwtHelper.isTokenExpired(token);
  }

  recoverAccount(data) {
    return this.http.post('auth/users/reset_password/', data);
  }

  resetAccount(data) {
    return this.http.post('auth/users/reset_password_confirm/', data);
  }

  isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      return !this.jwtHelper.isTokenExpired(accessToken);
    }
    return false;
  }

  getLoggedInUser(): Observable<any> {
    return this.http.get('auth/users/me/');
  }

  getLoggedInUserProfile(): Observable<any> {
    return this.getLoggedInUser();
  }

  updateUser(data: any) {
    return this.http.patch('auth/users/me/', data);
  }
  updateLoggedInUserProfile(data: any): Observable<any> {
    return this.http.post('profile/me/', data);
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey);
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(this.refreshTokenKey);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post('auth/jwt/refresh', { refresh: refreshToken });
  }

  activateAccount(requestBody: any) {
    return this.http.post('auth/users/activation/', requestBody);
  }

  resendActivationMail(requestBody: any) {
    return this.http.post('auth/users/resend_activation/', requestBody);
  }
}
