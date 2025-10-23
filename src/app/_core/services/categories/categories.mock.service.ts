import { Injectable } from '@angular/core';
import { CategoriesDataSource } from './categories.data-source';
import { Observable, of } from 'rxjs';
import {
  CategoryDTO,
  CategoryUpsertDTO,
} from '../../models/transactions/category.dto';
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
  createCategory(dto: CategoryUpsertDTO): Observable<CategoryDTO> {
    const newId = MOCK_CATEGORIES.length
      ? Math.max(...MOCK_CATEGORIES.map((p) => p.id)) + 1
      : 1;
    const newCategory: CategoryDTO = {
      id: newId,
      categoryName: dto.categoryName,
      type: dto.type,
      color: dto.color,
      icon: dto.icon,
      global: dto.isGlobal,
      userId: dto.userId,
    };
    MOCK_CATEGORIES.push(newCategory);
    return of(newCategory);
  }
  updateCategory(
    id: number,
    dto: CategoryUpsertDTO
  ): Observable<CategoryUpsertDTO> {
    const categoryIndex = MOCK_CATEGORIES.findIndex((p) => p.id === id);
    if (categoryIndex === -1) {
      throw new Error('category not found');
    }
    MOCK_CATEGORIES[categoryIndex] = {
      ...MOCK_CATEGORIES[categoryIndex],
      categoryName: dto.categoryName,
      type: dto.type,
      icon: dto.icon,
      color: dto.color,
      global: dto.isGlobal,
      userId: dto.userId,
    };
    return of(dto);
  }
  deleteCategory(id: number): Observable<void> {
    const remaining = MOCK_CATEGORIES.filter((category) => category.id != id);
    MOCK_CATEGORIES.length = 0;
    MOCK_CATEGORIES.push(...remaining);
    return of(void 0);
  }
}
