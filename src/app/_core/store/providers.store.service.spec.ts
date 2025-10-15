import { TestBed } from '@angular/core/testing';

import { ProvidersStoreService } from './providers.store.service';
import { provideHttpClient } from '@angular/common/http';

describe('ProvidersService', () => {
  let service: ProvidersStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(ProvidersStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
