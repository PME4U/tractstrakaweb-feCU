// https://github.com/bartosz-io/jwt-auth-angular/blob/master/src/app/auth/token.interceptor.ts

import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { AuthContextService } from '../services/auth-context.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authContextService = this.injector.get(AuthContextService);

    if (!request.headers.has('Content-Type')) {
      // console.log('Header Content Type');
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    if (authContextService.getAccessToken()) {
      request = this.addToken(request, authContextService.getAccessToken());
    }

    return next.handle(request).pipe(
      catchError((error) => {
        let errorMessage = '';

        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          if (error.error instanceof ErrorEvent) {
            // client-side error
            // console.log('Client Side');
            errorMessage = `Client Error: ${error.error.message}`;
          } else {
            // server-side error
            // console.log('Server Side');
            errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          window.alert(errorMessage);
          return throwError(errorMessage);
          // return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    // console.log(token);
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    const authService = this.injector.get(AuthService);
    const authContextService = this.injector.get(AuthContextService);
    // console.log(this.isRefreshing);
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          authContextService.updateSavedToken(token);
          this.refreshTokenSubject.next(token.access);
          return next.handle(this.addToken(request, token.access));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((access) => {
          return next.handle(this.addToken(request, access));
        })
      );
    }
  }
}
