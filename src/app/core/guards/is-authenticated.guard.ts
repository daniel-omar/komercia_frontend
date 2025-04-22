import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { AuthStatus } from '@auth/interfaces/auth-status.enum';
import { AuthenticationService } from '@auth/services/authentication.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authenticationService = inject(AuthenticationService)
  console.log({ status: authenticationService.authStatus() })

  if (authenticationService.authStatus() === AuthStatus.authenticated) return true;

  const router = inject(Router)
  //router.navigateByUrl("/auth/login");

  return false;
};
