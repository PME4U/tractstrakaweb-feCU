import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthHeaderInterceptor } from './auth-header-interceptor';
// import { RefreshTokenInterceptor } from './refresh-token-interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { JwtInterceptor } from './jwt.interceptor';

export const httpInterceptorProviders = [
  // { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
  },
];
