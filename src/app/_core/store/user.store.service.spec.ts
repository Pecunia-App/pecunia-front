import { TestBed } from '@angular/core/testing';

import { UserStoreService } from './user.store.service';
import { provideHttpClient } from '@angular/common/http';

describe('UserStoreService', () => {
  let service: UserStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(UserStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
