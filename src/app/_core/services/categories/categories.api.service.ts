import { inject, Injectable } from '@angular/core';
import { CategoriesDataSource } from './categories.data-source';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoryDTO } from '../../models/transactions/category.dto';
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
}
