import { TestBed } from '@angular/core/testing';

import { CategoriesApiService } from './categories.api.service';
import { provideHttpClient } from '@angular/common/http';

describe('CategoriesApiService', () => {
  let service: CategoriesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(CategoriesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
