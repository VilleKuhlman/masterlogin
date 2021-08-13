import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from "../.././services/auth.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  hasError: boolean = false;

  ngOnInit() { }

  login(username:string, password:string) {

      this.authService.fetchToken(username, password).pipe(
        catchError((error) => {
          this.hasError = true;
          console.error("invalid username or password");
          return EMPTY;
      })
      ).subscribe(response => { 
        if(!!response.token){
          localStorage.setItem('token', response.token);
          this.router.navigate(["/secrets"])
        }       
      });

  }

}
