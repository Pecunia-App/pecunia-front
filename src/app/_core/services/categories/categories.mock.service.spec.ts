import { TestBed } from '@angular/core/testing';

import { CategoriesMockService } from './categories.mock.service';

describe('CategoriesMockService', () => {
  let service: CategoriesMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
