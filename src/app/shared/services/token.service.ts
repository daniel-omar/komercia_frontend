import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatus } from '@auth/enums/auth-status.enum';

import { User } from '@auth/interfaces/user.interface';

import { constanst } from '@shared/constants';
import { SafeStorageService } from './safe-storage.service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ResponseData } from '@shared/interfaces/response-data.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RefreshResponse } from '@auth/interfaces/refresh-response.interface';

import { onRefreshSaveStorage } from '@auth/functions';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private safeStorageService = inject(SafeStorageService);
  private _http = inject(HttpClient);

  public _currentUser = signal<User | null>(null);
  public _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(private route: Router) {
    if (this.isBrowser()) {
      const savedStatus = this.safeStorageService.getItem('authStatus') as AuthStatus;
      const savedUser = this.safeStorageService.getItem('loginUsuario');
      if (savedStatus) this._authStatus.set(savedStatus);
      if (savedUser) this._currentUser.set(JSON.parse(savedUser));
    }
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }

  get getToken(): string {

    const storage: string = this.getSession(constanst.TOKEN_STRORAGE);

    if (!Boolean(storage)) return storage;

    const token = storage;

    return token;
  }


  get getRefreshToken(): string {

    const storage: string = this.getSession(constanst.REFRESH_TOKEN_STRORAGE);

    if (!Boolean(storage)) return storage;

    const refreshToken = storage;

    return refreshToken;
  }

  get isAuthenticated(): boolean {
    return Boolean(this.getToken);
  }

  get getIdUSer(): string {

    const storage: string = this.getSession(constanst.SESSION_STRORAGE);

    if (!Boolean(storage)) return storage;

    const { id_usuario }: User = JSON.parse(storage);
    return id_usuario.toString();

  }

  get getUser(): User | null {

    const storage: string = this.getSession(constanst.SESSION_STRORAGE);

    if (!Boolean(storage)) return null;

    const User: User = JSON.parse(storage);
    return User;

  }

  private getSession(key: string): string {
    // return sessionStorage.getItem(key) || '';
    return this.safeStorageService.getItem(key) || '';
  }

  private onRemoveTokens(): void {
    // sessionStorage.clear();
    this.safeStorageService.clear();
    this.route.navigateByUrl('/auth/login');
  }

  public onSignOut(): void {
    this.onRemoveTokens();
  }

  public refreshToken(): Observable<RefreshResponse> {
    return this._http.post<ResponseData<RefreshResponse>>('/auth/refresh', { refresh_token: this.getRefreshToken })
      .pipe(
        // tap(({ data }) => {
        //   const { token } = data;
        //   // onRefreshSaveStorage(token, this.safeStorageService);
        //   return token;
        // }),
        map((data) => data.data),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          return throwError(() => error.error.message)
        })
      );;
  }

}
