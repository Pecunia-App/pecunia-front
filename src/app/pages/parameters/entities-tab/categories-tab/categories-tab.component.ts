import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CategoryDTO,
  CategoryUpsertDTO,
} from '../../../../_core/models/transactions/category.dto';
import { CategoriesService } from '../../../../_core/services/categories/categories.service';
import { CategoriesStoreService } from '../../../../_core/store/categories.store.service';
import { UserStoreService } from '../../../../_core/store/user.store.service';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import {
  ParameterListComponent,
  ParameterSection,
  DisplayInfo,
} from '../../parameter-list/parameter-list.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateCategoryModalComponent } from '../entities-modal/create-category-modal/create-category-modal.component';
import { EditCategoryModalComponent } from '../entities-modal/edit-category-modal/edit-category-modal.component';

@Component({
  selector: 'app-categories-tab',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ParameterListComponent,
    CreateCategoryModalComponent,
    EditCategoryModalComponent,
  ],
  templateUrl: './categories-tab.component.html',
  styleUrl: './categories-tab.component.scss',
})
export class CategoriesTabComponent {
  private readonly categoryStore = inject(CategoriesStoreService);
  private readonly categoryService = inject(CategoriesService);
  private readonly notification = inject(NzNotificationService);
  private readonly modal = inject(NzModalService);
  private readonly userStore = inject(UserStoreService);

  readonly categories = this.categoryStore.userCategories;
  modalOpenCategory = signal(false);
  modaleDeleteCategory = signal<{ open: boolean; categoryId?: number }>({
    open: false,
  });
  modalEditCategory = signal<{ open: boolean; category?: CategoryDTO }>({
    open: false,
  });

  selectedIncomeCategoryIds = signal<Set<number>>(new Set());
  selectedExpenseCategoryIds = signal<Set<number>>(new Set());

  get incomeCategories(): CategoryDTO[] {
    return this.categories().filter((c) => c.type === 'CREDIT');
  }

  get expenseCategories(): CategoryDTO[] {
    return this.categories().filter((c) => c.type === 'DEBIT');
  }
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

  openCreateCategoryModal() {
    this.modalOpenCategory.set(true);
  }

  openDeleteCategoryModal(categoryId: number): void {
    const category = this.categories().find((cat) => cat.id === categoryId);
    if (!category) return;
    this.modal.confirm({
      nzTitle: `Supprimer la catégorie "${category.categoryName}" ?`,
      nzContent: 'Cette action est irréversible.',
      nzOkText: 'Oui',
      nzOkDanger: true,
      nzOnOk: () => this.handleDeleteCategory(categoryId),
      nzCancelText: 'Non',
      nzCentered: true,
      nzNoAnimation: true,
    });
  }

  openEditCategoryModal(categoryId: number) {
    const category = this.categories().find((cat) => cat.id === categoryId);
    if (!category) return;
    this.modalEditCategory.set({
      open: true,
      category,
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

  handleDeleteCategory(categoryId: number): void {
    this.categoryStore.isLoading.set(true);
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.categoryStore.userCategories.update((categories) =>
          categories.filter((c) => c.id != categoryId)
        );
        this.categoryStore.isLoading.set(false);
        this.notification.success(
          'Categorie supprimée',
          'La catégorie a été supprimée avec succès'
        );
      },
      error: () => {
        this.categoryStore.isLoading.set(false);
        this.notification.error(
          'Erreur',
          'Impossible de supprimer la catégorie. Veuillez réessayer.'
        );
      },
    });
  }

  handleCreateCategory(event: CategoryUpsertDTO): void {
    if (!event.categoryName.trim()) return;
    const userId = this.userStore.userId;
    if (!userId) return;

    this.categoryStore.isLoading.set(true);
    this.categoryService
      .createCategory({
        categoryName: event.categoryName,
        icon: event.icon,
        color: event.color,
        type: event.type,
        isGlobal: event.isGlobal,
        userId,
      })
      .subscribe({
        next: (category) => {
          this.categoryStore.userCategories.update((list) => [
            ...list,
            category,
          ]);
          this.categoryStore.isLoading.set(false);
          this.notification.success(
            'Categorie créée',
            `La catégorie "${category.categoryName}" a été ajouté avec succès !`,
            { nzDuration: 3000 }
          );
        },
        error: () => {
          this.categoryStore.isLoading.set(false);
          this.notification.error(
            'Erreur',
            `Impossible de créer la catégorie. Veuillez réessayer.`
          );
        },
      });
  }

  handleUpdateCategory(event: CategoryUpsertDTO): void {
    const categoryId = this.modalEditCategory().category?.id;
    const userId = this.userStore.userId;
    if (!userId || !categoryId) return;
    this.categoryService
      .updateCategory(categoryId, {
        categoryName: event.categoryName,
        icon: event.icon,
        color: event.color,
        type: event.type,
        isGlobal: event.isGlobal,
        userId,
      })
      .subscribe({
        next: (updatedCategory) => {
          this.categoryStore.userCategories.update((categories) =>
            categories.map((category) =>
              category.id === categoryId
                ? {
                    ...category,
                    ...updatedCategory,
                  }
                : category
            )
          );
          this.modalEditCategory.set({ open: false });
        },
        error: () => {
          this.notification.error(
            'Erreur',
            'Impossible de mettre à jour la catégorie.'
          );
        },
      });
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
