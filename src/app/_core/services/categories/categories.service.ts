import { Injectable } from '@angular/core';
import { CategoriesDataSource } from './categories.data-source';
import { CategoriesMockService } from './categories.mock.service';
import { CategoriesApiService } from './categories.api.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements CategoriesDataSource {
  private readonly source: CategoriesDataSource;

  constructor(mock: CategoriesMockService, api: CategoriesApiService) {
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
}
