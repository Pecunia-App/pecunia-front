import { inject, Injectable, signal } from '@angular/core';
import { TransactionsService } from '../services/transactions/transactions.service';
import { PageDTO } from '../services/transactions/transactions.data-source';
import { TransactionDTO } from '../models/transactions/transaction.dto';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TransactionStore {
  readonly transactions = signal<TransactionDTO[]>([]);
  readonly page = signal<PageDTO | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly selectedTransaction = signal<TransactionDTO | null>(null);
  private readonly transactionService = inject(TransactionsService);
  private readonly router = inject(Router);

  /**
   * Charge toutes les transactions d'un wallet
   */
  loadTransactions(walletId: number): void {
    this.isLoading.set(true);
    this.transactionService.getTransactions(walletId).subscribe({
      next: (res) => {
        this.transactions.set(res.content);
        this.page.set(res.page);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Charge une transaction précise par ID
   */
  loadTransactionById(id: number): void {
    this.isLoading.set(true);
    this.transactionService.getTransactionById(id).subscribe({
      next: (tx) => {
        this.selectedTransaction.set(tx ?? null);
        this.isLoading.set(false);
      },
      error: () => {
        this.selectedTransaction.set(null);
        this.isLoading.set(false);
        this.router.navigate(['/transactions']);
      },
    });
  }

  /**
   * Méthode de lecture directe dans le signal
   */
  getTransactionByIdFromStore(): TransactionDTO | null {
    return this.selectedTransaction();
  }
}
