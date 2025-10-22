import { Injectable } from '@angular/core';
import { TagsDataSource } from './tags.data-source';
import { TagsMockService } from './tags.mock.service';
import { TagsApiService } from './tags.api.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { TagDTO, TagRequestDto } from '../../models/transactions/tag.dto';

@Injectable({
  providedIn: 'root',
})
export class TagsService implements TagsDataSource {
  private readonly source: TagsDataSource;

  constructor(mock: TagsMockService, api: TagsApiService) {
    this.source = environment.useMocks ? mock : api;
  }

  getUserTags(userId: number): Observable<TagDTO[]> {
    return this.source.getUserTags(userId);
  }
  getTagById(id: number): Observable<TagDTO> {
    return this.source.getTagById(id);
  }
  createTag(dto: TagRequestDto): Observable<TagDTO> {
    return this.source.createTag(dto);
  }
  deleteTag(id: number): Observable<void> {
    return this.source.deleteTag(id);
  }
}
