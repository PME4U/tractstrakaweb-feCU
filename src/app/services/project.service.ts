import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<Project[]> {
    return this.http.get<Project[]>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<Project> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<Project>('api/system-parameter/project-detail/' + id, {
      headers: this.headers,
    });
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post('api/system-parameter/project-create/', body, {
      headers: this.headers,
    });
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/project-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/project-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
