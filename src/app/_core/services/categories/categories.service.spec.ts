import { TestBed } from '@angular/core/testing';

import { CategoriesService } from './categories.service';
import { provideHttpClient } from '@angular/common/http';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(CategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
