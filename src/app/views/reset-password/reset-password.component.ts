import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

interface PasswordResetResponse {
  success: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  authForm: FormGroup;
  uidb64: string;
  token: string;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const ttwToken = this.cookieService.get('ttw-token');

    this.route.params.subscribe(params => {
        this.uidb64 = params.uidb64;
        this.token = params.token;
    });


    if (ttwToken) {
      this.router.navigate(['/dashboard']);
    }


    this.authForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password2: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  get password() {
    return this.authForm.get('password');
  }
  get password2() {
    return this.authForm.get('password2');
  }

  saveForm() {
    const data = JSON.stringify({'password': this.authForm.value.password, 'token': this.token, 'uidb64': this.uidb64})
    console.log(data);
    this.authService.passwordReset(data).subscribe(
      (result: PasswordResetResponse) => {
        if (result.success) {
          window.alert('Password reset, please login to complete the process.');
          this.authForm.reset();
          console.log('done!!');
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        window.alert(error.message);
        console.log(error);
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
