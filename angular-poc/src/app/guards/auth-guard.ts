import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard = (expectedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(Auth);
    const router = inject(Router);
    const role = authService.getUserRole();

    if (authService.isAuthenticated() && expectedRoles.includes(role ?? '')) {
      return true;
    }

    router.navigate(['/unauthorized']);
    return false;
  };
};
