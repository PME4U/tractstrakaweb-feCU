import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ContractType } from '../models/contract-type.model';

@Injectable({
  providedIn: 'root',
})
export class ContractTypeService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<ContractType[]> {
    return this.http.get<ContractType[]>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<ContractType> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<ContractType>(
      'api/system-parameter/contract-type-detail/' + id,
      {
        headers: this.headers,
      }
    );
  }

  create(data) {
    const body = JSON.stringify(data);
    return this.http.post(
      // `${this.baseUrl}api/account/my-account/`,
      'api/system-parameter/contract-type-create/',
      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/contract-type-update/' + id + '/';
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
    const url = 'api/system-parameter/contract-type-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
