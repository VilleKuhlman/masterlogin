import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from "../.././services/auth.service"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  hasError: boolean = false;

  register(username:string, password:string) {

    this.authService.createUser(username, password).pipe(
      catchError((error) => {
        this.hasError = true;
        console.error("Invalid credentials");
        return EMPTY;
    })
    ).subscribe( res => this.router.navigate(["/login"]) )
  }

}