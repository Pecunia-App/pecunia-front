import { Component, inject, OnInit, signal } from '@angular/core';
import { ConnectedLayoutComponent } from '../../../shared/layout/connected-layout/connected-layout.component';
import { TransactionStore } from '../../../_core/store/transactions.store.service';
import { TransactionFormComponent } from '../../../shared/forms/transaction-form/transaction-form.component';
import { TransactionDTO } from '../../../_core/models/transactions/transaction.dto';
import { formatDateFr } from '../../../_core/utils/format.utils';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions-update',
  imports: [
    ConnectedLayoutComponent,
    TransactionFormComponent,
    ButtonComponent,
  ],
  templateUrl: './transactions-update.component.html',
  styleUrl: './transactions-update.component.scss',
})
export class TransactionsUpdateComponent implements OnInit {
  private readonly transactionStore = inject(TransactionStore);
  readonly router = inject(Router);
  readonly transaction = signal<TransactionDTO | undefined | null>(undefined);
  readonly loading = this.transactionStore.isLoading;
  isLoaded = true;

  ngOnInit(): void {
    const selectedTransaction = this.transactionStore.selectedTransaction();
    this.transaction.set(selectedTransaction);
  }

  formatDate(date: string) {
    return formatDateFr(date);
  }

  navigateToTranstaction() {
    this.router.navigate(['/transactions/', this.transaction()?.id]);
  }
}
