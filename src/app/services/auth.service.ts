import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // baseUrl = 'http://127.0.0.1:8000/api/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private httpClient: HttpClient,
    handler: HttpBackend // private cookieService: CookieService
  ) {
    this.httpClient = new HttpClient(handler);
  }

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

  handleError(err) {
    if (err instanceof HttpErrorResponse){
      // Server side error

    } else {
      // Client side error
      
    }
    return throwError(err);
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
