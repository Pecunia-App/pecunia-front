import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { TransactionStore } from '../store/transactions.store.service';

export const TransactionDetailResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot
) => {
  const transactionStore = inject(TransactionStore);

  return new Promise<boolean>((resolve) => {
    const id = Number(route.paramMap.get('id'));
    if (!id) {
      resolve(true);
      return;
    }

    // pas de recharge si transaction
    const existing = transactionStore.getTransactionByIdFromStore();
    if (existing && existing.id === id) {
      resolve(true);
      return;
    }

    transactionStore.loadTransactionById(id);

    const txInterval = setInterval(() => {
      if (!transactionStore.isLoading()) {
        clearInterval(txInterval);
        resolve(true);
      }
    }, 50);
  });
};
