import { Observable } from 'rxjs';
import { ProviderDTO } from '../../models/transactions/provider.dto';

export interface ProvidersDataSource {
  getUserProviders(userId: number): Observable<ProviderDTO[]>;
  getProviderById(id: number): Observable<ProviderDTO>;
}
