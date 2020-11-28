import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { TaxCode } from '../models/tax-code.model';

@Injectable({
  providedIn: 'root',
})
export class TaxCodeService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<TaxCode[]> {
    return this.http.get<TaxCode[]>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<TaxCode> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<TaxCode>(
      'api/system-parameter/tax-code-detail/' + id,
      {
        headers: this.headers,
      }
    );
  }

  create(data) {
    const body = JSON.stringify(data);
    // console.log(body);
    return this.http.post('api/system-parameter/tax-code-create/', body, {
      headers: this.headers,
    });
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/tax-code-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/tax-code-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
