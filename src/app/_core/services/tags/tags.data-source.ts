import { Observable } from 'rxjs';
import { TagDTO } from '../../models/transactions/tag.dto';

export interface TagsDataSource {
  getUserTags(userId: number): Observable<TagDTO[]>;
  getTagById(id: number): Observable<TagDTO>;
}
