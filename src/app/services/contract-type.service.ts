import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ContractType } from '../models/contract-type.model';

@Injectable({
  providedIn: 'root',
})
export class ContractTypeService {
  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<ContractType[]> {
    return this.http.get<ContractType[]>(apiUrl);
  }

  getOne(apiUrl: string, id: Number): Observable<ContractType> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<ContractType>(apiUrl + id);
  }

  create(data) {
    const body = JSON.stringify(data);
    return this.http.post(
      // `${this.baseUrl}api/account/my-account/`,
      'api/system-parameter/contract-type-create/',
      body
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/contract-type-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(
      // `${this.baseUrl}api/account/my-account/`,
      url,
      body
    );
  }

  delete(id: Number) {
    const url = 'api/system-parameter/contract-type-delete/' + id + '/';
    return this.http.delete(url);
  }
}
