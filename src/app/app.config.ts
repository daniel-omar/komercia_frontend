import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AuthInterceptorProvider } from '@auth/interceptors/auth.interceptor';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { DatePipe } from '@angular/common';
import { AuthService } from '@auth/services/auth.service';
import { AuthenticationService } from '@auth/services/authentication.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.OFF,
      //serverLogLevel: NgxLoggerLevel.ERROR,
      //serverLoggingUrl: '/api/logs',
      timestampFormat: 'MMMM, EEEE dd, hh:mm:ss a',
      disableConsoleLogging: false
    })),
    DatePipe,
    AuthenticationService
    //provideClientHydration(withEventReplay())
    //AuthInterceptorProvider
  ],

};
