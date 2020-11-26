import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthContextService } from '../services/auth-context.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    public auth: AuthService,
    private authContextService: AuthContextService
  ) {}

  handleError(error: HttpErrorResponse) {
    console.log('Error occured');
    return throwError(error);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = JSON.stringify(this.authContextService.getAccessToken());

    // console.log('Access Token: ' + token);

    if (token) {
      // console.log('Header Token');
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }

    if (!request.headers.has('Content-Type')) {
      // console.log('Header Content Type');
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });
    // console.log('Header Interceptor Returns: ' + JSON.stringify(request));

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('event--->>>', event);
        }
        return event;
      })
    );
  }
}

// @Injectable()
// export class AuthHeaderInterceptor implements HttpInterceptor {
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ) {
//     // throw new Error('Method not implemented.');

//     const token = 'My Token';
//     const authReq = req.clone({
//       setHeaders: Authorization: `Token ${token}`
//     });

//     return next.handle(authReq);
//   }
// }
