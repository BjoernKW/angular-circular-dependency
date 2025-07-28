import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {APP_INITIALIZER, importProvidersFrom, LOCALE_ID} from '@angular/core';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {JWT_OPTIONS, JwtInterceptor, JwtModule} from '@auth0/angular-jwt';
import { NgxPermissionsModule } from 'ngx-permissions';
import {routes} from './app/app.routes';
import {provideRouter} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function provideAppServices() {
  return [
    TranslateStore,

    // JWT must come BEFORE withInterceptorsFromDi and TranslateModule
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return localStorage.getItem("access_token");
          },
          allowedDomains: ['test.com'],
        },
      })
    ),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },

    // HttpClient must come after JWT and interceptor setup
    provideHttpClient(withInterceptorsFromDi()),

    // TranslateModule (which uses HttpClient) comes after interceptor setup
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'de',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),

    {
      provide: APP_INITIALIZER,
      useFactory: (translate: TranslateService) => () => {
        translate.setDefaultLang('de');
        return translate.use('de').toPromise();
      },
      deps: [TranslateService],
      multi: true,
    },

    importProvidersFrom(NgxPermissionsModule.forRoot()),
  ];
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),

    provideAppServices(), // now safe

    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },

    provideAnimations(),
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
