import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
import { CategoryDTO } from '../../_core/models/transactions/category.dto';
import { TagDTO } from '../../_core/models/transactions/tag.dto';
import { ProviderDTO } from '../../_core/models/transactions/provider.dto';
import { ProvidersService } from '../../_core/services/providers/providers.service';
import { CategoriesService } from '../../_core/services/categories/categories.service';
import { TagsService } from '../../_core/services/tags/tags.service';
import { UserStoreService } from '../../_core/store/user.store.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  CreateEntityEvent,
  CreateEntityModalComponent,
} from './create-entity-modal/create-entity-modal.component';
export type ParametersTabs = 'categories' | 'tags' | 'providers';

@Component({
  selector: 'app-parameters',
  imports: [
    ConnectedLayoutComponent,
    CommonModule,
    ButtonComponent,
    TabsNavigationComponent,
    ParameterListComponent,
    CreateEntityModalComponent,
  ],
  templateUrl: './parameters.component.html',
  styleUrl: './parameters.component.scss',
})
export class ParametersComponent implements OnInit {
  private readonly providerStore = inject(ProvidersStoreService);
  private readonly categoryStore = inject(CategoriesStoreService);
  private readonly tagStore = inject(TagStoreService);
  private readonly providerService = inject(ProvidersService);
  private readonly categoryService = inject(CategoriesService);
  private readonly tagService = inject(TagsService);
  private readonly userStore = inject(UserStoreService);
  private readonly notification = inject(NzNotificationService);

  // === Signals ===
  modalOpenProvider = signal(false);
  modalOpenTag = signal(false);
  activeTab = signal<ParametersTabs>('categories');
  selectedIncomeCategoryIds = signal<Set<number>>(new Set());
  selectedExpenseCategoryIds = signal<Set<number>>(new Set());
  selectedTagIds = signal<Set<number>>(new Set());
  selectedProviderIds = signal<Set<number>>(new Set());

  openCreateProviderModal() {
    this.modalOpenProvider.set(true);
  }
  openCreateTagModal() {
    this.modalOpenTag.set(true);
  }

  // === Data ===
  readonly providers = this.providerStore.userProviders;
  readonly categories = this.categoryStore.userCategories;
  readonly tags = this.tagStore.userTags;

  tabs: Tab[] = [
    { tabParams: 'categories', label: 'Catégories' },
    { tabParams: 'tags', label: 'Tags' },
    { tabParams: 'providers', label: 'Fournisseurs' },
  ];

  ngOnInit() {
    this.userStore.loadUser();
  }

  get currentUserId(): number | null {
    return this.userStore.user()?.id ?? null;
  }

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

  handleCreateTag(event: CreateEntityEvent): void {
    if (!event.name.trim()) return;
    const userId = this.userStore.userId;
    if (!userId) return;

    this.tagStore.isLoading.set(true);
    this.tagService.createTag({ tagName: event.name, userId }).subscribe({
      next: (tag) => {
        this.tagStore.userTags.update((list) => [...list, tag]);
        this.tagStore.loadAllTags(userId, true);
        this.tagStore.isLoading.set(false);
        this.notification.success(
          'Étiquette créée',
          `L'étiquette "${tag.tagName}" a été ajouté avec succès !`,
          { nzDuration: 3000 }
        );
      },
      error: () => {
        this.tagStore.isLoading.set(false);
        this.notification.error(
          'Erreur',
          `Impossible de créer l'étiquette. Veuillez réessayer.`
        );
      },
    });
  }

  handleCreateProvider(event: CreateEntityEvent): void {
    if (!event.name.trim()) return;
    const userId = this.userStore.userId;
    if (!userId) return;

    this.providerStore.isLoading.set(true);
    this.providerService
      .createProvider({ providerName: event.name, userId })
      .subscribe({
        next: (provider) => {
          this.providerStore.userProviders.update((list) => [
            ...list,
            provider,
          ]);
          this.providerStore.isLoading.set(false);
          this.notification.success(
            'Fournisseur créé',
            `Le fournisseur "${provider.providerName}" a été ajouté avec succès !`,
            { nzDuration: 3000 }
          );
        },
        error: () => {
          this.providerStore.isLoading.set(false);
          this.notification.error(
            'Erreur',
            'Impossible de créer le fournisseur. Veuillez réessayer.'
          );
        },
      });
  }
  editProvider(providerId: number): void {
    console.log('Edit provider:', providerId);
  }
}
