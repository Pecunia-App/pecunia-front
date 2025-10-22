import { Component, computed, inject, signal } from '@angular/core';
import { CategoriesService } from '../../../_core/services/categories/categories.service';
import { CategoriesStoreService } from '../../../_core/store/categories.store.service';
import { UserStoreService } from '../../../_core/store/user.store.service';
import { CategoryDTO } from '../../../_core/models/transactions/category.dto';
import {
  DisplayInfo,
  ParameterListComponent,
  ParameterSection,
} from '../parameter-list/parameter-list.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-categories-tab',
  imports: [CommonModule, ButtonComponent, ParameterListComponent],
  templateUrl: './categories-tab.component.html',
  styleUrl: './categories-tab.component.scss',
})
export class CategoriesTabComponent {
  private readonly categoryStore = inject(CategoriesStoreService);
  private readonly categoryService = inject(CategoriesService);
  private readonly userStore = inject(UserStoreService);

  selectedIncomeCategoryIds = signal<Set<number>>(new Set());
  selectedExpenseCategoryIds = signal<Set<number>>(new Set());

  readonly categories = this.categoryStore.userCategories;

  get incomeCategories(): CategoryDTO[] {
    return this.categories().filter((c) => c.type === 'CREDIT');
  }

  // Getter pour les catégories de dépenses (DEBIT)
  get expenseCategories(): CategoryDTO[] {
    return this.categories().filter((c) => c.type === 'DEBIT');
  }
  // computed pour générer les sections pour le composant générique
  get sections(): ParameterSection<CategoryDTO>[] {
    return [
      {
        title: 'Catégories de revenus',
        prefix: 'income-category',
        items: computed(() =>
          this.categories().filter((c) => c.type === 'CREDIT')
        ),
      },
      {
        title: 'Catégories de dépenses',
        prefix: 'expense-category',
        items: computed(() =>
          this.categories().filter((c) => c.type === 'DEBIT')
        ),
      },
    ];
  }

  selectedCategoriesCount = computed(
    () =>
      this.selectedIncomeCategoryIds().size +
      this.selectedExpenseCategoryIds().size
  );
  hasSelectedCategories = computed(() => this.selectedCategoriesCount() > 0);
  toggleCategorySelection(categoryId: number, isIncome: boolean): void {
    const targetSet = isIncome
      ? this.selectedIncomeCategoryIds
      : this.selectedExpenseCategoryIds;

    targetSet.update((set) => {
      const next = new Set(set);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }

  isCategorySelected = (id: number, prefix: string): boolean => {
    return prefix === 'income-category'
      ? this.selectedIncomeCategoryIds().has(id)
      : this.selectedExpenseCategoryIds().has(id);
  };

  getCategoryDisplayInfo = (item: CategoryDTO): DisplayInfo => ({
    name: item.categoryName,
    icon: item.icon,
    color: item.color,
  });

  createCategory(): void {
    console.log('Create category');
  }

  editCategory(categoryId: number): void {
    console.log('Edit category:', categoryId);
  }

  deleteSelectedCategories(): void {
    const incomeIds = this.selectedIncomeCategoryIds();
    const expenseIds = this.selectedExpenseCategoryIds();

    this.categories.update((cats) =>
      cats.filter(
        (cat) =>
          !(cat.type === 'CREDIT' && incomeIds.has(cat.id)) &&
          !(cat.type === 'DEBIT' && expenseIds.has(cat.id))
      )
    );
    this.selectedIncomeCategoryIds.set(new Set());
    this.selectedExpenseCategoryIds.set(new Set());
  }
}
