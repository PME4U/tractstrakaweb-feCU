import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { BusinessUnit } from '../models/business-unit.model';

@Injectable({
  providedIn: 'root',
})

export class BusinessUnitService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}


  getAll(apiUrl: string): Observable<BusinessUnit[]> {
    return this.http.get<BusinessUnit[]>(apiUrl, {
      // headers: this.getAuthHeaders(),
    });
  }

  getOne(apiUrl: string, id: Number): Observable<BusinessUnit> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<BusinessUnit>(apiUrl + id, {
      // headers: this.getAuthHeaders(),
    });
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(
      'api/system-parameter/business-unit-create/',

      body
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/business-unit-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/business-unit-delete/' + id + '/';
    return this.http.delete(url, {
    });
  }
}
