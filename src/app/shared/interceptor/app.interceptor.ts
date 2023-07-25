import { catchError, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../services/notification.service';
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
      url: environment.apiUrl + req.url,
    });
    return next.handle(req).pipe(
      catchError((err: any, caught: Observable<any>) => {
        if (err.status == 500) return throwError(() => err);
        if (!req.url.includes('auth/jwt/refresh')) {
          if (Array.isArray(err.error)) {
            for (const error of err.error) {
              this.notificationService.error(error);
            }
          } else {
            for (const key in err.error) {
              if (Array.isArray(err.error[key])) {
                for (const error of err.error[key]) {
                  if (key !== 'non_field_errors') {
                    this.notificationService.error(`${key}: ${error}`);
                  } else {
                    this.notificationService.error(error);
                  }
                }
              } else if (typeof err.error[key] !== 'object') {
                this.notificationService.error(err.error[key]);
              }
            }
          }
          return throwError(() => err);
        }
      }),
      finalize(() => {})
    );
  }
}

export const httpInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
