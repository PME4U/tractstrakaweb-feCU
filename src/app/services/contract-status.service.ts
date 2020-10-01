import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { ContractStatus } from '../models/contract-status.model';

@Injectable({
  providedIn: 'root',
})
export class ContractStatusService {
  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  // });

  // constructor(private http: HttpClient, private cookieService: CookieService) {}
  constructor(private http: HttpClient) {}

  // getAuthHeaders() {
  //   const token = this.cookieService.get('ttw-token');
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Token ${token}`,
  //   });
  // }

  getAll(apiUrl: string): Observable<ContractStatus[]> {
    return this.http.get<ContractStatus[]>(apiUrl, {
      // headers: this.getAuthHeaders(),
    });
  }

  getOne(apiUrl: string, id: Number): Observable<ContractStatus> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<ContractStatus>(apiUrl + id, {
      // headers: this.getAuthHeaders(),
    });
  }

  create(data) {
    const body = JSON.stringify(data);
    return this.http.post(
      // `${this.baseUrl}api/account/my-account/`,
      'api/system-parameter/contract-status-create/',

      body
      // {
      //   headers: this.headers,
      // }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/contract-status-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(
      // `${this.baseUrl}api/account/my-account/`,
      url,
      body
      // {
      //   headers: this.headers,
      // }
    );
  }

  delete(id: Number) {
    const url = 'api/system-parameter/contract-status-delete/' + id + '/';
    return this.http.delete(url, {
      // headers: this.getAuthHeaders(),
    });
  }
}
