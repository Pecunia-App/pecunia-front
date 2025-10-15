import { Injectable } from '@angular/core';
import { ProvidersDataSource } from './providers.data-source';
import { ProviderDTO } from '../../models/transactions/provider.dto';
import { Observable, of } from 'rxjs';
import { MOCK_PROVIDERS } from '../../mocks/mock-providers';

@Injectable({
  providedIn: 'root',
})
export class ProvidersMockService implements ProvidersDataSource {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUserProviders(userId: number): Observable<ProviderDTO[]> {
    return of(MOCK_PROVIDERS);
  }
  getProviderById(id: number): Observable<ProviderDTO> {
    const provider = MOCK_PROVIDERS.find((provider) => provider.id === id);
    return of(provider!);
  }
}
