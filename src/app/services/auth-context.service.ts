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
    // console.log('Cookie: ' + this.cookieService.get('ttw-token'));
    // const userData: User = JSON.parse(this.cookieService.get('currentUser'));

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

  setUser(userData) {
    this.cookieService.set('currentUser', JSON.stringify(userData));
  }
}
