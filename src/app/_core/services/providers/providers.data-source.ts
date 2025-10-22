import { Observable } from 'rxjs';
import {
  ProviderCreateDTO,
  ProviderDTO,
} from '../../models/transactions/provider.dto';

export interface ProvidersDataSource {
  getUserProviders(userId: number): Observable<ProviderDTO[]>;
  getProviderById(id: number): Observable<ProviderDTO>;
  createProvider(dto: ProviderCreateDTO): Observable<ProviderDTO>;
  deleteProvider(id: number): Observable<void>;
}
