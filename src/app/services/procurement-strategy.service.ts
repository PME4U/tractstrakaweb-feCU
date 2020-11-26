import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { ProcurementStrategy } from '../models/procurement-strategy.model';

@Injectable({
  providedIn: 'root',
})
export class ProcurementStrategyService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAll(apiUrl: string): Observable<ProcurementStrategy[]> {
    return this.http.get<ProcurementStrategy[]>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<ProcurementStrategy> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<ProcurementStrategy>(
      'api/system-parameter/procurement-strategy-detail/' + id,
      {
        headers: this.headers,
      }
    );
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(
      'api/system-parameter/procurement-strategy-create/',

      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/procurement-strategy-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/procurement-strategy-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
