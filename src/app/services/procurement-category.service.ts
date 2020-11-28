import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ProcurementCategory } from '../models/procurement-category.model';

@Injectable({
  providedIn: 'root',
})
export class ProcurementCategoryService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<ProcurementCategory[]> {
    return this.http.get<ProcurementCategory[]>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<ProcurementCategory> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<ProcurementCategory>(
      'api/system-parameter/procurement-category-detail/' + id,
      {
        headers: this.headers,
      }
    );
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(
      'api/system-parameter/procurement-category-create/',
      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/procurement-category-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/procurement-category-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
