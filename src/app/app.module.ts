import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

const APP_CONTAINERS = [DefaultLayoutComponent];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';

// Import app components
import { AppConfig } from '../config/app-config';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ResetPasswordEmailComponent } from './views/reset-password-email/reset-password-email.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';

// Import Services
import { JsonAppConfigService } from '../config/json-app-config.service';
import { AuthService } from './services/auth.service';
import { ContractStatusService } from './services/contract-status.service';
import { ContractTypeService } from './services/contract-type.service';
import { ProcessStatusService } from './services/process-status.service';

// Import Interceptors
import { httpInterceptorProviders } from './http-interceptors';
import { HttpErrorInterceptor } from './http-interceptors/http-error-interceptor.service';
import { ErrorDialogComponent } from './http-interceptors/error-dialog.component';
// import { RefreshTokenInterceptor } from './http-interceptors/refresh-token.interceptor';

export function initializerFn(jsonAppConfigService: JsonAppConfigService) {
  return () => {
    return jsonAppConfigService.load();
  }
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    NgxPaginationModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    RegisterComponent,
    ResetPasswordEmailComponent,
    ResetPasswordComponent,
  ],
  entryComponents: [
    // ErrorDialogComponent,
  ],
  providers: [
    HttpClient,
    {
      provide: AppConfig,
      deps: [HttpClient],
      useExisting: JsonAppConfigService
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [JsonAppConfigService],
      useFactory: initializerFn
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    AuthService,
    ContractStatusService,
    ContractTypeService,
    ProcessStatusService,
    httpInterceptorProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    // RefreshTokenInterceptor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
