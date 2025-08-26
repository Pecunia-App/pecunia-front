import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const roleGuard = (expectedRole: string): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn() && authService.userRole() === expectedRole) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  };
};
