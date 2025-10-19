import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TransactionsDataSource,
  TransactionResponse,
} from './transactions.data-source';
import {
  TransactionCreateDTO,
  TransactionDTO,
} from '../../models/transactions/transaction.dto';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TransactionsApiService implements TransactionsDataSource {
  private static readonly API_URL = `${environment.apiUrl}`;
  private baseUrl = `${TransactionsApiService.API_URL}`;
  private readonly http = inject(HttpClient);

  /**
   * Récupère toutes les transactions d'un wallet.
   * GET /wallets/{walletId}/transactions
   */
  getTransactions(
    walletId: number,
    page = 0,
    size = 20
  ): Observable<TransactionResponse> {
    const params = {
      page: page.toString(),
      size: size.toString(),
      sort: 'createdAt,desc',
    };
    return this.http.get<TransactionResponse>(
      `${this.baseUrl}/wallets/${walletId}/transactions`,
      { params }
    );
  }

  /**
   * Récupère une transaction par son ID global.
   * GET /transactions/{id}
   */
  getTransactionById(id: number): Observable<TransactionDTO> {
    return this.http.get<TransactionDTO>(`${this.baseUrl}/transactions/${id}`);
  }

  /**
   * Récupère une transaction par son ID global.
   * POST /transactions
   */
  createTransaction(
    transaction: TransactionCreateDTO
  ): Observable<TransactionDTO> {
    return this.http.post<TransactionDTO>(this.baseUrl, transaction);
  }
}
