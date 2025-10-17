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

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule, CategorySelectComponent, ButtonComponent],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent {
  private readonly categoryStore = inject(CategoriesStoreService);
  private readonly tagStore = inject(TagStoreService);
  private readonly providerStore = inject(ProvidersStoreService);
  readonly categories = this.categoryStore.allCategories;
  readonly tags = this.tagStore.userTags;
  readonly providers = this.providerStore.userProviders;

  private formBuilder = inject(FormBuilder);
  public isSubmitted = false;

  @Input() mode: 'create' | 'edit' = 'create';

  readonly transactionsForm: FormGroup = this.formBuilder.group({
    category: ['', [Validators.required]],
  });

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.transactionsForm.invalid) {
      this.isSubmitted = false;
      this.transactionsForm.markAllAsTouched();
      return;
    }
    const { category } = this.transactionsForm.value;
    const response = { category };
    console.log('response', response);
    this.isSubmitted = false;
  }
}
