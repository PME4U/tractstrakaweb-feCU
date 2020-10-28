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

 import { AuthService } from '../services/auth.service';

export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    // private authService: AuthService
   ) {}

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.status === 401) {
            errorMessage = `Token Refresh needed`;
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
           }
            window.alert(errorMessage);
            return throwError(errorMessage);
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
