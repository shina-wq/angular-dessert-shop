import { registerLocaleData } from '@angular/common';
import localeEnRw from '@angular/common/locales/en-RW';
import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

// Format numbers and prices for Rwanda, e.g. 9500 -> RF9,500
registerLocaleData(localeEnRw);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: LOCALE_ID, useValue: 'en-RW' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'RWF' },
  ],
};
