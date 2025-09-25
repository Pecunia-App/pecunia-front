import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { authAndWalletGuard } from './anth-and-wallet.guard';

describe('authAndWalletGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authAndWalletGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
