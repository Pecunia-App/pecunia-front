import { TestBed } from '@angular/core/testing';

import { TransactionsMockService } from './transactions.mock.service';

describe('TransactionsMockService', () => {
  let service: TransactionsMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
