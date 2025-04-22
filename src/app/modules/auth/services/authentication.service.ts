import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response.interface';
import { ResponseData } from '@shared/interfaces/response-data.interface';

import { onAuthenticationSaveStorage } from '@auth/functions';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public _currentUser = signal<User | null>(null);
  public _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

}
