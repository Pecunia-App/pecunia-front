import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserStoreService } from '../store/user.store.service';
import { ProvidersStoreService } from '../store/providers.store.service';

export const ProvidersResolver: ResolveFn<boolean> = () => {
  const userStore = inject(UserStoreService);
  const providersStore = inject(ProvidersStoreService);

  return new Promise<boolean>((resolve) => {
    const userInterval = setInterval(() => {
      const user = userStore.user();
      if (user) {
        clearInterval(userInterval);
        providersStore.loadAllProviders(user.id);

        const interval = setInterval(() => {
          if (!providersStore.isLoading()) {
            clearInterval(interval);
            resolve(true);
          }
        }, 50);
      }
    }, 50);
  });
};
