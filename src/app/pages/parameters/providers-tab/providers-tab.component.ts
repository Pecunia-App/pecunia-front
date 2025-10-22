import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import {
  DisplayInfo,
  ParameterListComponent,
} from '../parameter-list/parameter-list.component';
import {
  CreateEntityEvent,
  CreateEntityModalComponent,
} from '../create-entity-modal/create-entity-modal.component';
import {
  EditEntityModalComponent,
  UpdateEntityEvent,
} from '../edit-entity-modal/edit-entity-modal.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProvidersStoreService } from '../../../_core/store/providers.store.service';
import { UserStoreService } from '../../../_core/store/user.store.service';
import { ProvidersService } from '../../../_core/services/providers/providers.service';
import { ProviderDTO } from '../../../_core/models/transactions/provider.dto';

@Component({
  selector: 'app-providers-tab',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ParameterListComponent,
    CreateEntityModalComponent,
    EditEntityModalComponent,
    NzModalModule,
    NzButtonModule,
  ],
  templateUrl: './providers-tab.component.html',
  styleUrl: './providers-tab.component.scss',
})
export class ProvidersTabComponent {
  private readonly providerStore = inject(ProvidersStoreService);
  private readonly providerService = inject(ProvidersService);
  private readonly notification = inject(NzNotificationService);
  private readonly modal = inject(NzModalService);

  private readonly userStore = inject(UserStoreService);

  readonly providers = this.providerStore.userProviders;

  selectedProviderIds = signal<Set<number>>(new Set());
  modalOpenProvider = signal(false);
  modelDeleteProvider = signal<{
    open: boolean;
    providerId?: number;
    providerName?: string;
  }>({
    open: false,
  });
  modalEditProvider = signal<{
    open: boolean;
    providerId?: number;
    providerName?: string;
  }>({
    open: false,
  });

  selectedProvidersCount = computed(() => this.selectedProviderIds().size);
  hasSelectedProviders = computed(() => this.selectedProviderIds().size > 0);

  isProviderSelected = (id: number) => this.selectedProviderIds().has(id);
  getProviderDisplayInfo = (item: ProviderDTO): DisplayInfo => ({
    name: item.providerName,
  });

  openCreateProviderModal() {
    this.modalOpenProvider.set(true);
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

  openEditProviderModal(providerId: number) {
    const provider = this.providers().find((p) => p.id === providerId);
    if (!provider) return;
    this.modalEditProvider.set({
      open: true,
      providerId: provider.id,
      providerName: provider.providerName,
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

  deleteSelectedProviders(): void {
    const ids = this.selectedProviderIds();
    this.providers.update((providers) =>
      providers.filter((p) => !ids.has(p.id))
    );
    this.selectedProviderIds.set(new Set());
  }

  handleUpdateProvider(event: UpdateEntityEvent) {
    const providerId = this.modalEditProvider().providerId;
    const userId = this.userStore.userId;
    if (!userId || !providerId) return;
    this.providerService
      .updateProvider(providerId, { providerName: event.name })
      .subscribe({
        next: (updatedProvider) => {
          this.providerStore.userProviders.update((providers) =>
            providers.map((p) =>
              p.id === providerId
                ? {
                    ...p,
                    providerName: updatedProvider.providerName,
                  }
                : p
            )
          );
          this.modalEditProvider.set({ open: false });
        },
        error: () => {
          this.notification.error(
            'Erreur',
            'Impossible de mettre à jour le fournisseur.'
          );
        },
      });
  }
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
