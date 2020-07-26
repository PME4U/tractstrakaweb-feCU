import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcurementFrameworksService {
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

  getAll(apiUrl: string): Observable<any> {
    return this.http.get<any>(apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  getOne(apiUrl: string, id: Number): Observable<any> {
    return this.http.get<any>(apiUrl + id, {
      headers: this.getAuthHeaders(),
    });
  }

  create(data) {
    const body = JSON.stringify(data);
    // console.log(data);
    return this.http.post(
      'api/system-parameter/procurement-framework-create/',

      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/procurement-framework-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/procurement-framework-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.getAuthHeaders(),
    });
  }
}
