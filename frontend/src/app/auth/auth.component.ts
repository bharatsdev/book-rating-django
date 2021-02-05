import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BookApiService } from '../_services/book-api.service';

interface AuthObject {
  token: string
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  registerMode = false;

  authForm = new FormGroup(
    {
      username: new FormControl(''),
      password: new FormControl(''),
    }
  )
  constructor(
    private apiService: BookApiService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit(): void {
    const mrToken = this.cookieService.get("mr-token");
    console.log("Token :: ", mrToken)
    if (mrToken) {
      this.router.navigate(['/books'])
    }
  }


  userLogin = function () {
    console.log("UserLogin :: ", this.authForm.value)
    if (this.registerMode) {
      this.apiService.registerUser(this.authForm.value).subscribe(
        (data) => {
          this.loginUser()
        },
        err => console.log(err),
      );
    } else {
      this.loginUser()
    }
  }

  loginUser = function () {
    this.apiService.userLogin(this.authForm.value).subscribe(
      (data: AuthObject) => {
        console.log(data)
        this.cookieService.set("mr-token", data.token)
        this.router.navigate(['/books'])

      },
      err => console.log(err),
    );
  }
}
