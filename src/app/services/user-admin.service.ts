import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { retry } from 'rxjs-compat/operator/retry';

import { UserAccessModel } from '../models/user-access.model';

export interface TableData extends Array<UserAccessModel> {}

@Injectable({
  providedIn: 'root',
})
export class UserAccessService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAuthHeaders() {
    const token = this.cookieService.get('ttw-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    });
  }

  getAll(apiUrl: string) {
    return this.http
      .get<TableData>(apiUrl, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        // retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  // getUserAccesses(apiUrl: string): Observable<any> {
  //   return this.http.get<any>(apiUrl, {
  //     headers: this.getAuthHeaders(),
  //   });
  // }

  getOne(apiUrl: string, id: Number): Observable<any> {
    console.log('URL:' + apiUrl + id);
    return this.http.get<any>(apiUrl + id, {
      headers: this.getAuthHeaders(),
    });
  }

  create(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(
      'api/account/account-access-list/',

      body,
      {
        headers: this.headers,
      }
    );
  }

  update(id, data) {
    const body = JSON.stringify(data);
    const url = 'api/account/account-access-list/' + id + '/';
    return this.http.put(url, body, {
      headers: this.headers,
    });
  }

  delete(id: Number) {
    const url = 'api/account/account-access-list/' + id + '/';
    return this.http.delete(url, {
      headers: this.getAuthHeaders(),
    });
  }
}
