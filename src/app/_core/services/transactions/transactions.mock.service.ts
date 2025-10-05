import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  TransactionsDataSource,
  TransactionResponse,
} from './transactions.data-source';
import { MOCK_TRANSACTIONS_RESPONSE } from '../../mocks/mock-transactions';

@Injectable({ providedIn: 'root' })
export class TransactionsMockService implements TransactionsDataSource {
  getTransactions(): Observable<TransactionResponse> {
    return of(MOCK_TRANSACTIONS_RESPONSE);
  }

  getTransactionById(id: number) {
    const found = MOCK_TRANSACTIONS_RESPONSE.content.find((t) => t.id === id)!;
    return of(found);
  }
}
