import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserStoreService } from '../store/user.store.service';
import { TagStoreService } from '../store/tag.store.service';

export const TagsResolver: ResolveFn<boolean> = () => {
  const userStore = inject(UserStoreService);
  const tagsStore = inject(TagStoreService);

  return new Promise<boolean>((resolve) => {
    const userInterval = setInterval(() => {
      const user = userStore.user();
      if (user) {
        clearInterval(userInterval);
        tagsStore.loadAllTags(user.id);

        const interval = setInterval(() => {
          if (!tagsStore.isLoading()) {
            clearInterval(interval);
            resolve(true);
          }
        }, 50);
      }
    }, 50);
  });
};
