import { inject, Injectable } from '@angular/core';
import { CategoriesDataSource } from './categories.data-source';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  CategoryDTO,
  CategoryUpsertDTO,
} from '../../models/transactions/category.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService implements CategoriesDataSource {
  private static readonly API_URL = `${environment.apiUrl}`;
  private baseUrl = `${CategoriesApiService.API_URL}`;
  private readonly http = inject(HttpClient);

  getGlobalCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(`${this.baseUrl}/categories/global`);
  }

  getUserCategories(userId: number): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(
      `${this.baseUrl}/categories/users/${userId}`
    );
  }

  getCategoryById(id: number): Observable<CategoryDTO> {
    return this.http.get<CategoryDTO>(`${this.baseUrl}/categories/${id}`);
  }

  createCategory(dto: CategoryUpsertDTO): Observable<CategoryDTO> {
    return this.http.post<CategoryDTO>(`${this.baseUrl}/categories`, dto);
  }
  updateCategory(
    id: number,
    dto: CategoryUpsertDTO
  ): Observable<CategoryUpsertDTO> {
    return this.http.put<CategoryUpsertDTO>(
      `${this.baseUrl}/categories/${id}`,
      dto
    );
  }
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categories/${id}`);
  }
}
