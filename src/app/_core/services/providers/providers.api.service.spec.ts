import { TestBed } from '@angular/core/testing';

import { ProvidersApiService } from './providers.api.service';
import { provideHttpClient } from '@angular/common/http';

describe('ProvidersApiService', () => {
  let service: ProvidersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(ProvidersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
