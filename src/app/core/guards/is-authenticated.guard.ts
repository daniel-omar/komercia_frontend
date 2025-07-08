import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { AuthStatus } from '@auth/enums/auth-status.enum';
import { TokenService } from '@shared/services/token.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const tokenService = inject(TokenService)
  console.log({ status: tokenService.authStatus() })

  if (tokenService.authStatus() === AuthStatus.authenticated) return true;

  const router = inject(Router)
  router.navigateByUrl("/auth/login");

  return false;
};
