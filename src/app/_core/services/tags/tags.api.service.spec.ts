import { TestBed } from '@angular/core/testing';

import { TagsApiService } from './tags.api.service';
import { provideHttpClient } from '@angular/common/http';

describe('TagsApiService', () => {
  let service: TagsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(TagsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
