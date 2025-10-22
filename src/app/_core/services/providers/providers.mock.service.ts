import { Injectable } from '@angular/core';
import { ProvidersDataSource } from './providers.data-source';
import {
  ProviderCreateDTO,
  ProviderDTO,
  ProviderUpdateDTO,
} from '../../models/transactions/provider.dto';
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

  createProvider(dto: ProviderCreateDTO): Observable<ProviderDTO> {
    const newId = MOCK_PROVIDERS.length
      ? Math.max(...MOCK_PROVIDERS.map((p) => p.id)) + 1
      : 1;
    const newProvider: ProviderDTO = {
      id: newId,
      providerName: dto.providerName,
    };
    MOCK_PROVIDERS.push(newProvider);
    return of(newProvider);
  }
  updateProvider(
    id: number,
    dto: ProviderUpdateDTO
  ): Observable<ProviderUpdateDTO> {
    const providerIndex = MOCK_PROVIDERS.findIndex((p) => p.id === id);
    if (providerIndex === -1) {
      throw new Error('provider not found');
    }
    MOCK_PROVIDERS[providerIndex] = {
      ...MOCK_PROVIDERS[providerIndex],
      providerName: dto.providerName,
    };
    return of(dto);
  }

  deleteProvider(id: number): Observable<void> {
    const remaining = MOCK_PROVIDERS.filter((provider) => provider.id != id);
    MOCK_PROVIDERS.length = 0;
    MOCK_PROVIDERS.push(...remaining);
    return of(void 0);
  }
}
