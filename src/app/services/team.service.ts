import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})

export class TeamService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}


  getAll(apiUrl: string): Observable<Team[]> {
    return this.http.get<Team[]>(apiUrl, {
      // headers: this.getAuthHeaders(),
    });
  }

  getOne(apiUrl: string, id: Number): Observable<Team> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<Team>(apiUrl + id, {
      // headers: this.getAuthHeaders(),
    });
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(
      'api/system-parameter/team-create/',

      body
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/team-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/team-delete/' + id + '/';
    return this.http.delete(url, {
    });
  }
}
