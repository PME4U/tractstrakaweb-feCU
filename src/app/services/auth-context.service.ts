import { Injectable } from '@angular/core';
import {
  HttpBackend,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

// import { CookieService } from 'ngx-cookie-service';
// import { Console } from 'console';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthContextService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router) {}

  getAccessToken() {
    // return this.cookieService.get('ttw-token');
    let currentUser: User;

    if (localStorage.getItem('currentUser') !== null) {
      currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    return currentUser.tokens.access;
  }

  getRefreshToken() {
    // return this.cookieService.get('ttw-refresh');
    let currentUser: User;

    if (localStorage.getItem('currentUser') !== null) {
      currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    return currentUser.tokens.refresh;
  }

  updateSavedToken(token) {
    // Get the existing data
    const existing: User = JSON.parse(localStorage.getItem('currentUser'));

    // Add new data to localStorage Array
    existing.tokens.access = token;

    // Save back to localStorage
    localStorage.setItem('currentUser', JSON.stringify(existing));
  }
}
