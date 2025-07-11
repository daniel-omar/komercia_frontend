import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AuthInterceptorProvider } from '@auth/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { DatePipe } from '@angular/common';
import { TokenService } from '@shared/services/token.service';
import { SafeStorageService } from '@shared/services/safe-storage.service';
import { CommonService } from '@shared/services/common.service';
import { ModalService } from '@shared/services/modal.service';
import { RequestInterceptor } from '@shared/interceptors/request.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    importProvidersFrom(LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.OFF,
      //serverLogLevel: NgxLoggerLevel.ERROR,
      //serverLoggingUrl: '/api/logs',
      timestampFormat: 'MMMM, EEEE dd, hh:mm:ss a',
      disableConsoleLogging: false
    })),
    DatePipe,
    TokenService,
    SafeStorageService,
    CommonService,
    //ModalService
    //provideClientHydration(withEventReplay())
    //AuthInterceptorProvider
  ],

};
