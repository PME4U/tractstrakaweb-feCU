import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
// import { Console } from 'console';

import { AppConfig } from '../../config/app-config';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string;

  constructor(
    private appConfig: AppConfig,
    private httpClient: HttpClient,
    handler: HttpBackend,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.httpClient = new HttpClient(handler);
    this.baseUrl = appConfig.baseUrl;
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  // refeshHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Refresh' : this.refresh_token
  // });

  loginUser(authData) {
    const body = JSON.stringify(authData);
    // return this.httpClient.post(`${this.baseUrl}login/`, body, {
    return this.httpClient.post('api/account/login/', body, {
      headers: this.headers,
    }).pipe(catchError(this.handleError));
  }

  registerUser(authData) {
    const body = JSON.stringify(authData);
    // return this.httpClient.post(`${this.baseUrl}api/account/create/`, body, {
    return this.httpClient.post('api/account/register/', body, {
      headers: this.headers,
    }).pipe(catchError(this.handleError));
  }

  refreshToken () {
    const refreshToken = {
      refresh: this.getRefreshToken()
    };
    const body = JSON.stringify(refreshToken);
    console.log(body);
    // return this.httpClient.post('api/account/token-refresh/', '',  {headers: this.refeshHeaders}).pipe(catchError(this.handleError));
    return this.httpClient.post('api/account/token-refresh/',
      body, {
      headers: this.headers,
    });
  }

  getAccessToken() {
    return this.cookieService.get('ttw-token');
  }

  getRefreshToken() {
    return this.cookieService.get('ttw-refresh');
  }

  requestPasswordReset(authData) {
    const body = JSON.stringify(authData);
    // return this.httpClient.post(`${this.baseUrl}login/`, body, {
    return this.httpClient.post('http://localhost:8000/api/account/request-reset-email/', body, {
      headers: this.headers,
    }).pipe(catchError(this.handleError));
  }

  passwordReset(authData) {
    const body = authData;
    console.log('Triggered');
    // return this.httpClient.post(`${this.baseUrl}login/`, body, {
    return this.httpClient.patch('api/account/password-reset-complete/', body, {
      headers: this.headers,
    }).pipe(catchError(this.handleError));
  }

  handleError(err) {
    if (err instanceof HttpErrorResponse) {
      // Server side error
    } else {
      // Client side error
    }
    return throwError(err);
  }

  logout() {
    this.cookieService.delete('ttw-token');
    this.cookieService.delete('ttw-refresh');
    this.router.navigate(['/']);
  }

  //  function to allow the logged in user to update their own account details
  updateOwnUser(authData) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(
      // `${this.baseUrl}api/account/my-account/`,
      'api/account/my-account/',

      body
      // {
      //   headers: this.headers,
      // }
    ).pipe(catchError(this.handleError));
  }

  // getAuthHeaders() {
  //   const token = this.cookieService.get('ttw-token');
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Token ${token}`,
  //   });
  // }
}
