import { TestBed } from '@angular/core/testing';

import { TagsService } from './tags.service';
import { provideHttpClient } from '@angular/common/http';

describe('TagsService', () => {
  let service: TagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(TagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
