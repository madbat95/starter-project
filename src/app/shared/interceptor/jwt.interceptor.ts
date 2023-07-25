import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private accessTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${accessToken}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error.status === 401 &&
          !request.url.includes('auth/jwt/refresh') &&
          !request.url.includes('auth/jwt/create')
        ) {
          if (this.isRefreshing) {
            return this.accessTokenSubject.pipe(
              filter((token) => token !== null),
              take(1),
              switchMap((token) =>
                next.handle(this.addAuthHeader(request, token))
              )
            );
          } else {
            this.isRefreshing = true;
            this.accessTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
              catchError((error) => {
                this.authService.signOut();
                this.notificationService.error('Your session is expired');
                return throwError(error);
              }),
              switchMap((response) => {
                this.accessTokenSubject.next(response.access);
                this.authService.setAccessToken(response.access);
                this.authService.setRefreshToken(response.refresh);
                return next.handle(
                  this.addAuthHeader(request, response.access)
                );
              }),
              finalize(() => {
                this.isRefreshing = false;
              })
            );
          }
        } else if (error.status === 403) {
          this.authService.signOut();
          return throwError(error);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addAuthHeader(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `JWT ${token}`,
      },
    });
  }
}

export const jwtInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
];
