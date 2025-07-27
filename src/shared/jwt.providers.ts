import { importProvidersFrom } from '@angular/core';
import {JWT_OPTIONS, JwtInterceptor, JwtModule} from '@auth0/angular-jwt';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

export function provideJwt() {
  return [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return localStorage.getItem("access_token");
          },
          allowedDomains: ['platform.msegmbh.net'],
        },
      })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ];
}
