import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { AuthStatus } from '@auth/interfaces/auth-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  console.log({ status: authService.authStatus() })

  if (authService.authStatus() === AuthStatus.authenticated) return true;

  const router = inject(Router)
  router.navigateByUrl("/auth/login");

  return false;
};
