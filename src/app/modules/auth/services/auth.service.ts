import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response.interface';
import { ResponseData } from '@shared/interfaces/response-data.interface';

import { onAuthenticationSaveStorage } from '@auth/functions';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthService {

  private readonly baseUrl: string = environment.apiBaseUrl;
  private _http = inject(HttpClient);
  private _authenticationService = inject(AuthenticationService);

  login(loginDto: any): Observable<boolean> {
    const url = `/auth/login`;
    return this._http.post<ResponseData<LoginResponse>>(url, loginDto)
      .pipe(
        tap(({ data }) => {
          const { usuario, token } = data;

          this._authenticationService._currentUser.set(usuario);
          this._authenticationService._authStatus.set(AuthStatus.authenticated);

          onAuthenticationSaveStorage(usuario, token);

        }),
        map(() => true),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          return throwError(() => error.error.message)
        })
      );

  }

  public logout(): Observable<boolean> {
    return this._http.get<ResponseData<any>>('logout', { observe: 'response' })
      .pipe(
        tap((status) => {

        }),
        map(() => true),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          return throwError(() => error.error.message)
        })
      );;
  }
}
