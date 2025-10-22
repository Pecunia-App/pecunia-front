import { Observable } from 'rxjs';
import { TagDTO, TagRequestDto } from '../../models/transactions/tag.dto';

export interface TagsDataSource {
  getUserTags(userId: number): Observable<TagDTO[]>;
  getTagById(id: number): Observable<TagDTO>;
  createTag(dto: TagRequestDto): Observable<TagDTO>;
  deleteTag(id: number): Observable<void>;
}
