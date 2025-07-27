import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {APP_INITIALIZER, importProvidersFrom} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpLoaderFactory} from '../main';

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
      provide: APP_INITIALIZER,
      useFactory: (translate: TranslateService) => () => {
        translate.setDefaultLang('de');
        return translate.use('de').toPromise();
      },
      deps: [TranslateService],
      multi: true,
    },
  ];
}
