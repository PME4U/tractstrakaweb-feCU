import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getAll(apiUrl: string): Observable<any> {
    return this.http.get<any>(apiUrl, {
      headers: this.headers,
    });
  }

  getOne(id: Number): Observable<Person> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<Person>('api/people/person-detail/' + id, {
      headers: this.headers,
    });
  }

  create(data) {
    const body = JSON.stringify(data);
    // console.log(body);
    return this.http.post('api/people/person-create/', body, {
      headers: this.headers,
    });
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/people/person-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/people/person-delete/' + id + '/';
    return this.http.delete(url, {
      headers: this.headers,
    });
  }
}
