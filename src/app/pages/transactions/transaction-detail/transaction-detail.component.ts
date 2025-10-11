import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { ConnectedLayoutComponent } from '../../../shared/layout/connected-layout/connected-layout.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionStore } from '../../../_core/store/transactions.store.service';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import {
  formatDateFr,
  formattedAmountTransaction,
} from '../../../_core/utils/format.utils';

@Component({
  selector: 'app-transaction-detail',
  imports: [
    ConnectedLayoutComponent,
    BadgeComponent,
    CommonModule,
    ButtonComponent,
  ],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss',
})
export class TransactionDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly transactionStore = inject(TransactionStore);

  readonly loading = this.transactionStore.isLoading;
  readonly transaction = computed(() =>
    this.transactionStore.selectedTransaction()
  );

  // Déclaration de l’effet dans le contexte de la classe
  private readonly logTransactionEffect = effect(() => {
    const currentTransaction = this.transaction();
    if (currentTransaction) {
      console.log('Transaction chargée ✅', currentTransaction);
    }
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const transactionId = Number(idParam);

    if (Number.isNaN(transactionId)) {
      console.warn('ID de transaction invalide dans l’URL:', idParam);
      this.router.navigate(['/transactions']);
      return;
    }
    this.transactionStore.selectedTransaction.set(null);
    this.transactionStore.loadTransactionById(transactionId);
  }

  navigateBack(): void {
    this.router.navigate(['/transactions']);
  }

  navigateToUpdate(): void {
    const transaction = this.transaction();
    if (transaction) {
      this.router.navigate([`/transactions/${transaction.id}/update`]);
    }
  }

  deleteTransaction(): void {
    // à faire plus tard (Jour 4)
  }

  formatDate(dateStr: string): string {
    return formatDateFr(dateStr);
  }

  formatAmount(): string {
    const transaction = this.transaction();
    return transaction ? formattedAmountTransaction(transaction) : '';
  }

  isDebit(): boolean {
    const transaction = this.transaction();
    return transaction ? transaction.type === 'DEBIT' : false;
  }

  isCredit(): boolean {
    const transaction = this.transaction();
    return transaction ? transaction.type === 'CREDIT' : false;
  }
}
