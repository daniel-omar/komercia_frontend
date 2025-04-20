import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@auth/interfaces/user.interface';

import { constanst } from '@shared/constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private route: Router) { }

  get getToken(): string {

    const storage: string = this.getSession(constanst.TOKEN_STRORAGE);

    if (!Boolean(storage)) return storage;

    const token = storage;

    return token;
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
    return sessionStorage.getItem(key) || '';
  }

  private onRemoveTokens(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.route.navigateByUrl('/auth/login');
  }

  public onSignOut(): void {
    this.onRemoveTokens();
  }

}
