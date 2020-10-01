import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleTypeService {
  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<any> {
    return this.http.get<any>(apiUrl);
  }

  getOne(apiUrl: string, id: Number): Observable<any> {
    return this.http.get<any>(apiUrl + id);
  }

  create(data) {
    const body = JSON.stringify(data);
    // console.log(data);
    return this.http.post('api/system-parameter/role-type-create/', body);
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/role-type-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body);
  }

  delete(id: Number) {
    const url = 'api/system-parameter/role-type-delete/' + id + '/';
    return this.http.delete(url);
  }
}
