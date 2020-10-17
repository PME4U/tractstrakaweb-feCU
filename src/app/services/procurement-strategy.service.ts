import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { ProcurementStrategy } from '../models/procurement-strategy.model';

@Injectable({
  providedIn: 'root',
})

export class ProcurementStrategyService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}


  getAll(apiUrl: string): Observable<ProcurementStrategy[]> {
    return this.http.get<ProcurementStrategy[]>(apiUrl, {
      // headers: this.getAuthHeaders(),
    });
  }

  getOne(apiUrl: string, id: Number): Observable<ProcurementStrategy> {
    // console.log('URL:' + apiUrl + id);
    return this.http.get<ProcurementStrategy>(apiUrl + id, {
      // headers: this.getAuthHeaders(),
    });
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(
      'api/system-parameter/procurement-strategy-create/',

      body
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/system-parameter/procurement-strategy-update/' + id + '/';
    // console.log('URL:' + url);
    return this.http.put(url, body, {
    });
  }

  delete(id: Number) {
    const url = 'api/system-parameter/procurement-strategy-delete/' + id + '/';
    return this.http.delete(url, {
    });
  }
}
