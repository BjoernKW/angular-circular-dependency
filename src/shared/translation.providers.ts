import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {importProvidersFrom, provideAppInitializer} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function provideTranslation() {
  return [
    TranslateStore,
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
      provide: provideAppInitializer,
      useFactory: (translate: TranslateService) => () => {
        translate.setDefaultLang('de');
        return translate.use('de').toPromise();
      },
      deps: [TranslateService],
      multi: true,
    },
  ];
}
