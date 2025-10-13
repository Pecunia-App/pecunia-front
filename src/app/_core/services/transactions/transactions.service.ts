import { Injectable } from '@angular/core';
import { TransactionsDataSource } from './transactions.data-source';
import { TransactionsMockService } from './transactions.mock.service';
import { TransactionsApiService } from './transactions.api.service';
import { Observable } from 'rxjs';
import { TransactionResponse } from './transactions.data-source';
import { TransactionDTO } from '../../models/transactions/transaction.dto';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TransactionsService implements TransactionsDataSource {
  private readonly source: TransactionsDataSource;

  constructor(mock: TransactionsMockService, api: TransactionsApiService) {
    // Basculer ici selon .env
    this.source = environment.useMocks ? mock : api;
  }

  getTransactions(
    walletId: number,
    page?: number,
    size?: number
  ): Observable<TransactionResponse> {
    return this.source.getTransactions(walletId, page, size);
  }

  getTransactionById(id: number): Observable<TransactionDTO> {
    return this.source.getTransactionById(id);
  }
  // create(walletId: number, dto: TransactionDTO)
  // update(id: number, dto: TransactionDTO)
  // delete(id: number)
}
