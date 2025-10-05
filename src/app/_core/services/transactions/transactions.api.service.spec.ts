import { TestBed } from '@angular/core/testing';

import { TransactionsApiService } from './transactions.api.service';
import { provideHttpClient } from '@angular/common/http';

describe('TransactionsApiService', () => {
  let service: TransactionsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionsApiService, provideHttpClient()],
    });
    service = TestBed.inject(TransactionsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
