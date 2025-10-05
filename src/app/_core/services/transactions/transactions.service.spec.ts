import { TestBed } from '@angular/core/testing';

import { TransactionsService } from './transactions.service';
import { provideHttpClient } from '@angular/common/http';

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(TransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
