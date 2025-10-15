import { inject, Injectable, signal } from '@angular/core';
import { TagDTO } from '../models/transactions/tag.dto';
import { TagsService } from '../services/tags/tags.service';

@Injectable({
  providedIn: 'root',
})
export class TagStoreService {
  private readonly tagsService = inject(TagsService);
  readonly userTags = signal<TagDTO[]>([]);
  readonly selectedTag = signal<TagDTO | null>(null);
  readonly isLoading = signal(false);
  private loaded = false;

  loadAllTags(userId: number, forceRefresh = false): void {
    if (this.loaded && !forceRefresh) return;
    this.isLoading.set(true);
    this.tagsService.getUserTags(userId).subscribe({
      next: (tags) => {
        this.userTags.set(tags);
        this.isLoading.set(false);
        this.loaded = true;
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  getTagById(id: number): void {
    this.isLoading.set(true);
    this.tagsService.getTagById(id).subscribe({
      next: (tag) => {
        this.selectedTag.set(tag);
        this.isLoading.set(false);
      },
      error: () => {
        this.selectedTag.set(null);
        this.isLoading.set(false);
      },
    });
  }

  getByIdFromStore(id: number): TagDTO | undefined {
    return this.userTags().find((tag) => tag.id === id);
  }

  reset(): void {
    this.userTags.set([]);
    this.selectedTag.set(null);
    this.loaded = false;
  }
}
