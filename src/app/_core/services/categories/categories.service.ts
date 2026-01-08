import { Injectable, inject } from '@angular/core';
import { CategoriesDataSource } from './categories.data-source';
import { CategoriesMockService } from './categories.mock.service';
import { CategoriesApiService } from './categories.api.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {
  CategoryUpsertDTO,
  CategoryDTO,
} from '../../models/transactions/category.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements CategoriesDataSource {
  private readonly source: CategoriesDataSource;

  constructor() {
    const mock = inject(CategoriesMockService);
    const api = inject(CategoriesApiService);

    // Basculer ici selon .env
    this.source = environment.useMocks ? mock : api;
  }
  getGlobalCategories() {
    return this.source.getGlobalCategories();
  }
  getUserCategories(userId: number) {
    return this.source.getUserCategories(userId);
  }
  getCategoryById(id: number) {
    return this.source.getCategoryById(id);
  }
  createCategory(dto: CategoryUpsertDTO): Observable<CategoryDTO> {
    return this.source.createCategory(dto);
  }
  updateCategory(
    id: number,
    dto: CategoryUpsertDTO
  ): Observable<CategoryUpsertDTO> {
    return this.source.updateCategory(id, dto);
  }
  deleteCategory(id: number): Observable<void> {
    return this.source.deleteCategory(id);
  }
}
