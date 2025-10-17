import { Component, computed, inject, signal } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CategoriesStoreService } from '../../../../../../_core/store/categories.store.service';
import { CategoryDTO } from '../../../../../../_core/models/transactions/category.dto';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { BadgeComponent } from '../../../../../ui/badge/badge.component';

@Component({
  selector: 'app-category-select-modal',
  imports: [CommonModule, NzTabsModule, BadgeComponent],
  templateUrl: './category-select-modal.component.html',
  styleUrl: './category-select-modal.component.scss',
})
export class CategorySelectModalComponent {
  private readonly modalRef = inject(NzModalRef);
  private readonly categoriesStore = inject(CategoriesStoreService);
  activeTab = signal<'debit' | 'credit'>('debit');

  setActiveTab(tab: 'debit' | 'credit') {
    this.activeTab.set(tab);
  }

  readonly debitCategories = computed(() =>
    this.categoriesStore.allCategories().filter((c) => c.type === 'DEBIT')
  );

  readonly creditCategories = computed(() =>
    this.categoriesStore.allCategories().filter((c) => c.type === 'CREDIT')
  );

  selectCategory(category: CategoryDTO) {
    this.modalRef.close(category);
  }
}
