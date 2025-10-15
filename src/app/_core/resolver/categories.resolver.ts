import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserStoreService } from '../store/user.store.service';
import { CategoriesStoreService } from '../store/categories.store.service';

export const CategoriesResolver: ResolveFn<boolean> = () => {
  const userStore = inject(UserStoreService);
  const categoriesStore = inject(CategoriesStoreService);

  return new Promise<boolean>((resolve) => {
    const userInterval = setInterval(() => {
      const user = userStore.user();
      if (user) {
        clearInterval(userInterval);
        categoriesStore.loadAllCategories(user.id);

        const interval = setInterval(() => {
          if (!categoriesStore.isLoading()) {
            clearInterval(interval);
            resolve(true);
          }
        }, 50);
      }
    }, 50);
  });
};
