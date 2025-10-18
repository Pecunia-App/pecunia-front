import { Component, forwardRef, inject } from '@angular/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { IconComponent } from '../../../../../ui/icon/icon.component';
import { InputComponent } from '../../../../../ui/input/input.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TagStoreService } from '../../../../../../_core/store/tag.store.service';
import { TagDTO } from '../../../../../../_core/models/transactions/tag.dto';
import { TagSelectModalComponent } from '../../modals/tag-select-modal/tag-select-modal.component';

@Component({
  selector: 'app-tag-select',
  imports: [InputComponent, IconComponent, NzModalModule],
  templateUrl: './tag-select.component.html',
  styleUrl: './tag-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagSelectComponent),
      multi: true,
    },
  ],
})
export class TagSelectComponent implements ControlValueAccessor {
  private readonly modal = inject(NzModalService);
  private readonly tagsStore = inject(TagStoreService);
  selectedTags: TagDTO[] = [];
  selectedIds = new Set<number>();

  // ControlValueAccessor implementation
  private onChange: (val: number[]) => void = () => {
    /* intentionally empty */
  };
  private onTouched: () => void = () => {
    /* intentionally empty */
  };

  writeValue(val: number[]): void {
    // if (val.length === 0) return;
    const tags = val.map((id) =>
      this.tagsStore.userTags().filter((tag) => tag.id === id)
    );
    this.selectedTags = tags.flat();
    console.log('selected tags', this.selectedTags);
  }

  registerOnChange(fn: (val: number[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  openModal(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Sélectionner des tags',
      nzContent: TagSelectModalComponent,
      nzFooter: null,
      nzKeyboard: false, //
      nzCentered: true,
      nzClassName: 'tags-modal',
      nzNoAnimation: true,
      nzAutofocus: null,
    });
    modalRef.afterClose.subscribe((tags: TagDTO[] | null) => {
      if (tags) {
        this.selectedTags = tags.flat();
        const arrayId = this.selectedTags.map((tag) => tag.id);
        // propagate value to the form control (use the provider id)
        this.onChange(arrayId);
        this.onTouched();
        console.log('tags choisi', arrayId);
      }
    });
  }

  get displayValue(): string {
    return this.selectedTags.map((t) => t.tagName).join(', ');
  }
}
