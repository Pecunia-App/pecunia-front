import { Observable } from 'rxjs';
import {
  TransactionCreateDTO,
  TransactionDTO,
} from '../../models/transactions/transaction.dto';

export interface PageDTO {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface TransactionResponse {
  content: TransactionDTO[];
  page: PageDTO;
}

export interface TransactionsDataSource {
  getTransactions(
    walletId: number,
    page?: number,
    size?: number
  ): Observable<TransactionResponse>;
  getTransactionById(id: number): Observable<TransactionDTO>;

  createTransaction(
    transaction: TransactionCreateDTO
  ): Observable<TransactionDTO>;
  // + create/update/delete plus tard
}
