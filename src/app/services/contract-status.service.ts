import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { ContractStatus } from '../models/contract-status.model';

@Injectable({
  providedIn: 'root',
})
export class ContractStatusService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<ContractStatus[]> {
    return this.http.get<ContractStatus[]>(`${environment.apiUrl}/` + apiUrl, {
      // headers: this.headers,
      withCredentials: true,
    });
  }

  getOne(id: Number): Observable<ContractStatus> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<ContractStatus>(
      `${environment.apiUrl}/api/system-parameter/contract-status-detail/` +
        id +
        '/',
      {
        withCredentials: true,
      }
    );
  }

  create(data) {
    const body = JSON.stringify(data);
    return this.http.post(
      'api/system-parameter/contract-status-create/',

      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/contract-status-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/contract-status-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
