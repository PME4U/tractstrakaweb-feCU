import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthContextService {
  public user: Observable<User>;

  constructor(private cookieService: CookieService) {}

  getAccessToken() {
    let currentUser: User;

    if (localStorage.getItem('currentUser') !== null) {
      currentUser = JSON.parse(localStorage.getItem('currentUser'));
      // console.log(
      //   'Returned Token: ' + JSON.stringify(currentUser.tokens.access)
      // );
      return currentUser.tokens.access;
    }
    // return this.cookieService.get('ttw-token');
  }

  getRefreshToken() {
    let currentUser: User;

    if (localStorage.getItem('currentUser') !== null) {
      currentUser = JSON.parse(localStorage.getItem('currentUser'));
      // console.log(
      //   'Returned Token: ' + JSON.stringify(currentUser.tokens.refresh)
      // );
      return currentUser.tokens.refresh;
    }
    // return this.cookieService.get('ttw-refresh');
  }

  updateSavedToken(token) {
    // Get the existing data
    const existing: User = JSON.parse(localStorage.getItem('currentUser'));

    // Add new data to localStorage Array
    existing.tokens.access = token.access;

    // Save back to localStorage
    localStorage.setItem('currentUser', JSON.stringify(existing));
    // this.cookieService.set('ttw-token', token.access);
  }

  setUser(result) {
    this.cookieService.set('ttw-token', result.tokens.access);
    this.cookieService.set('ttw-refresh', result.tokens.refresh);
    localStorage.setItem('currentUser', JSON.stringify(result));
  }

  clearUser() {
    localStorage.clear();
    this.cookieService.delete('ttw-token');
    this.cookieService.delete('ttw-refresh');
  }
}
