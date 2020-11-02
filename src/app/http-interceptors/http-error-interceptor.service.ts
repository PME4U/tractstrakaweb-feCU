import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
 } from '@angular/common/http';
 import { BehaviorSubject, Observable, throwError } from 'rxjs';
 import { retry, catchError, switchMap } from 'rxjs/operators';

 import { CookieService } from 'ngx-cookie-service';

 import { AuthService } from '../services/auth.service';

 interface RefreshResponse {
  refresh: string;
 }

 @Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    // private authService: AuthService
    private injector: Injector,
    private cookieService: CookieService,
   ) {}

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private authService = this.injector.get(AuthService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.status === 401) {
            errorMessage = `Token Refresh needed`;
            this.authService.refreshToken().subscribe(
              (result: RefreshResponse) => {
                // console.log(result.refresh);
                this.cookieService.set('ttw-token', result.refresh);
              });
          }  else {
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
           }
        })
      );
  }
  // private handle401Error(request: HttpRequest <any>, next: HttpHandler) {
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;
  //     this.refreshTokenSubject.next(null);

  //     return this.authService.refreshToken().pipe(
  //       switchMap((token: any) => {
  //         this.isRefreshing=false;
  //         this.refreshTokenSubject.next(token.access);
  //         return next.handle(this.add)
  //       })
  //     )

  //   }
  // }
}
