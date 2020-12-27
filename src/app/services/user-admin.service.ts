import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../models/user.model';

export interface TableData extends Array<User> {}

@Injectable({
  providedIn: 'root',
})
export class UserAccessService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getAll(apiUrl: string) {
    return this.http.get<TableData>(apiUrl).pipe(
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

  getOne(id: Number): Observable<User> {
    // console.log('URL:' + id);
    return this.http.get<any>('api/account/account-access-list/' + id, {
      headers: this.headers,
    });
  }

  create(data) {
    const body = JSON.stringify(data);
    // console.log(body);
    return this.http.post('api/account/account-access-list/', body, {
      headers: this.headers,
    });
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
      headers: this.headers,
    });
  }

  getCurrentUser() {
    let currentUser: User;
    // let response: User;
    let id: number;

    if (localStorage.getItem('currentUser') !== null) {
      currentUser = JSON.parse(localStorage.getItem('currentUser'));
      // console.log(
      //   'Returned Token: ' + JSON.stringify(currentUser.tokens.refresh)
      // );

      id = Number(currentUser.id);

      return JSON.stringify(this.getOne(id).subscribe());
    }
  }

  getRights(scope) {
    let currentUser: User;
    // let response: User;
    // let id: number;

    if (localStorage.getItem('currentUser') !== null) {
      currentUser = JSON.parse(localStorage.getItem('currentUser'));
      // console.log(
      //   'Returned Token: ' + JSON.stringify(currentUser.tokens.refresh)
      // );

      // id = Number(currentUser.id);

      // this.getOne(id).subscribe((response) => {
      // console.log('Response: ' + JSON.stringify(response));

      switch (scope) {
        case 'companies': {
          return currentUser.companies;
          break;
        }
        case 'contracts': {
          return currentUser.contracts;
          break;
        }
        case 'forward_plans': {
          return currentUser.forward_plans;
          break;
        }
        case 'people': {
          return currentUser.people;
          break;
        }
        case 'processes': {
          return currentUser.processes;
          break;
        }
        case 'purchase_orders': {
          return currentUser.purchase_orders;
          break;
        }
        case 'system_params': {
          // console.log(
          //   'Returned Rights:' + JSON.stringify(currentUser.system_params)
          // );
          return currentUser.system_params;
          break;
        }
        case 'user_admin': {
          return currentUser.user_admin;
          break;
        }
        default: {
          return 'No Access';
          break;
        }
      }
      // });
    }
  }
  isNoAccess(scope) {
    let rights: any;

    rights = this.getRights(scope);
    // console.log('isNoAccess rights:' + rights);
    if (rights === 'No Access') {
      return true;
    } else {
      return false;
    }
  }
  isReadOnly(scope) {
    let rights: any;

    rights = this.getRights(scope);
    // console.log('isReadOnly rights:' + rights);
    if (
      rights === 'Read Only' ||
      rights === 'Modify' ||
      rights === 'Create' ||
      rights === 'Delete'
    ) {
      return true;
    } else {
      return false;
    }
  }
  isModify(scope) {
    let rights: any;

    rights = this.getRights(scope);
    // console.log('isCreate rights:' + rights);
    if (rights === 'Modify' || rights === 'Create' || rights === 'Delete') {
      return true;
    } else {
      return false;
    }
  }
  isCreate(scope) {
    let rights: any;

    rights = this.getRights(scope);
    // console.log('isCreate rights:' + rights);
    if (rights === 'Create' || rights === 'Delete') {
      return true;
    } else {
      return false;
    }
  }
  isDelete(scope) {
    let rights: any;

    rights = this.getRights(scope);
    // console.log('isDelete rights:' + rights);
    if (rights === 'Delete') {
      return true;
    } else {
      return false;
    }
  }
}
