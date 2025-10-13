import { TestBed } from '@angular/core/testing';

import { CategoriesStoreService } from './categories.store.service';
import { provideHttpClient } from '@angular/common/http';

describe('CategoriesStoreService', () => {
  let service: CategoriesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(CategoriesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
