import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

interface EmailRequestResponse {
  success: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'reset-password-email.component.html',
})
export class ResetPasswordEmailComponent implements OnInit {
  authForm: FormGroup;
  href: string;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    const ttwToken = this.cookieService.get('ttw-token');
    this.href = this.router.url;

    if (this.href.length > 16) {
      // this is the password reset link
    }

    console.log(this.href);

    if (ttwToken) {
      this.router.navigate(['/dashboard']);
    }

    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  get email() {
    return this.authForm.get('email');
  }

  saveForm() {
    this.authService.requestPasswordReset(this.authForm.value).subscribe(
      (result: EmailRequestResponse) => {
        if (result.success) {
          window.alert('Request successful, please check your email inbox and junkmail folders for a reset link email.');
          this.authForm.reset();
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
