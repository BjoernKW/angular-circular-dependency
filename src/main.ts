import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import {routes} from './app/app.routes';
import {provideRouter} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideJwt} from './shared/jwt.providers';
import { provideCoreServices } from './shared/core.providers';
import { provideTranslation } from './shared/translation.providers';
import {LOCALE_ID} from '@angular/core';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),

    ...provideJwt(),            // ✅ First
    ...provideCoreServices(),   // ✅ Second (needs HttpClient with interceptors)
    ...provideTranslation(),    // ✅ Last (uses HttpClient + interceptor in loader)

    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },

    provideAnimations(),
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
