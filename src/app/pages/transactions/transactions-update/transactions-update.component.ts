import { Component, inject, OnInit, signal } from '@angular/core';
import { ConnectedLayoutComponent } from '../../../shared/layout/connected-layout/connected-layout.component';
import { ActivatedRoute } from '@angular/router';
import { TransactionsService } from '../../../_core/services/transactions/transactions.service';
import { TransactionDTO } from '../../../_core/models/transactions/transaction.dto';
import { TransactionStore } from '../../../_core/store/transactions.store.service';

@Component({
  selector: 'app-transactions-update',
  imports: [ConnectedLayoutComponent],
  templateUrl: './transactions-update.component.html',
  styleUrl: './transactions-update.component.scss',
})
export class TransactionsUpdateComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly transactionsService = inject(TransactionsService);
  private readonly transctionStore = inject(TransactionStore);
  readonly transaction = signal<TransactionDTO | null>(null);
  readonly loading = this.transctionStore.isLoading;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.transactionsService.getTransactionById(id).subscribe({
      next: (tx) => {
        this.transaction.set(tx ?? null);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.transaction.set(null);
      },
    });
  }
}
