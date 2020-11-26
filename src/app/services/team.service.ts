import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAll(apiUrl: string): Observable<Team[]> {
    return this.http.get<Team[]>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<Team> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<Team>('api/system-parameter/team-detail/' + id, {
      headers: this.headers,
    });
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(
      'api/system-parameter/team-create/',

      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/team-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/team-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
