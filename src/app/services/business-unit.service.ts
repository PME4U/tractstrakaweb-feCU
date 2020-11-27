import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BusinessUnit } from '../models/business-unit.model';

@Injectable({
  providedIn: 'root',
})
export class BusinessUnitService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<BusinessUnit[]> {
    return this.http.get<BusinessUnit[]>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<BusinessUnit> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<BusinessUnit>(
      'api/system-parameter/business-unit-detail/' + id,
      {
        headers: this.headers,
      }
    );
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(
      'api/system-parameter/business-unit-create/',

      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/business-unit-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/business-unit-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
