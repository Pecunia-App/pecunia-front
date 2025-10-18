import { Component, inject } from '@angular/core';
import { ConnectedLayoutComponent } from '../../../shared/layout/connected-layout/connected-layout.component';
import { CategoriesStoreService } from '../../../_core/store/categories.store.service';
import { TagStoreService } from '../../../_core/store/tag.store.service';
import { ProvidersStoreService } from '../../../_core/store/providers.store.service';
import { TransactionFormComponent } from '../../../shared/forms/transaction-form/transaction-form.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions-create',
  imports: [
    ConnectedLayoutComponent,
    TransactionFormComponent,
    ButtonComponent,
    FormsModule,
  ],
  templateUrl: './transactions-create.component.html',
  styleUrl: './transactions-create.component.scss',
})
export class TransactionsCreateComponent {
  private readonly categoryStore = inject(CategoriesStoreService);
  private readonly tagStore = inject(TagStoreService);
  private readonly providerStore = inject(ProvidersStoreService);
  readonly categories = this.categoryStore.allCategories;
  readonly tags = this.tagStore.userTags;
  readonly providers = this.providerStore.userProviders;

  readonly router = inject(Router);

  testValue = false;

  navigateToTranstactions(): void {
    this.router.navigate(['/transactions']);
  }
}
