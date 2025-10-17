import { Component, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputComponent } from '../../../../../ui/input/input.component';
import { IconComponent } from '../../../../../ui/icon/icon.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CategoriesStoreService } from '../../../../../../_core/store/categories.store.service';
import { CategoryDTO } from '../../../../../../_core/models/transactions/category.dto';
import { CategorySelectModalComponent } from '../../modals/category-select-modal/category-select-modal.component';

@Component({
  selector: 'app-category-select',
  imports: [InputComponent, IconComponent, NzModalModule],
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategorySelectComponent),
      multi: true,
    },
  ],
})
export class CategorySelectComponent implements ControlValueAccessor {
  private readonly modal = inject(NzModalService);
  private readonly categoriesStore = inject(CategoriesStoreService);
  // ControlValueAccessor implementation
  private onChange: (value: string | number) => void = () => {
    /* intentionally empty */
  };
  private onTouched: () => void = () => {
    /* intentionally empty */
  };

  selectedCategory: CategoryDTO | null = null;

  writeValue(id: number | null): void {
    if (id !== null) {
      this.selectedCategory = this.categoriesStore.getCategoryById(id) ?? null;
    } else {
      this.selectedCategory = null;
    }
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  openModal(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Sélectionner une catégorie',
      nzContent: CategorySelectModalComponent,
      nzFooter: null,
      nzCentered: true,
      nzClassName: 'category-modal',
      nzNoAnimation: true,
    });

    modalRef.afterClose.subscribe((category: CategoryDTO | null) => {
      if (category) {
        this.selectedCategory = category;
        // propagate value to the form control (use the category id)
        this.onChange(category.id);
        this.onTouched();
        console.log('categorie choisie', category.categoryName);
      }
    });
  }
}
