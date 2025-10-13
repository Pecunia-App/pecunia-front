import { Injectable } from '@angular/core';
import { CategoriesDataSource } from './categories.data-source';
import { Observable, of } from 'rxjs';
import { CategoryDTO } from '../../models/transactions/category.dto';
import {
  MOCK_CATEGORIES,
  MOCK_CATEGORIES_GLOBAL,
} from '../../mocks/mock-categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesMockService implements CategoriesDataSource {
  getGlobalCategories(): Observable<CategoryDTO[]> {
    return of(MOCK_CATEGORIES_GLOBAL);
  }

  getUserCategories(userId: number): Observable<CategoryDTO[]> {
    return of(MOCK_CATEGORIES.filter((c) => c.userId === userId));
  }

  getCategoryById(id: number): Observable<CategoryDTO> {
    return of(
      [...MOCK_CATEGORIES_GLOBAL, ...MOCK_CATEGORIES].find((c) => c.id === id)!
    );
  }
}
