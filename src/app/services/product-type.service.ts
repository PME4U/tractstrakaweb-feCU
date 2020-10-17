import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { ProductType } from '../models/product-type.model';

@Injectable({
  providedIn: 'root',
})
export class ProductTypeService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAll(apiUrl: string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(apiUrl, {
      // headers: this.getAuthHeaders(),
    });
  }

  getOne(apiUrl: string, id: Number): Observable<ProductType> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<ProductType>(apiUrl + id, {
      // headers: this.getAuthHeaders(),
    });
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(
      'api/system-parameter/product-type-create/',

      body
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/product-type-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {});
  }

  delete(id: Number) {
    const url = 'api/system-parameter/product-type-delete/' + id + '/';
    return this.http.delete(url, {});
  }
}
