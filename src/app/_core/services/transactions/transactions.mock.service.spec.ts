import { TestBed } from '@angular/core/testing';

import { TransactionsMockService } from './transactions.mock.service';
import { provideHttpClient } from '@angular/common/http';

describe('TransactionsMockService', () => {
  let service: TransactionsMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(TransactionsMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
