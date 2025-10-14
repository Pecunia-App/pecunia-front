import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserStoreService } from '../store/user.store.service';
import { TransactionStore } from '../store/transactions.store.service';

export const TransactionListResolver: ResolveFn<boolean> = () => {
  const userStore = inject(UserStoreService);
  const transactionStore = inject(TransactionStore);

  return new Promise<boolean>((resolve) => {
    // On lance le chargement du wallet si besoin
    if (!userStore.wallet()) {
      userStore.loadWallet();
    }

    // On attend que le wallet soit chargé
    const walletInterval = setInterval(() => {
      const wallet = userStore.wallet();
      if (wallet) {
        clearInterval(walletInterval);
        const currentPage = transactionStore.currentPage();
        transactionStore.loadTransactions(wallet.id, currentPage);

        // On attend la fin du chargement des transactions
        const txInterval = setInterval(() => {
          if (!transactionStore.isLoading()) {
            clearInterval(txInterval);
            resolve(true);
          }
        }, 50);
      }
    }, 50);
  });
};
