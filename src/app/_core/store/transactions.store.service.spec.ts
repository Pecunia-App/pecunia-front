import { TestBed } from '@angular/core/testing';
import { TransactionStore } from './transactions.store.service';
import { provideHttpClient } from '@angular/common/http';

describe('TransactionsStoreService', () => {
  let service: TransactionStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionStore, provideHttpClient()],
    });
    service = TestBed.inject(TransactionStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
