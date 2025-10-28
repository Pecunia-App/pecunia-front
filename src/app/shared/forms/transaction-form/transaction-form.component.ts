import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
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
import {
  TransactionCreateDTO,
  TransactionDTO,
  TransactionUpdateDTO,
} from '../../../_core/models/transactions/transaction.dto';
import { TagSelectComponent } from './components/inputs/tag-select/tag-select.component';
import { UserStoreService } from '../../../_core/store/user.store.service';
import { InputComponent } from '../../ui/input/input.component';
import { IconComponent } from '../../ui/icon/icon.component';
import { FormUtilsService } from '../../../_core/services/form-utils.service';
import { TransactionForm } from '../../../_core/models/forms.model';
import { TransactionsService } from '../../../_core/services/transactions/transactions.service';
import { TransactionStore } from '../../../_core/store/transactions.store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CategorySelectComponent,
    ButtonComponent,
    ProviderSelectComponent,
    TagSelectComponent,
    InputComponent,
    IconComponent,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnChanges {
  private readonly categoryStore = inject(CategoriesStoreService);
  private readonly transactionsService = inject(TransactionsService);
  private readonly tagStore = inject(TagStoreService);
  private readonly providerStore = inject(ProvidersStoreService);
  private readonly userStore = inject(UserStoreService);
  private readonly transactionStore = inject(TransactionStore);
  private readonly router = inject(Router);
  private readonly formUtils = inject(FormUtilsService);
  private apiError: string | null = null;
  readonly categories = this.categoryStore.allCategories;
  readonly tags = this.tagStore.userTags;
  readonly providers = this.providerStore.userProviders;
  readonly walletId = this.userStore.wallet()?.id;
  readonly walletCurrency = this.userStore.wallet()?.amount?.currency;

  private formBuilder = inject(FormBuilder);
  public isSubmitted = false;

  @Input() mode: 'create' | 'edit' = 'create';
  @Input() transactionToEdit?: TransactionDTO;
  @Input() isLoaded = true;
  @Output() isLoadedChange = new EventEmitter<boolean>();

  private setLoading(loading: boolean) {
    this.isLoaded = loading;
    this.isLoadedChange.emit(loading);
  }

  ngOnChanges(): void {
    if (this.mode === 'edit') {
      setTimeout(() => {
        if (this.transactionToEdit) {
          this.transactionsForm.patchValue({
            category: this.transactionToEdit.category.id,
            provider: this.transactionToEdit.provider?.id ?? null,
            tags: this.transactionToEdit.tags?.map((t) => t.id) ?? [],
            amount: this.transactionToEdit.amount.amount,
            note: this.transactionToEdit.note,
          });
        }
      });
    }
  }

  readonly transactionsForm: FormGroup = this.formBuilder.group({
    category: ['', [Validators.required]],
    provider: [null],
    tags: [[]],
    amount: [
      null,
      [Validators.required, Validators.min(0), Validators.max(999999)],
    ],
    note: ['', [Validators.minLength(3), Validators.maxLength(20)]],
  });

  isFieldInError(field: keyof TransactionForm): boolean {
    return (
      this.formUtils.isFieldInError<TransactionForm>(
        this.transactionsForm,
        field,
        this.isSubmitted
      ) || !!this.apiError
    );
  }

  getFieldStatus(field: keyof TransactionForm): 'error' | 'success' | null {
    if (this.isFieldInError(field)) return 'error';
    if (
      this.transactionsForm.controls[field].valid &&
      this.transactionsForm.controls[field].touched
    )
      return 'success';
    return null;
  }

  handleFieldErrors(field: keyof TransactionForm): string {
    const control = this.transactionsForm.controls[field];
    if (this.apiError) return this.apiError!;
    if (!this.isFieldInError(field)) return '';

    switch (field) {
      case 'category':
        return this.formUtils.getNameError(control);
      case 'amount':
        return this.formUtils.getAmountError(control);
      case 'provider':
        return this.formUtils.getNameError(control);
      case 'note':
        return this.formUtils.getNameError(control);
      case 'tags':
        return this.formUtils.getNameError(control);
      default:
        return this.formUtils.getStandardErrorMessage(control);
    }
  }

  createTransaction() {
    const { category, provider, tags, note, amount } =
      this.transactionsForm.value;
    const payload: TransactionCreateDTO = {
      amount: {
        amount: Number(amount), // Number(amount),
        currency: this.walletCurrency as string, // à rendre dynamique si besoin plus tard
      },
      walletId: this.walletId as number,
      categoryId: category,
      ...(provider ? { providerId: provider } : {}),
      ...(tags && tags.length ? { tagsIds: tags } : {}),
      ...(note ? { note } : {}),
    };
    return payload;
  }

  updateTransaction() {
    const update = {
      ...this.createTransaction(),
      id: this.transactionToEdit?.id,
    } as TransactionUpdateDTO;

    console.log(update);
    return update;
  }

  resetOnSuccess() {
    this.isSubmitted = false;
    this.transactionStore.loadTransactions(this.walletId!, 0, true);
    this.setLoading(true);
    this.router.navigate(['/transactions']);
  }

  resetOnError() {
    // Marque les champs comme touchés pour forcer l'affichage de l'erreur
    this.transactionsForm.controls['category'].markAsTouched();
    this.transactionsForm.controls['provider'].markAsTouched();
    this.transactionsForm.controls['tags'].markAsTouched();
    this.transactionsForm.controls['amount'].markAsTouched();
    this.transactionsForm.controls['note'].markAsTouched();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.setLoading(false);
    if (this.transactionsForm.invalid) {
      this.isSubmitted = false;
      this.setLoading(true);
      this.transactionsForm.markAllAsTouched();
      return;
    }

    if (this.mode === 'create') {
      const payload = this.createTransaction();

      this.transactionsService.createTransaction(payload).subscribe({
        next: () => {
          this.resetOnSuccess();
        },
        error: (err) => {
          this.setLoading(true);
          this.apiError =
            typeof err.error === 'string' ? err.error : 'Erreur inconnue';
          this.resetOnError();
        },
      });
    }
    if (this.mode === 'edit') {
      const payload = this.updateTransaction();

      const id = payload.id as number;

      this.transactionsService.updateTransaction(id, payload).subscribe({
        next: () => {
          this.resetOnSuccess();
        },
        error: (err) => {
          this.setLoading(true);
          this.apiError =
            typeof err.error === 'string' ? err.error : 'Erreur inconnue';
          this.resetOnError();
        },
      });
    }
  }
}
