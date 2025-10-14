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
  readonly currentPage = signal(0);
  private loaded = false;

  /**
   * Charge toutes les transactions d'un wallet
   * @param forceRefresh permet de recharger même si déjà chargé
   */
  loadTransactions(walletId: number, page = 0, forceRefresh = false): void {
    if (this.loaded && this.currentPage() === page && !forceRefresh) {
      return;
    }
    this.isLoading.set(true);
    this.transactionService.getTransactions(walletId, page).subscribe({
      next: (res) => {
        this.transactions.set(res.content);
        this.page.set(res.page);
        this.currentPage.set(page);
        this.isLoading.set(false);
        this.loaded = true;
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

  setCurrentPage(page: number) {
    this.currentPage.set(page);
  }

  /**
   * Navigation dans la pagination → le store gère tout
   */
  goToPage(walletId: number, page: number): void {
    this.loaded = false;
    this.loadTransactions(walletId, page);
  }

  reset(): void {
    this.transactions.set([]);
    this.page.set(null);
    this.currentPage.set(0);
    this.selectedTransaction.set(null);
    this.isLoading.set(false);
    this.loaded = false;
  }
}
