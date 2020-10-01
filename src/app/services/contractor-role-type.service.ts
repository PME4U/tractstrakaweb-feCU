import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractorRoleTypeService {
  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<any> {
    return this.http.get<any>(apiUrl);
  }

  getOne(apiUrl: string, id: Number): Observable<any> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<any>(apiUrl + id);
  }

  create(data) {
    const body = JSON.stringify(data);
    return this.http.post(
      // `${this.baseUrl}api/account/my-account/`,
      'api/system-parameter/contractor-role-type-create/',

      body
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/contractor-role-type-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(
      // `${this.baseUrl}api/account/my-account/`,
      url,
      body
    );
  }

  delete(id: Number) {
    const url = 'api/system-parameter/contractor-role-type-delete/' + id + '/';
    return this.http.delete(url);
  }
}
