import { Injectable, signal } from '@angular/core';
import { TransactionsService } from '../services/transactions/transactions.service';
import { PageDTO } from '../services/transactions/transactions.data-source';
import { TransactionDTO } from '../models/transactions/transaction.dto';

@Injectable({ providedIn: 'root' })
export class TransactionStore {
  readonly transactions = signal<TransactionDTO[]>([]);
  readonly page = signal<PageDTO | null>(null);
  readonly isLoading = signal<boolean>(false);

  constructor(private service: TransactionsService) {}

  /**
   * Charge toutes les transactions d'un wallet
   */
  loadTransactions(walletId: number): void {
    this.isLoading.set(true);
    this.service.getTransactions(walletId).subscribe({
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
    this.service.getTransactionById(id).subscribe({
      next: (t) => {
        const list = this.transactions();
        const idx = list.findIndex((x) => x.id === t.id);

        if (idx === -1) {
          this.transactions.set([...list, t]);
        } else {
          const updated = [...list];
          updated[idx] = t;
          this.transactions.set(updated);
        }
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  /**
   * Méthode de lecture directe dans le signal
   */
  getTransactionByIdFromStore(id: number): TransactionDTO | undefined {
    return this.transactions().find((t) => t.id === id);
  }
}
