import { Component, computed, inject, signal } from '@angular/core';
import { ConnectedLayoutComponent } from '../../shared/layout/connected-layout/connected-layout.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import {
  Tab,
  TabsNavigationComponent,
} from './tabs-navigation/tabs-navigation.component';
import {
  DisplayInfo,
  ParameterListComponent,
  ParameterSection,
} from './parameter-list/parameter-list.component';
import { ProvidersStoreService } from '../../_core/store/providers.store.service';
import { CategoriesStoreService } from '../../_core/store/categories.store.service';
import { TagStoreService } from '../../_core/store/tag.store.service';
import { UserStoreService } from '../../_core/store/user.store.service';
import { CategoryDTO } from '../../_core/models/transactions/category.dto';
import { TagDTO } from '../../_core/models/transactions/tag.dto';
import { ProviderDTO } from '../../_core/models/transactions/provider.dto';

export type ParametersTabs = 'categories' | 'tags' | 'providers';

@Component({
  selector: 'app-parameters',
  imports: [
    ConnectedLayoutComponent,
    CommonModule,
    ButtonComponent,
    TabsNavigationComponent,
    ParameterListComponent,
  ],
  templateUrl: './parameters.component.html',
  styleUrl: './parameters.component.scss',
})
export class ParametersComponent {
  private readonly providerStore = inject(ProvidersStoreService);
  private readonly categoryStore = inject(CategoriesStoreService);
  private readonly tagStore = inject(TagStoreService);
  private userStore = inject(UserStoreService);

  readonly providers = this.providerStore.userProviders;
  readonly categories = this.categoryStore.userCategories;
  readonly tags = this.tagStore.userTags;

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

  activeTab = signal<ParametersTabs>('categories');
  tabs: Tab[] = [
    { tabParams: 'categories', label: 'Catégories' },
    { tabParams: 'tags', label: 'Tags' },
    { tabParams: 'providers', label: 'Fournisseurs' },
  ];

  selectedIncomeCategoryIds = signal<Set<number>>(new Set());
  selectedExpenseCategoryIds = signal<Set<number>>(new Set());
  selectedTagIds = signal<Set<number>>(new Set());
  selectedProviderIds = signal<Set<number>>(new Set());

  selectedCategoriesCount = computed(
    () =>
      this.selectedIncomeCategoryIds().size +
      this.selectedExpenseCategoryIds().size
  );
  hasSelectedCategories = computed(() => this.selectedCategoriesCount() > 0);

  selectedTagsCount = computed(() => this.selectedTagIds().size);
  hasSelectedTags = computed(() => this.selectedTagIds().size > 0);

  selectedProvidersCount = computed(() => this.selectedProviderIds().size);
  hasSelectedProviders = computed(() => this.selectedProviderIds().size > 0);

  // SETTERS & MÉTHODES
  setActiveTab(tab: ParametersTabs): void {
    this.activeTab.set(tab);
  }

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

  toggleTagSelection(tagId: number): void {
    this.selectedTagIds.update((set) => {
      const next = new Set(set);
      if (next.has(tagId)) {
        next.delete(tagId);
      } else {
        next.add(tagId);
      }
      return next;
    });
  }

  toggleProviderSelection(providerId: number): void {
    this.selectedProviderIds.update((set) => {
      const next = new Set(set);
      if (next.has(providerId)) {
        next.delete(providerId);
      } else {
        next.add(providerId);
      }
      return next;
    });
  }

  isCategorySelected = (id: number, prefix: string): boolean => {
    return prefix === 'income-category'
      ? this.selectedIncomeCategoryIds().has(id)
      : this.selectedExpenseCategoryIds().has(id);
  };

  isTagSelected = (id: number) => this.selectedTagIds().has(id);
  isProviderSelected = (id: number) => this.selectedProviderIds().has(id);
  getCategoryDisplayInfo = (item: CategoryDTO): DisplayInfo => ({
    name: item.categoryName,
    icon: item.icon,
    color: item.color,
  });

  getTagDisplayInfo = (item: TagDTO): DisplayInfo => ({
    name: item.tagName,
  });

  getProviderDisplayInfo = (item: ProviderDTO): DisplayInfo => ({
    name: item.providerName,
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

  deleteSelectedTags(): void {
    const ids = this.selectedTagIds();
    this.tags.update((tags) => tags.filter((t) => !ids.has(t.id)));
    this.selectedTagIds.set(new Set());
  }

  deleteSelectedProviders(): void {
    const ids = this.selectedProviderIds();
    this.providers.update((providers) =>
      providers.filter((p) => !ids.has(p.id))
    );
    this.selectedProviderIds.set(new Set());
  }

  createItem(): void {
    console.log('Create tag');
  }

  editTag(tagId: number): void {
    console.log('Edit tag:', tagId);
  }

  createProvider(): void {
    console.log('Create provider');
  }

  editProvider(providerId: number): void {
    console.log('Edit provider:', providerId);
  }

  // ===== GENERIC =====
  deleteItem(itemId: number): void {
    console.log('Delete item:', itemId);
    switch (this.activeTab()) {
      case 'categories':
        this.deleteSelectedCategories();
        break;
      case 'tags':
        this.tags.update((items) => items.filter((item) => item.id !== itemId));
        break;
      case 'providers':
        this.providers.update((items) =>
          items.filter((item) => item.id !== itemId)
        );
        break;
    }
  }
}
