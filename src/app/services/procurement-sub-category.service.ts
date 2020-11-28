import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ProcurementSubCategory } from '../models/procurement-sub-category.model';

@Injectable({
  providedIn: 'root',
})
export class ProcurementSubCategoryService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<ProcurementSubCategory[]> {
    // console.log('URL:' + apiUrl);
    return this.http.get<ProcurementSubCategory[]>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<ProcurementSubCategory> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<ProcurementSubCategory>(
      'api/system-parameter/procurement-sub-category-detail/' + id,
      {
        headers: this.headers,
      }
    );
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(
      'api/system-parameter/procurement-sub-category-create/',
      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url =
      'api/system-parameter/procurement-sub-category-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url =
      'api/system-parameter/procurement-sub-category-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
