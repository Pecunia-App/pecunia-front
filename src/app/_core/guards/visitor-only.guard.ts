import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const visitorOnlyGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = authService.userRole();

  // Si l'utilisateur n'est pas connecté, on l'autorise à accéder à la page
  if (!authService.isLoggedIn()) {
    return true;
  } else {
    // Sinon, il est redirigé vers transactions ou admin en fonction de son rôle

    switch (role) {
      case 'ROLE_ADMIN':
        router.navigate(['/admin']);
        break;
      case 'ROLE_USER':
        router.navigate(['/transactions']);
        break;
      default:
        router.navigate(['/']);
        break;
    }
    return false;
  }
};
