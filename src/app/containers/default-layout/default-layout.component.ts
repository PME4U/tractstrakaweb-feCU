import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { navItems } from '../../_nav';

import { AuthService } from '../../services/auth.service';
import { AuthContextService } from '../../services/auth-context.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authContextService: AuthContextService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // const ttwToken = this.authContextService.getAccessToken();
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logoutUser() {
    this.authService.logout();
  }
}
