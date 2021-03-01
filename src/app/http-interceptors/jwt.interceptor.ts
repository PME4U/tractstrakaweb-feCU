import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    // console.log('URL: ' + environment.apiUrl);
    // console.log('RequestURL: ' + request.url);
    const token = this.storageService.getAccessToken();
    const isLoggedIn = this.authService.isLoggedIn();
    const isApiUrl = request.url.startsWith('environment.apiUrl');
    // console.log('isApiUrl:' + isApiUrl);
    // console.log('isLoggedIn:' + isLoggedIn);
    if (isLoggedIn) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    // console.log(request);
    return next.handle(request);
  }
}
