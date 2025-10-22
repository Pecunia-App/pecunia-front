import { Observable } from 'rxjs';
import {
  ProviderCreateDTO,
  ProviderDTO,
  ProviderUpdateDTO,
} from '../../models/transactions/provider.dto';

export interface ProvidersDataSource {
  getUserProviders(userId: number): Observable<ProviderDTO[]>;
  getProviderById(id: number): Observable<ProviderDTO>;
  createProvider(dto: ProviderCreateDTO): Observable<ProviderDTO>;
  updateProvider(
    id: number,
    dto: ProviderUpdateDTO
  ): Observable<ProviderUpdateDTO>;
  deleteProvider(id: number): Observable<void>;
}
