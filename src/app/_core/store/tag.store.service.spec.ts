import { TestBed } from '@angular/core/testing';

import { TagStoreService } from './tag.store.service';
import { provideHttpClient } from '@angular/common/http';

describe('TagStoreService', () => {
  let service: TagStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(TagStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
