import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ProcessStatus } from '../models/process-status.model';

@Injectable({
  providedIn: 'root',
})
export class ProcessStatusService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<ProcessStatus[]> {
    return this.http.get<ProcessStatus[]>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<any> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<any>(
      'api/system-parameter/process-status-detail/' + id,
      {
        headers: this.headers,
      }
    );
  }

  create(data) {
    const body = JSON.stringify(data);
    return this.http.post('api/system-parameter/process-status-create/', body, {
      headers: this.headers,
    });
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/process-status-update/' + id + '/';
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/process-status-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
