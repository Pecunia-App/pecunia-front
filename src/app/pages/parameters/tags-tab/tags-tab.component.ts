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
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TagsService } from '../../../_core/services/tags/tags.service';
import { TagStoreService } from '../../../_core/store/tag.store.service';
import { UserStoreService } from '../../../_core/store/user.store.service';
import { TagDTO } from '../../../_core/models/transactions/tag.dto';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-tags-tab',
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
  templateUrl: './tags-tab.component.html',
  styleUrl: './tags-tab.component.scss',
})
export class TagsTabComponent {
  private readonly tagStore = inject(TagStoreService);
  private readonly tagService = inject(TagsService);
  private readonly notification = inject(NzNotificationService);
  private readonly modal = inject(NzModalService);
  private readonly userStore = inject(UserStoreService);

  readonly tags = this.tagStore.userTags;

  selectedTagIds = signal<Set<number>>(new Set());
  modalOpenTag = signal(false);
  modalDeleteTag = signal<{ open: boolean; tagId?: number; tagName?: string }>({
    open: false,
  });
  modalEditTag = signal<{ open: boolean; tagId?: number; tagName?: string }>({
    open: false,
  });

  selectedTagsCount = computed(() => this.selectedTagIds().size);
  hasSelectedTags = computed(() => this.selectedTagIds().size > 0);

  openCreateTagModal() {
    this.modalOpenTag.set(true);
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

  isTagSelected = (id: number) => this.selectedTagIds().has(id);
  getTagDisplayInfo = (item: TagDTO): DisplayInfo => ({
    name: item.tagName,
  });

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

  openEditTagModal(tagId: number) {
    const tag = this.tags().find((t) => t.id === tagId);
    if (!tag) return;
    this.modalEditTag.set({ open: true, tagId: tag.id, tagName: tag.tagName });
  }
  handleUpdateTag(event: UpdateEntityEvent) {
    const tagId = this.modalEditTag().tagId;
    const userId = this.userStore.userId;
    if (!userId || !tagId) return;
    this.tagService
      .updateTag(tagId, {
        tagName: event.name,
        userId: userId,
      })
      .subscribe({
        next: (updatedTag) => {
          this.tagStore.userTags.update((tags) =>
            tags.map((t) =>
              t.id === tagId
                ? {
                    ...t,
                    tagName: updatedTag.tagName,
                    updatedAt: new Date().toISOString(),
                  }
                : t
            )
          );
          this.modalEditTag.set({ open: false });
        },
        error: () => {
          this.notification.error(
            'Erreur',
            'Impossible de mettre à jour l’étiquette.'
          );
        },
      });
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
  }
}
