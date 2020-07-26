import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit() {
    const ttwToken = this.cookieService.get('ttw-token');
    if (!ttwToken) {
      this.router.navigate(['/']);
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.cookieService.delete('ttw-token');
  }
}
