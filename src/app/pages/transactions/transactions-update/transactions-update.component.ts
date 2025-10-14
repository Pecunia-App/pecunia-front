import { Component, inject } from '@angular/core';
import { ConnectedLayoutComponent } from '../../../shared/layout/connected-layout/connected-layout.component';
import { TransactionStore } from '../../../_core/store/transactions.store.service';

@Component({
  selector: 'app-transactions-update',
  imports: [ConnectedLayoutComponent],
  templateUrl: './transactions-update.component.html',
  styleUrl: './transactions-update.component.scss',
})
export class TransactionsUpdateComponent {
  private readonly transactionStore = inject(TransactionStore);
  readonly transaction = this.transactionStore.selectedTransaction;
  readonly loading = this.transactionStore.isLoading;
}
