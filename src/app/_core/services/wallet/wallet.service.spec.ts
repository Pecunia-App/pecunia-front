import { TestBed } from '@angular/core/testing';
import { WalletService } from './wallet.service';
import { provideHttpClient } from '@angular/common/http';

describe('WalletService', () => {
  let service: WalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(WalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
