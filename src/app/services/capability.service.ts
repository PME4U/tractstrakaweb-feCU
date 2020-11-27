import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Capability } from '../models/capability.model';

@Injectable({
  providedIn: 'root',
})
export class CapabilityService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<Capability[]> {
    return this.http.get<Capability[]>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<Capability> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<Capability>(
      'api/system-parameter/capability-detail/' + id,
      {
        headers: this.headers,
      }
    );
  }

  create(data) {
    const body = JSON.stringify(data);
    return this.http.post('api/system-parameter/capability-create/', body, {
      headers: this.headers,
    });
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/capability-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/capability-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
