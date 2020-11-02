import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { navItems } from '../../_nav';

import { AuthService } from '../../services/auth.service';

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
    private authService: AuthService
    ) {}

  ngOnInit() {
    const ttwToken = this.cookieService.get('ttw-token');
    if (!ttwToken) {
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
