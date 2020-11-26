import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { ProcurementMethod } from '../models/procurement-method.model';

@Injectable({
  providedIn: 'root',
})
export class ProcurementMethodService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAll(apiUrl: string): Observable<ProcurementMethod[]> {
    return this.http.get<ProcurementMethod[]>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<ProcurementMethod> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<ProcurementMethod>(
      'api/system-parameter/procurement-method-detail/' + id,
      {
        headers: this.headers,
      }
    );
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(
      'api/system-parameter/procurement-method-create/',

      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/procurement-method-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/procurement-method-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
