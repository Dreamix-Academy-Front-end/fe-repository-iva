import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isLoggedIn = authService.isLoggedIn$;
  let isAuthenticated = false;
  
  isLoggedIn.subscribe((isLogged) => {
    isAuthenticated = isLogged;
  });

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
