import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { ProductType } from '../models/product-type.model';

@Injectable({
  providedIn: 'root',
})
export class ProductTypeService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAll(apiUrl: string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<ProductType> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<ProductType>(
      'api/system-parameter/product-type-detail/' + id,
      {
        headers: this.headers,
      }
    );
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(
      'api/system-parameter/product-type-create/',

      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/product-type-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/product-type-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
