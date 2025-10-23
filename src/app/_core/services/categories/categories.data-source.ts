import { Observable } from 'rxjs';
import {
  CategoryUpsertDTO,
  CategoryDTO,
} from '../../models/transactions/category.dto';

export interface CategoriesDataSource {
  getGlobalCategories(): Observable<CategoryDTO[]>;
  getUserCategories(userId: number): Observable<CategoryDTO[]>;
  getCategoryById(id: number): Observable<CategoryDTO>;
  createCategory(dto: CategoryUpsertDTO): Observable<CategoryDTO>;
  updateCategory(
    id: number,
    dto: CategoryUpsertDTO
  ): Observable<CategoryUpsertDTO>;
  deleteCategory(id: number): Observable<void>;
}
