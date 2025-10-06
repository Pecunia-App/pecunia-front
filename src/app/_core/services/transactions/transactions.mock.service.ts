import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  TransactionsDataSource,
  TransactionResponse,
} from './transactions.data-source';
import { MOCK_TRANSACTIONS_RESPONSE } from '../../mocks/mock-transactions';

@Injectable({ providedIn: 'root' })
export class TransactionsMockService implements TransactionsDataSource {
  getTransactions(
    walletId: number,
    page = 0,
    size = 5
  ): Observable<TransactionResponse> {
    const all = MOCK_TRANSACTIONS_RESPONSE.content;
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
    const found = MOCK_TRANSACTIONS_RESPONSE.content.find((t) => t.id === id)!;
    return of(found);
  }
}
