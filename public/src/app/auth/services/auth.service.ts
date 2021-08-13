import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EMPTY, Observable, of } from 'rxjs';
import { catchError, retryWhen } from 'rxjs/operators';
import { Resolve, Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  apiBaseUrl = "/auth"

  constructor( private http: HttpClient, private router: Router ) { }

  /** GET Access token from the Server */
  fetchToken(username:string, password:string): Observable<any> {

    const body = { "email": username, "password": password };

    return this.http.post<any>(this.apiBaseUrl+"/login", body, this.httpOptions)
  }



  /** GET Access token from the Server */
  createUser(username:string, password:string): Observable<any> {

    const body = { "email": username, "password": password };

    return this.http.post<any>(this.apiBaseUrl+"/register", body, this.httpOptions );
  }
  
}
