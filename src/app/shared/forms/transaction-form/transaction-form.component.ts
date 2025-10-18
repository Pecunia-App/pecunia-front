import { Component, inject, Input } from '@angular/core';
import { CategoriesStoreService } from '../../../_core/store/categories.store.service';
import { TagStoreService } from '../../../_core/store/tag.store.service';
import { ProvidersStoreService } from '../../../_core/store/providers.store.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategorySelectComponent } from './components/inputs/categorie-select/category-select.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { ProviderSelectComponent } from './components/inputs/provider-select/provider-select.component';
import { TransactionCreateDTO } from '../../../_core/models/transactions/transaction.dto';
import { TagSelectComponent } from './components/inputs/tag-select/tag-select.component';
import { UserStoreService } from '../../../_core/store/user.store.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CategorySelectComponent,
    ButtonComponent,
    ProviderSelectComponent,
    TagSelectComponent,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent {
  private readonly categoryStore = inject(CategoriesStoreService);
  private readonly tagStore = inject(TagStoreService);
  private readonly providerStore = inject(ProvidersStoreService);
  private readonly userStore = inject(UserStoreService);
  readonly categories = this.categoryStore.allCategories;
  readonly tags = this.tagStore.userTags;
  readonly providers = this.providerStore.userProviders;
  readonly walletId = this.userStore.wallet()?.id;

  private formBuilder = inject(FormBuilder);
  public isSubmitted = false;

  @Input() mode: 'create' | 'edit' = 'create';

  readonly transactionsForm: FormGroup = this.formBuilder.group({
    amount: [null],
    category: ['', [Validators.required]],
    provider: [null],
    tags: [[]],
    note: [''],
  });

  onSubmit(): void {
    console.log('fonction submit appelé');

    this.isSubmitted = true;
    if (this.transactionsForm.invalid) {
      this.isSubmitted = false;
      this.transactionsForm.markAllAsTouched();
      return;
    }
    const { category, provider, tags, note } = this.transactionsForm.value;
    console.log('tags avant réponse', tags);

    const payload: TransactionCreateDTO = {
      amount: {
        amount: 100, // Number(amount),
        currency: 'EUR', // à rendre dynamique si besoin plus tard
      },
      walletId: this.walletId as number,
      categoryId: category,
      ...(provider ? { providerId: provider } : {}),
      ...(tags && tags.length ? { tagsIds: tags } : {}),
      ...(note ? { note } : {}),
    };
    console.log('response', payload);
    this.isSubmitted = false;
  }
}
