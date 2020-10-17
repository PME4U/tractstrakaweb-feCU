import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { ProductGroup } from '../models/product-group.model';

@Injectable({
  providedIn: 'root',
})
export class ProductGroupService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAll(apiUrl: string): Observable<ProductGroup[]> {
    return this.http.get<ProductGroup[]>(apiUrl, {
      // headers: this.getAuthHeaders(),
    });
  }

  getOne(apiUrl: string, id: Number): Observable<ProductGroup> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<ProductGroup>(apiUrl + id, {
      // headers: this.getAuthHeaders(),
    });
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(
      'api/system-parameter/product-group-create/',

      body
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/product-group-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {});
  }

  delete(id: Number) {
    const url = 'api/system-parameter/product-group-delete/' + id + '/';
    return this.http.delete(url, {});
  }
}
