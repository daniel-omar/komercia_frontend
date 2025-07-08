import { isPlatformBrowser } from '@angular/common';
import { computed, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatus } from '@auth/enums/auth-status.enum';

import { User } from '@auth/interfaces/user.interface';

import { constanst } from '@shared/constants';

@Injectable({ providedIn: 'root' })
export class SafeStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getItem(key: string): string | null {
    return this.isBrowser() ? sessionStorage.getItem(key) : null;
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser()) sessionStorage.setItem(key, value);
  }

  clear(): void {
    if (this.isBrowser()) sessionStorage.clear();
  }
}