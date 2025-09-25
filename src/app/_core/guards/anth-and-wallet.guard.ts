import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export const authAndWalletGuard: CanActivateFn = (): Observable<
  boolean | UrlTree
> => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  // 1️⃣ Vérifie si l'utilisateur est connecté
  if (!authService.isLoggedIn()) {
    return of(router.createUrlTree(['/login']));
  }

  // 2️⃣ Récupère l'utilisateur courant
  return userService.getCurrentUser().pipe(
    switchMap((user) => {
      if (!user?.id) {
        // Pas d'utilisateur valide → redirection login
        return of(router.createUrlTree(['/login']));
      }

      // 3️⃣ Vérifie si l'utilisateur a un wallet
      return userService.getWalletByUserId(user.id).pipe(
        map((wallet) => {
          if (wallet) {
            // Wallet existant → redirection transactions
            return router.createUrlTree(['/transactions']);
          } else {
            // Pas de wallet → redirection first-wallet
            return router.createUrlTree(['/first-wallet']);
          }
        }),
        // 4️⃣ Si erreur HTTP (401, 403, 404), considère qu'il n'y a pas de wallet
        catchError(() => of(router.createUrlTree(['/first-wallet'])))
      );
    }),
    // 5️⃣ Si erreur lors de la récupération de l'utilisateur
    catchError(() => of(router.createUrlTree(['/login'])))
  );
};
