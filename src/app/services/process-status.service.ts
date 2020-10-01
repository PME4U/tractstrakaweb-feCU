import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ProcessStatus } from '../models/process-status.model';

@Injectable({
  providedIn: 'root',
})
export class ProcessStatusService {
  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<ProcessStatus[]> {
    return this.http.get<ProcessStatus[]>(apiUrl);
  }

  getOne(apiUrl: string, id: Number): Observable<any> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<any>(apiUrl + id);
  }

  create(data) {
    const body = JSON.stringify(data);
    return this.http.post('api/system-parameter/process-status-create/', body);
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/process-status-update/' + id + '/';
    return this.http.put(url, body);
  }

  delete(id: Number) {
    const url = 'api/system-parameter/process-status-delete/' + id + '/';
    return this.http.delete(url);
  }
}
