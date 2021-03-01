import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { decode } from 'punycode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
  }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  public get userValue(): User {
    return this.userSubject.value;
  }

  loginUser(authData) {
    const body = JSON.stringify(authData);
    return this.http
      .post<any>(`${environment.apiUrl}/api/account/login/`, body, {
        headers: this.headers,
      })
      .pipe(
        map((user) => {
          this.userSubject.next(user);
          this.storageService.setUser(user);
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  isLoggedIn() {
    const ttwToken = this.storageService.getAccessToken();
    if (ttwToken) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.logoutToken();
    this.storageService.clearUser();
    this.router.navigate(['/login']);
  }

  logoutToken() {
    const refreshToken = {
      refresh: this.storageService.getRefreshToken(),
    };
    const body = JSON.stringify(refreshToken);

    this.http
      .post(`${environment.apiUrl}/api/account/logout/`, body, {
        headers: this.headers,
      })
      .subscribe();
  }

  registerUser(authData) {
    const body = JSON.stringify(authData);
    // return this.httpClient.post(`${this.baseUrl}api/account/create/`, body, {
    return this.http.post(`${environment.apiUrl}/api/account/register/`, body, {
      headers: this.headers,
    });
  }

  requestPasswordReset(authData) {
    const body = JSON.stringify(authData);
    // return this.httpClient.post(`${this.baseUrl}login/`, body, {
    console.log(body);
    return this.http.post(
      `${environment.apiUrl}/api/account/request-reset-email/`,
      body,
      {
        headers: this.headers,
      }
    );
  }

  passwordReset(authData) {
    const body = authData;
    console.log('Triggered');
    // return this.httpClient.post(`${this.baseUrl}login/`, body, {
    return this.http.patch(
      `${environment.apiUrl}/api/account/password-reset-complete/`,
      body,
      {
        headers: this.headers,
      }
    );
  }

  refreshToken() {
    const refreshToken = {
      refresh: this.storageService.getRefreshToken(),
    };
    const body = JSON.stringify(refreshToken);

    // console.log('Token Refreshed');

    return this.http
      .post<any>(`${environment.apiUrl}/api/account/token-refresh/`, body, {
        headers: this.headers,
      })
      .pipe(
        map((user) => {
          // console.log(user);

          this.userSubject.next(user);
          this.storageService.updateSavedToken(user);
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  // helper methods

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const token = this.storageService.getAccessToken();
    const jwtToken = JSON.parse(atob(token.split('.')[1]));
    // const jwtToken = JSON.parse(this.storageService.getRefreshToken());

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    // console.log('expires: ' + expires);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
    // console.log(this.refreshTokenTimeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}

// import { Injectable } from '@angular/core';
// import {
//   HttpBackend,
//   HttpClient,
//   HttpErrorResponse,
//   HttpHeaders,
// } from '@angular/common/http';
// import { Router } from '@angular/router';

// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// import { environment } from '../../environments/environment';

// import { User } from '../models/user.model';
// import { StorageService } from './storage.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private userSubject: BehaviorSubject<User>;
//   public user: Observable<User>;

//   constructor(
//     private storageService: StorageService,
//     private httpClient: HttpClient,
//     handler: HttpBackend,
//     private router: Router
//   ) {
//     this.httpClient = new HttpClient(handler);
//     this.userSubject = new BehaviorSubject<User>(null);
//     this.user = this.userSubject.asObservable();
//     // this.baseUrl = appConfig.baseUrl;
//   }

//   public get userValue(): User {
//     return this.userSubject.value;
//   }

//   headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//   });
//   // taggedHeaders = new HttpHeaders({
//   //   'Content-Type': 'application/json',
//   //   Authorization: 'Bearer ' + this.authContextService.getAccessToken(),
//   // });

//   loginUser(authData) {
//     const body = JSON.stringify(authData);
//     // return this.httpClient.post(`${this.baseUrl}login/`, body, {
//     return this.httpClient
//       .post(`${environment.apiUrl}/api/account/login/`, body, {
//         headers: this.headers,
//       })
//       .pipe(catchError(this.handleError));
//   }

//   registerUser(authData) {
//     const body = JSON.stringify(authData);
//     // return this.httpClient.post(`${this.baseUrl}api/account/create/`, body, {
//     return this.httpClient
//       .post(`${environment.apiUrl}/api/account/register/`, body, {
//         headers: this.headers,
//       })
//       .pipe(catchError(this.handleError));
//   }

//   refreshToken() {
//     const refreshToken = {
//       refresh: this.storageService.getRefreshToken(),
//     };
//     const body = JSON.stringify(refreshToken);
//     // return this.httpClient.post('api/account/token-refresh/', '',  {headers: this.refeshHeaders}).pipe(catchError(this.handleError));
//     return this.httpClient
//       .post(`${environment.apiUrl}/api/account/token-refresh/`, body, {
//         headers: this.headers,
//       })
//       .pipe(catchError(this.handleError));
//   }

//   isLoggedIn() {
//     const ttwToken = this.storageService.getAccessToken();
//     if (ttwToken) {
//       return true;
//     } else {
//       return false;
//     }
//   }
//   // refreshToken() {
//   //   const refreshToken = {
//   //     refresh: this.authContextService.getRefreshToken(),
//   //   };
//   //   const body = JSON.stringify(refreshToken);
//   //   // const accessToken = this.httpClient.post(
//   //   //   'api/account/token-refresh/',
//   //   //   body,
//   //   //   {
//   //   //     headers: this.headers,
//   //   //   }
//   //   // );
//   //   return this.httpClient
//   //     .post('api/account/token-refresh/', '', { headers: this.headers })
//   //     .pipe(catchError(this.handleError));
//   //   // if (accessToken) {
//   //   //   console.log('Token: ' + JSON.stringify(accessToken));
//   //   //   return accessToken;
//   //   // } else {
//   //   //   this.logout();
//   //   // }
//   // }

//   requestPasswordReset(authData) {
//     const body = JSON.stringify(authData);
//     // return this.httpClient.post(`${this.baseUrl}login/`, body, {
//     console.log(body);
//     return this.httpClient
//       .post(`${environment.apiUrl}/api/account/request-reset-email/`, body, {
//         headers: this.headers,
//       })
//       .pipe(catchError(this.handleError));
//   }

//   passwordReset(authData) {
//     const body = authData;
//     console.log('Triggered');
//     // return this.httpClient.post(`${this.baseUrl}login/`, body, {
//     return this.httpClient
//       .patch(
//         `${environment.apiUrl}/api/account/password-reset-complete/`,
//         body,
//         {
//           headers: this.headers,
//         }
//       )
//       .pipe(catchError(this.handleError));
//   }

//   logout() {
//     this.logoutToken();
//     this.storageService.clearUser();
//     this.router.navigate(['/']);
//   }

//   logoutToken() {
//     const refreshToken = {
//       refresh: this.storageService.getRefreshToken(),
//     };
//     const body = JSON.stringify(refreshToken);

//     this.httpClient
//       .post(`${environment.apiUrl}/api/account/logout/`, body, {
//         headers: this.headers,
//       })
//       .subscribe();
//   }

//   //  function to allow the logged in user to update their own account details
//   updateOwnUser(authData) {
//     const body = JSON.stringify(authData);
//     return this.httpClient
//       .post(
//         // `${this.baseUrl}api/account/my-account/`,
//         `${environment.apiUrl}/api/account/my-account/`,

//         body,
//         {
//           headers: this.headers,
//         }
//       )
//       .pipe(catchError(this.handleError));
//   }

//   handleError(err) {
//     // if (err.status === 401) {
//     //   this.logout();
//     // }

//     if (err instanceof HttpErrorResponse) {
//       // Server side error
//       // console.log('Server side ' + JSON.parse(err));
//     } else {
//       // Client side error
//       console.log('Client side ' + err.error.error);
//     }
//     return throwError(err);
//   }

//   // helper methods

//   private refreshTokenTimeout;

//   private startRefreshTokenTimer() {
//     // parse json object from base64 encoded jwt token
//     const jwtToken = JSON.parse(
//       atob(this.userValue.tokens.access.split('.')[1])
//     );

//     // set a timeout to refresh the token a minute before it expires
//     const expires = new Date(jwtToken.exp * 1000);
//     const timeout = expires.getTime() - Date.now() - 60 * 1000;
//     this.refreshTokenTimeout = setTimeout(
//       () => this.refreshToken().subscribe(),
//       timeout
//     );
//   }

//   private stopRefreshTokenTimer() {
//     clearTimeout(this.refreshTokenTimeout);
//   }
// }
