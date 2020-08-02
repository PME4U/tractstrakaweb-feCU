import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { ProcessStatus } from '../models/process-status.model';

@Injectable({
  providedIn: 'root',
})
export class ProcessStatusService {
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

  getAll(apiUrl: string): Observable<ProcessStatus[]> {
    return this.http.get<ProcessStatus[]>(apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  getOne(apiUrl: string, id: Number): Observable<any> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<any>(apiUrl + id, {
      headers: this.getAuthHeaders(),
    });
  }

  create(data) {
    const body = JSON.stringify(data);
    return this.http.post(
      'api/system-parameter/process-status-create/',

      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/process-status-update/' + id + '/';
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/process-status-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.getAuthHeaders(),
    });
  }
}
