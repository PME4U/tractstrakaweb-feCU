import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Complexity } from '../models/complexity.model';

@Injectable({
  providedIn: 'root',
})
export class ComplexityService {
  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<Complexity[]> {
    return this.http.get<Complexity[]>(apiUrl);
  }

  getOne(apiUrl: string, id: Number): Observable<Complexity> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<Complexity>(apiUrl + id);
  }

  create(data) {
    const body = JSON.stringify(data);
    return this.http.post(
      'api/system-parameter/complexity-classification-create/',

      body
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url =
      'api/system-parameter/complexity-classification-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body);
  }

  delete(id: Number) {
    const url =
      'api/system-parameter/complexity-classification-delete/' + id + '/';
    return this.http.delete(url);
  }
}
