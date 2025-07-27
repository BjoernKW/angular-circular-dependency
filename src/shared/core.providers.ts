import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {importProvidersFrom} from '@angular/core';
import {NgxPermissionsModule} from 'ngx-permissions';

export function provideCoreServices() {
  return [
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(NgxPermissionsModule.forRoot()),
  ];
}
