import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';

import { LoaderService } from '@core/services/loader.service';
import { LoggerService } from '@core/services/logger.service';

import { environment } from '@env/environment';
import { RequestStatus } from '@shared/enums';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { TokenService } from '@shared/services/token.service';
import { RefreshResponse } from '@auth/interfaces/refresh-response.interface';
import { onRefreshSaveStorage } from '@auth/functions/authentication.function';
import { SafeStorageService } from '@shared/services/safe-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class SalesInterceptor implements HttpInterceptor {

    private readonly enumRequestStatus = RequestStatus;
    private readonly apiBaseUrl: string = `${environment.apiBaseUrl}`;
    private request: any;

    private readonly _loader = inject(LoaderService);
    private readonly _logger = inject(LoggerService);
    private readonly _snackBar = inject(SnackBarService);
    private readonly _tokenService = inject(TokenService);
    private readonly _safeStorageService = inject(SafeStorageService);
    private readonly router = inject(Router)

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        const token: string = this._tokenService.getToken;
        this.request = req.clone({
            url: `${this.apiBaseUrl}${req.url}`,
            setHeaders: { 'Cache-Control': 'no-cache' }
        });

        if (token) this.addTokenHeader(token);

        this._loader.show();

        console.log(this.request)

        return next.handle(this.request).pipe(
            tap((event: HttpEvent<any>) => {

                if (event instanceof HttpResponse) this.showSnackbar(event);

            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && !req.url.includes('/auth/refresh')) {
                    console.log(error)
                    return this.handle401Error(next);
                }

                this._loader.hide();
                this._snackBar.showSnackBar([error.error.message], false);
                this._logger.error(error.error.message);

                return throwError(() => error);
            }), finalize(() => {
                this._loader.hide()
            }));
    }

    private showSnackbar(event: HttpResponse<any>): void {
        const { GENERAL_ERROR, LOGIC_ERROR } = this.enumRequestStatus;
        if ([GENERAL_ERROR, LOGIC_ERROR].includes(event.body.status)) {

            this._snackBar.showSnackBar([event.body.message], false);
            this._logger.logByStatus(event.body.status, event.body.message);
        }
    }

    private addTokenHeader(token: string): void {
        this.request = this.request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    private handle401Error(next: HttpHandler): Observable<HttpEvent<any>> {
        return this._tokenService.refreshToken().pipe(
            switchMap((response: RefreshResponse) => {
                const newToken = response?.token;
                onRefreshSaveStorage(newToken, this._safeStorageService);

                const clonedRequest = this.request.clone({
                    setHeaders: { Authorization: `Bearer ${newToken}` }
                });

                return next.handle(clonedRequest);
            }),
            catchError((err) => {
                // Si falla el refresh, redirige al login o muestra error
                this._tokenService.onSignOut();

                return throwError(() => err);
            })
        );
    }
}

export const SalesInterceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: SalesInterceptor, multi: true }];
