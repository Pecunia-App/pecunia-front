import { inject, Injectable } from '@angular/core';
import { TagsDataSource } from './tags.data-source';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { TagDTO, TagRequestDto } from '../../models/transactions/tag.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsApiService implements TagsDataSource {
  private static readonly API_URL = `${environment.apiUrl}`;
  private baseUrl = `${TagsApiService.API_URL}`;
  private http = inject(HttpClient);

  getUserTags(userId: number): Observable<TagDTO[]> {
    return this.http.get<TagDTO[]>(`${this.baseUrl}/tags/users/${userId}`);
  }
  getTagById(id: number): Observable<TagDTO> {
    return this.http.get<TagDTO>(`${this.baseUrl}/tags/${id}`);
  }
  createTag(dto: TagRequestDto): Observable<TagDTO> {
    return this.http.post<TagDTO>(`${this.baseUrl}/tags`, dto);
  }
  updateTag(id: number, dto: TagRequestDto): Observable<TagRequestDto> {
    return this.http.put<TagRequestDto>(`${this.baseUrl}/tags/${id}`, dto);
  }
  deleteTag(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tags/${id}`);
  }
}
