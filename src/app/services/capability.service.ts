import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { Capability } from '../models/capability.model';

@Injectable({
  providedIn: 'root',
})
export class CapabilityService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAuthHeaders() {
    const token = this.cookieService.get('ttw-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    });
  }

  getAll(apiUrl: string): Observable<Capability[]> {
    return this.http.get<Capability[]>(apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  getOne(apiUrl: string, id: Number): Observable<Capability> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<Capability>(apiUrl + id, {
      headers: this.getAuthHeaders(),
    });
  }

  create(data) {
    const body = JSON.stringify(data);
    return this.http.post(
      'api/system-parameter/capability-create/',

      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/capability-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/capability-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.getAuthHeaders(),
    });
  }
}
