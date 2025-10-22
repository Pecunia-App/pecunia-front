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
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
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
    NzModalModule,
    NzButtonModule,
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
  private readonly modal = inject(NzModalService);

  // === Signals ===
  modalOpenProvider = signal(false);
  modelDeleteProvider = signal<{
    open: boolean;
    providerId?: number;
    providerName?: string;
  }>({
    open: false,
  });
  modalOpenTag = signal(false);
  modalDeleteTag = signal<{ open: boolean; tagId?: number; tagName?: string }>({
    open: false,
  });
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

  openDeleteTagModal(tagId: number): void {
    const tag = this.tags().find((t) => t.id === tagId);
    if (!tag) return;

    this.modal.confirm({
      nzTitle: `Supprimer l'étiquette "${tag.tagName}" ?`,
      nzContent: 'Cette action est irréversible.',
      nzOkText: 'Oui',
      nzOkDanger: true,
      nzOnOk: () => this.handleDeleteTag(tagId),
      nzCancelText: 'Non',
      nzCentered: true,
    });
  }

  openDeleteProviderModal(providerId: number): void {
    const provider = this.providers().find((p) => p.id === providerId);
    if (!provider) return;
    this.modal.confirm({
      nzTitle: `Supprimer le fournisseur "${provider.providerName}" ?`,
      nzContent: 'Cette action est irréversible.',
      nzOkText: 'Oui',
      nzOkDanger: true,
      nzOnOk: () => this.handleDeleteProvider(providerId),
      nzCancelText: 'Non',
      nzCentered: true,
    });
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

  // TAG CRUD

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

  handleDeleteTag(tagId: number): void {
    this.tagStore.isLoading.set(true);
    this.tagService.deleteTag(tagId).subscribe({
      next: () => {
        this.tagStore.userTags.update((tags) =>
          tags.filter((t) => t.id !== tagId)
        );
        this.tagStore.isLoading.set(false);
        this.notification.success(
          'Étiquette supprimée',
          'L’étiquette a été supprimée avec succès.',
          { nzDuration: 3000 }
        );
      },
      error: () => {
        this.tagStore.isLoading.set(false);
        this.notification.error(
          'Erreur',
          'Impossible de supprimer l’étiquette. Veuillez réessayer.'
        );
      },
    });
  } // PROVIDERS crud
  handleDeleteProvider(providerId: number): void {
    this.providerStore.isLoading.set(true);
    this.providerService.deleteProvider(providerId).subscribe({
      next: () => {
        this.providerStore.userProviders.update((providers) =>
          providers.filter((p) => p.id !== providerId)
        );
        this.providerStore.isLoading.set(false);
        this.notification.success(
          'Fournisseur supprimé',
          'Le fournisseur a été supprimé avec succès.',
          { nzDuration: 3000 }
        );
      },
      error: () => {
        this.providerStore.isLoading.set(false);
        this.notification.error(
          'Erreur',
          'Impossible de supprimer le fournisseur. Veuillez réessayer.'
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
}
