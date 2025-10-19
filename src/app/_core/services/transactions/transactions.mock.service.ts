import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  TransactionsDataSource,
  TransactionResponse,
} from './transactions.data-source';
import {
  getMockTransactionsResponse,
  MOCK_TRANSACTIONS_CREATED,
} from '../../mocks/mock-transactions';
import {
  TransactionCreateDTO,
  TransactionDTO,
} from '../../models/transactions/transaction.dto';
import { MOCK_PROVIDERS } from '../../mocks/mock-providers';
import { MOCK_TAGS } from '../../mocks/mock-tags';
import { ProviderDTO } from '../../models/transactions/provider.dto';
import { CategoriesStoreService } from '../../store/categories.store.service';

@Injectable({ providedIn: 'root' })
export class TransactionsMockService implements TransactionsDataSource {
  private readonly categoriesStore = inject(CategoriesStoreService);
  private readonly categorie = this.categoriesStore.getCategoryById(1);
  getTransactions(
    walletId: number,
    page = 0,
    size = 5
  ): Observable<TransactionResponse> {
    const all = getMockTransactionsResponse().content;
    const start = page * size;
    const end = start + size;
    const paginated = all.slice(start, end);

    return of({
      content: paginated,
      page: {
        size,
        number: page,
        totalElements: all.length,
        totalPages: Math.ceil(all.length / size),
      },
    });
  }
  getTransactionById(id: number) {
    const found = getMockTransactionsResponse().content.find(
      (t) => t.id === id
    )!;
    return of(found);
  }

  createTransaction(
    transaction: TransactionCreateDTO
  ): Observable<TransactionDTO> {
    const shouldFail = Math.random() < 0.3; // 30% de chance d’erreur

    if (shouldFail) {
      return throwError(() => ({
        error: 'Erreur réseau simulée',
        message: 'Erreur réseau simulée',
      }));
    }

    const merged = getMockTransactionsResponse().content;
    const nextId = Math.max(...merged.map((t) => t.id)) + 1;

    // Retrouver les objets complets par ID
    const category = this.categoriesStore.getCategoryById(
      transaction.categoryId
    );

    const providerObj = MOCK_PROVIDERS.find(
      (p) => p.id === transaction.providerId
    );
    const provider = {
      id: transaction.providerId,
      providerName: providerObj ? providerObj.providerName : '',
    };
    const tags =
      transaction.tagsIds?.map((id) => MOCK_TAGS.find((t) => t.id === id)!) ??
      [];

    // Déterminer le type à partir de la catégorie (logique du back)
    const type = category?.type ?? 'DEBIT';

    const created: TransactionDTO = {
      id: nextId,
      type,
      amount: {
        amount: transaction.amount.amount,
        currency: 'EUR',
        currencySymbol: '€',
        currencyCode: 'EUR',
      },
      note: transaction.note ?? '',
      tags,
      provider: provider as ProviderDTO,
      category: category!,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    MOCK_TRANSACTIONS_CREATED.unshift(created);

    return of(created).pipe();
  }
}
