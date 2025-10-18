import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TagStoreService } from '../../../../../../_core/store/tag.store.service';
import { TagDTO } from '../../../../../../_core/models/transactions/tag.dto';
import { CheckboxComponent } from '../../../../../ui/checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../../ui/button/button.component';

@Component({
  selector: 'app-tag-select-modal',
  imports: [CommonModule, CheckboxComponent, ButtonComponent],
  templateUrl: './tag-select-modal.component.html',
  styleUrl: './tag-select-modal.component.scss',
})
export class TagSelectModalComponent implements OnInit {
  // ✅ Intercepte globalement Enter pendant que la modale est ouverte
  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }
  private readonly modalRef = inject(NzModalRef);
  private readonly tagStore = inject(TagStoreService);

  @Input() initialSelection: TagDTO[] = [];
  selectedIds = new Set<number>();

  ngOnInit(): void {
    // Pré-sélection pour le mode update
    this.initialSelection.forEach((tag) => this.selectedIds.add(tag.id));
  }

  readonly tags = this.tagStore.userTags();

  selectTags(tags: TagDTO[]) {
    this.modalRef.close(tags);
  }

  toggleTag(tagId: number, checked: boolean) {
    if (checked) {
      this.selectedIds.add(tagId);
    } else {
      this.selectedIds.delete(tagId);
    }
  }

  isSelected(tag: TagDTO): boolean {
    return this.selectedIds.has(tag.id);
  }

  confirm(): void {
    const selectedTags = this.tags.filter((tag) =>
      this.selectedIds.has(tag.id)
    );
    this.modalRef.close(selectedTags);
  }

  cancel(): void {
    this.modalRef.close(null);
  }
}
