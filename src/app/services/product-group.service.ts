import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { ProductGroup } from '../models/product-group.model';

@Injectable({
  providedIn: 'root',
})
export class ProductGroupService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAll(apiUrl: string): Observable<ProductGroup[]> {
    return this.http.get<ProductGroup[]>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<ProductGroup> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<ProductGroup>(
      'api/system-parameter/product-group-detail/' + id,
      {
        headers: this.headers,
      }
    );
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(
      'api/system-parameter/product-group-create/',

      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/product-group-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/product-group-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
