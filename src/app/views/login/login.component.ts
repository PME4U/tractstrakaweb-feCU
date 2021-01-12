import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { AuthService } from '../../services/auth.service';
import { AuthContextService } from '../../services/auth-context.service';
import { User } from '../../models/user.model';

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
    private authContextService: AuthContextService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    // const ttwToken = this.authContextService.getAccessToken();
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    // if (ttwToken) {
    //   this.router.navigate(['/dashboard']);
    // }
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
      (result: User) => {
        this.authContextService.setUser(result);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);
        this.loginFail = true;
      }
    );
  }
}

// saveForm() {
//   this.authService.loginUser(this.authForm.value).subscribe(
//     (result: TokenObj) => {
//       console.log(result);
//       this.cookieService.set('ttw-token', result.tokens.access);
//       this.router.navigate(['/dashboard']);
//     },
//     (error) => {
//       console.log(error);
//       this.loginFail = true;
//       // console.log(loginFail);
//       // this.msgs = [];
//       // this.msgs.push({
//       //   severity: 'error',
//       //   summary: 'Validation failed',
//       //   detail: 'Please check your email and password',
//       // });
//     }
//   );

// saveForm() {
//   this.authService.loginUser(this.authForm.value).subscribe(
//     (result) => {
//       console.log(result);
//       const obj = JSON.parse(result)
//       console.log(obj.tokens.access);
//       this.cookieService.set('ttw-token', obj.tokens.access);
//       this.router.navigate(['/dashboard']);
//     },
//     (error) => {
//       console.log(error);
//       this.loginFail = true;
//       // console.log(loginFail);
//       // this.msgs = [];
//       // this.msgs.push({
//       //   severity: 'error',
//       //   summary: 'Validation failed',
//       //   detail: 'Please check your email and password',
//       // });
//     }
//   );
// }
// }
