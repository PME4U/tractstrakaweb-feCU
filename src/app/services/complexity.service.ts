import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Complexity } from '../models/complexity.model';

@Injectable({
  providedIn: 'root',
})
export class ComplexityService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<Complexity[]> {
    return this.http.get<Complexity[]>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<Complexity> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<Complexity>(
      'api/system-parameter/complexity-classification-detail/' + id,
      {
        headers: this.headers,
      }
    );
  }

  create(data) {
    const body = JSON.stringify(data);
    return this.http.post(
      'api/system-parameter/complexity-classification-create/',
      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url =
      'api/system-parameter/complexity-classification-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url =
      'api/system-parameter/complexity-classification-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
