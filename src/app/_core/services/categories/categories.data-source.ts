import { Observable } from 'rxjs';
import { CategoryDTO } from '../../models/transactions/category.dto';

export interface CategoriesDataSource {
  getGlobalCategories(): Observable<CategoryDTO[]>;
  getUserCategories(userId: number): Observable<CategoryDTO[]>;
  getCategoryById(id: number): Observable<CategoryDTO>;
}
