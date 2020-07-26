import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

interface TokenObj {
  token: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  loginFail = false;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    const ttwToken = this.cookieService.get('ttw-token');
    if (ttwToken) {
      this.router.navigate(['/dashboard']);
    }
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  get email() {
    return this.authForm.get('email');
  }
  get password() {
    return this.authForm.get('password');
  }

  saveForm() {
    this.authService.loginUser(this.authForm.value).subscribe(
      (result: TokenObj) => {
        this.cookieService.set('ttw-token', result.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);
        this.loginFail = true;
        // console.log(loginFail);
        // this.msgs = [];
        // this.msgs.push({
        //   severity: 'error',
        //   summary: 'Validation failed',
        //   detail: 'Please check your email and password',
        // });
      }
    );
  }
}
