import { Component, inject } from '@angular/core';
import { ConnectedLayoutComponent } from '../../../shared/layout/connected-layout/connected-layout.component';
import { Router } from '@angular/router';
import { TransactionStore } from '../../../_core/store/transactions.store.service';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import {
  formatDateFr,
  formattedAmountTransaction,
} from '../../../_core/utils/format.utils';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { DeleteTransactionModalComponent } from './components/modal/delete-transaction-modal/delete-transaction-modal.component';
import { TransactionsService } from '../../../_core/services/transactions/transactions.service';
import { UserStoreService } from '../../../_core/store/user.store.service';

@Component({
  selector: 'app-transaction-detail',
  imports: [
    ConnectedLayoutComponent,
    BadgeComponent,
    CommonModule,
    ButtonComponent,
    NzModalModule,
  ],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss',
})
export class TransactionDetailComponent {
  private readonly router = inject(Router);
  private readonly transactionStore = inject(TransactionStore);
  private readonly transactionService = inject(TransactionsService);
  private readonly modal = inject(NzModalService);
  private readonly userStore = inject(UserStoreService);
  readonly walletId = this.userStore.wallet()?.id;

  readonly loading = this.transactionStore.isLoading;
  readonly transaction = this.transactionStore.selectedTransaction;

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
    const modalRef = this.modal.create({
      nzTitle: 'Confirmer la suppression',
      nzContent: DeleteTransactionModalComponent,
      nzCentered: true,
      nzFooter: null,
      nzClosable: true,
      nzClassName: 'delete-transaction-modal',
      nzNoAnimation: true,
    });
    modalRef.afterClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        const id = this.transaction()?.id;
        if (!id) return;

        this.transactionService.deleteTransaction(id).subscribe({
          next: () => {
            this.transactionStore.loadTransactions(this.walletId!, 0, true);
            this.router.navigate(['/transactions']);
          },
          error: (err) => console.error('Erreur suppression :', err),
        });
      }
    });
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
