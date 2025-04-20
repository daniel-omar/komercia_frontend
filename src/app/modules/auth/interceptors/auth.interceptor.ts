import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { LoaderService } from '@core/services/loader.service';
import { LoggerService } from '@core/services/logger.service';

import { environment } from '@env/environment';
import { RequestStatus } from '@shared/enums';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { TokenService } from '@shared/services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private readonly enumRequestStatus = RequestStatus;
    private readonly apiBaseUrl: string = `${environment.apiBaseUrl}`;
    private request: any;

    private readonly _loader = inject(LoaderService);
    private readonly _logger = inject(LoggerService);
    private readonly _snackBar = inject(SnackBarService);
    private readonly _tokenService = inject(TokenService);

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

}

export const AuthInterceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];
