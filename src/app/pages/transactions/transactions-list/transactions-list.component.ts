import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ConnectedLayoutComponent } from '../../../shared/layout/connected-layout/connected-layout.component';
import { TransactionsService } from '../../../_core/services/transactions/transactions.service';
import { TransactionDTO } from '../../../_core/models/transactions/transaction.dto';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { TransactionCardComponent } from '../../../shared/transactions/transaction-card/transaction-card.component';
import { MoneyDTO } from '../../../_core/models/transactions/money.dto';
import { CommonModule } from '@angular/common';
import { TransactionStore } from '../../../_core/store/transactions.store.service';

@Component({
  selector: 'app-transactions-list',
  imports: [
    ConnectedLayoutComponent,
    ButtonComponent,
    TransactionCardComponent,
    CommonModule,
  ],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss',
})
export class TransactionsListComponent implements OnInit {
  private readonly transactionService = inject(TransactionsService);
  private readonly transactionStore = inject(TransactionStore);
  readonly transactions = this.transactionStore.transactions;
  readonly page = this.transactionStore.page;
  readonly currentPage = signal(0);
  walletId = 6;

  ngOnInit(): void {
    this.loadTransactions(0);
  }

  /**
   * Charge une page de transactions depuis le backend
   */
  loadTransactions(pageIndex: number): void {
    this.transactionService
      .getTransactions(this.walletId, pageIndex)
      .subscribe((res) => {
        this.transactions.set(res.content);
        this.page.set(res.page);
        this.currentPage.set(pageIndex);
      });
  }

  // Regroupe les transactions par date (formatée)
  readonly transactionsGroupedByDate = computed(() => {
    const groups: Record<string, TransactionDTO[]> = {};
    for (const t of this.transactions()) {
      const date = this.formatDate(t.createdAt);
      groups[date] ??= [];
      groups[date].push(t);
    }
    return Object.entries(groups).sort(
      ([a], [b]) => new Date(b).getTime() - new Date(a).getTime()
    );
  });

  // Calcule le total d'une journée
  totalForDay(transactions: TransactionDTO[]): MoneyDTO {
    const total = transactions.reduce((sum, t) => {
      return t.type === 'DEBIT' ? sum - t.amount.amount : sum + t.amount.amount;
    }, 0);
    // On suppose que toutes les transactions sont en EUR
    return {
      ...transactions[0]?.amount,
      amount: total,
    };
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  formatAmount(amount: MoneyDTO): string {
    const absValue = Math.abs(amount.amount);
    const formatted = absValue.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
    });
    const sign = amount.amount >= 0 ? '+' : '-';
    return `${sign} ${formatted} ${amount.currency}`;
  }

  prevPage() {
    if (this.currentPage() > 0) {
      this.loadTransactions(this.currentPage() - 1);
    }
  }

  nextPage() {
    const p = this.page();
    if (p && this.currentPage() + 1 < p.totalPages) {
      this.loadTransactions(this.currentPage() + 1);
    }
  }
}
