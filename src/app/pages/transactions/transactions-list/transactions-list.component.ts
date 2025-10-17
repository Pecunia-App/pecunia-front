import { Component, computed, inject } from '@angular/core';
import { ConnectedLayoutComponent } from '../../../shared/layout/connected-layout/connected-layout.component';
import { TransactionDTO } from '../../../_core/models/transactions/transaction.dto';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { TransactionCardComponent } from '../../../shared/transactions/transaction-card/transaction-card.component';
import { MoneyDTO } from '../../../_core/models/transactions/money.dto';
import { CommonModule } from '@angular/common';
import { TransactionStore } from '../../../_core/store/transactions.store.service';
import { formatDateFr, TotalAmountFr } from '../../../_core/utils/format.utils';
import { UserStoreService } from '../../../_core/store/user.store.service';
import { BreakpointService } from '../../../_core/services/responsive/breakpoint.service';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions-list',
  imports: [
    ConnectedLayoutComponent,
    ButtonComponent,
    TransactionCardComponent,
    CommonModule,
    BadgeComponent,
  ],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss',
})
export class TransactionsListComponent {
  readonly breakpoint = inject(BreakpointService);
  private readonly router = inject(Router);
  private readonly transactionStore = inject(TransactionStore);
  private readonly userStore = inject(UserStoreService);
  readonly transactions = this.transactionStore.transactions;
  readonly page = this.transactionStore.page;
  readonly currentPage = this.transactionStore.currentPage;

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
    return formatDateFr(dateStr);
  }

  formatAmount(amount: MoneyDTO): string {
    return TotalAmountFr(amount);
  }

  prevPage() {
    const wallet = this.userStore.wallet();
    if (wallet && this.currentPage() > 0) {
      const newPage = this.currentPage() - 1;
      this.transactionStore.setCurrentPage(newPage);
      this.transactionStore.goToPage(wallet.id, newPage);
    }
  }

  nextPage() {
    const wallet = this.userStore.wallet();
    const p = this.page();
    if (wallet && p && this.currentPage() + 1 < p.totalPages) {
      const newPage = this.currentPage() + 1;
      this.transactionStore.setCurrentPage(newPage);
      this.transactionStore.goToPage(wallet.id, newPage);
    }
  }
  navigateToCreateTransaction(): void {
    this.router.navigate(['/transactions/add']);
  }
}
