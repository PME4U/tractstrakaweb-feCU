import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractorRoleTypeService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<any> {
    return this.http.get<any>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<any> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<any>(
      'api/system-parameter/contractor-role-type-detail/' + id,
      {
        headers: this.headers,
      }
    );
  }

  create(data) {
    const body = JSON.stringify(data);
    return this.http.post(
      // `${this.baseUrl}api/account/my-account/`,
      'api/system-parameter/contractor-role-type-create/',

      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/contractor-role-type-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(
      // `${this.baseUrl}api/account/my-account/`,
      url,
      body,
      {
        headers: this.headers,
      }
    );
  }

  delete(id: Number) {
    const url = 'api/system-parameter/contractor-role-type-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
