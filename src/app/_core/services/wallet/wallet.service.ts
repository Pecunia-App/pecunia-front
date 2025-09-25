import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { Wallet } from '../../models/wallet.model';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private http = inject(HttpClient);
  private router = inject(Router);

  wallet = signal<Wallet | null>(null);

  getUserWallet(userId: number) {
    const url = `${environment.apiUrl}/wallets/users/${userId}`;
    return this.http.get<Wallet>(url).pipe(
      tap((wallet) => {
        this.wallet.set(wallet);
        this.router.navigate(['/transactions']);
      }),
      catchError((err) => {
        if (err.status === 404) {
          console.warn('Aucun wallet trouvé pour cet utilisateur.');
          // rediriger vers la création d’un wallet
          this.router.navigate(['/wallet/create']);
          return of(null);
        }
        console.error('Erreur lors de la récupération du wallet :', err);
        return of(null);
      })
    );
  }
}
