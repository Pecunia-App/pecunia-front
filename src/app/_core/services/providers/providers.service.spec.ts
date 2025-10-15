import { TestBed } from '@angular/core/testing';
import { ProvidersService } from './providers.service';
import { provideHttpClient } from '@angular/common/http';

describe('ProvidersService', () => {
  let service: ProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(ProvidersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
