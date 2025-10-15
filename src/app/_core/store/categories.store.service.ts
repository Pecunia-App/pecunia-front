import { inject, Injectable, signal } from '@angular/core';
import { CategoryDTO } from '../models/transactions/category.dto';
import { CategoriesService } from '../services/categories/categories.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesStoreService {
  readonly globalCategories = signal<CategoryDTO[]>([]);
  readonly userCategories = signal<CategoryDTO[]>([]);
  readonly allCategories = signal<CategoryDTO[]>([]);
  readonly isLoading = signal(false);
  private readonly categoriesService = inject(CategoriesService);
  private loaded = false;

  loadAllCategories(userId: number, forceRefresh = false): void {
    if (this.loaded && !forceRefresh) {
      return;
    }
    this.isLoading.set(true);

    forkJoin({
      global: this.categoriesService.getGlobalCategories(),
      personal: this.categoriesService.getUserCategories(userId),
    }).subscribe({
      next: ({ global, personal }) => {
        this.globalCategories.set(global);
        this.userCategories.set(personal);
        this.allCategories.set([...global, ...personal]);
        this.isLoading.set(false);
        this.loaded = true;
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  getCategoryById(id: number): CategoryDTO | undefined {
    return this.allCategories().find((c) => c.id === id);
  }

  reset(): void {
    this.loaded = false;
    this.globalCategories.set([]);
    this.userCategories.set([]);
    this.allCategories.set([]);
  }
}
