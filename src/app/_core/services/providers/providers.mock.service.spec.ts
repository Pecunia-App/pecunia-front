import { TestBed } from '@angular/core/testing';
import { ProvidersMockService } from './providers.mock.service';

describe('MockService', () => {
  let service: ProvidersMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvidersMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
