import { Component, inject, OnInit } from '@angular/core';
import { ConnectedLayoutComponent } from '../../../shared/layout/connected-layout/connected-layout.component';
import { CategoriesStoreService } from '../../../_core/store/categories.store.service';

@Component({
  selector: 'app-transactions-create',
  imports: [ConnectedLayoutComponent],
  templateUrl: './transactions-create.component.html',
  styleUrl: './transactions-create.component.scss',
})
export class TransactionsCreateComponent implements OnInit {
  private readonly categoryStore = inject(CategoriesStoreService);
  readonly categories = this.categoryStore.allCategories;

  ngOnInit(): void {
    this.categoryStore.loadAllCategories(19);
  }
}
