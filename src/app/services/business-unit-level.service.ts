import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { BusinessUnitLevel } from '../models/business-unit-level.model';

@Injectable({
  providedIn: 'root',
})
export class BusinessUnitLevelService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAll(apiUrl: string): Observable<BusinessUnitLevel[]> {
    return this.http.get<BusinessUnitLevel[]>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<BusinessUnitLevel> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<BusinessUnitLevel>(
      'api/system-parameter/business-unit-level-detail/' + id,
      {
        headers: this.headers,
      }
    );
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(
      'api/system-parameter/business-unit-level-create/',
      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/business-unit-level-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/business-unit-level-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
