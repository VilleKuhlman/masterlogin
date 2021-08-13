import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EMPTY, Observable, of } from 'rxjs';
import { catchError, retryWhen } from 'rxjs/operators';
import { Resolve, Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class SercretService {

  private apiUrl = '/api/secrets';  // URL to web api

  constructor( private http: HttpClient ) { }

  /** GET Secrets from the Server */
  getSecrets(): Observable<any> {

    const auth_token = localStorage.getItem('token');
 
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth_token}` })
    };

    return this.http.get<any>(this.apiUrl, httpOptions);
  }
  
}


@Injectable({ providedIn: 'root' })
export class SecretResolver implements Resolve<any> {
  constructor(private apiService: SercretService, private router: Router) {}

  resolve() {
     return this.apiService.getSecrets().pipe(
      catchError((error) => {
        this.router.navigate(["/login"]);
        return EMPTY;
        })
    );
  }
}