import { Injectable } from '@angular/core';
import {
  HttpBackend,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
// import { Console } from 'console';

import { User } from '../models/user.model';
import { AuthContextService } from './business-unit-level.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private authToken = JSON.stringify(this.getAccessToken());

  constructor(
    private authContextService: AuthContextService,
    private httpClient: HttpClient,
    handler: HttpBackend,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.httpClient = new HttpClient(handler);
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
    // this.baseUrl = appConfig.baseUrl;
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  taggedHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.getAccessToken(),
  });

  loginUser(authData) {
    const body = JSON.stringify(authData);
    // return this.httpClient.post(`${this.baseUrl}login/`, body, {
    return this.httpClient
      .post('api/account/login/', body, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  registerUser(authData) {
    const body = JSON.stringify(authData);
    // return this.httpClient.post(`${this.baseUrl}api/account/create/`, body, {
    return this.httpClient
      .post('api/account/register/', body, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  refreshToken() {
    const refreshToken = {
      refresh: this.getRefreshToken(),
    };
    const body = JSON.stringify(refreshToken);
    // return this.httpClient.post('api/account/token-refresh/', '',  {headers: this.refeshHeaders}).pipe(catchError(this.handleError));
    return this.httpClient
      .post('api/account/token-refresh/', body, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  getAccessToken() {
    // console.log('Cookie: ' + this.cookieService.get('ttw-token'));
    return this.cookieService.get('ttw-token');
  }

  getRefreshToken() {
    return this.cookieService.get('ttw-refresh');
  }

  updateSavedToken(token) {
    // const accessToken = JSON.stringify(token);
    // console.log('Set: ' + accessToken);
    this.cookieService.set('ttw-token', token.access);
  }

  requestPasswordReset(authData) {
    const body = JSON.stringify(authData);
    // return this.httpClient.post(`${this.baseUrl}login/`, body, {
    console.log(body);
    return this.httpClient
      .post('api/account/request-reset-email/', body, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  passwordReset(authData) {
    const body = authData;
    console.log('Triggered');
    // return this.httpClient.post(`${this.baseUrl}login/`, body, {
    return this.httpClient
      .patch('api/account/password-reset-complete/', body, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  handleError(err) {
    if (err instanceof HttpErrorResponse) {
      // Server side error
      // console.log('Server side ' + JSON.parse(err));
    } else {
      // Client side error
      console.log('Client side ' + err.error.error);
    }
    return throwError(err);
  }

  logout() {
    this.logoutToken();
    this.cookieService.delete('ttw-token');
    this.cookieService.delete('ttw-refresh');
    this.router.navigate(['/']);
  }

  logoutToken() {
    const refreshToken = {
      refresh: this.getRefreshToken(),
    };
    const body = JSON.stringify(refreshToken);

    this.httpClient
      .post('api/account/logout/', body, {
        headers: this.taggedHeaders,
      })
      .subscribe();
  }

  // logoutToken() {
  //   const refreshToken = {
  //     refresh: this.getRefreshToken(),
  //   };
  //   const body = JSON.stringify(refreshToken);

  //   // console.log(body);

  //   return this.httpClient.post('api/account/logout/', body, {
  //     headers: this.headers,
  //   });
  // }

  //  function to allow the logged in user to update their own account details
  updateOwnUser(authData) {
    const body = JSON.stringify(authData);
    return this.httpClient
      .post(
        // `${this.baseUrl}api/account/my-account/`,
        'api/account/my-account/',

        body
        // {
        //   headers: this.headers,
        // }
      )
      .pipe(catchError(this.handleError));
  }

  // getAuthHeaders() {
  //   const token = this.cookieService.get('ttw-token');
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Token ${token}`,
  //   });
  // }
}
