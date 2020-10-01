import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    private httpClient: HttpClient
  ) // private cookieService: CookieService
  {}

  loginUser(authData) {
    const body = JSON.stringify(authData);
    // return this.httpClient.post(`${this.baseUrl}token/`, body, {
    return this.httpClient.post('api/token/', body, {
      headers: this.headers,
    });
  }

  registerUser(authData) {
    const body = JSON.stringify(authData);
    // return this.httpClient.post(`${this.baseUrl}api/account/create/`, body, {
    return this.httpClient.post('api/account/create/', body, {
      headers: this.headers,
    });
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
    );
  }

  // getAuthHeaders() {
  //   const token = this.cookieService.get('ttw-token');
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Token ${token}`,
  //   });
  // }
}
