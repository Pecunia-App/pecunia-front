import { Injectable } from '@angular/core';
import { TagsDataSource } from './tags.data-source';
import { MOCK_TAGS } from '../../mocks/mock-tags';
import { Observable, of } from 'rxjs';
import { TagDTO } from '../../models/transactions/tag.dto';

@Injectable({
  providedIn: 'root',
})
export class TagsMockService implements TagsDataSource {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUserTags(userId: number): Observable<TagDTO[]> {
    return of(MOCK_TAGS);
  }
  getTagById(id: number): Observable<TagDTO> {
    const tag = MOCK_TAGS.find((tag) => tag.id === id);
    return of(tag!);
  }
}
