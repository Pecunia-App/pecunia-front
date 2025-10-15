import { Injectable } from '@angular/core';
import { ProvidersDataSource } from './providers.data-source';
import { ProvidersMockService } from './providers.mock.service';
import { ProvidersApiService } from './providers.api.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ProviderDTO } from '../../models/transactions/provider.dto';

@Injectable({
  providedIn: 'root',
})
export class ProvidersService implements ProvidersDataSource {
  private readonly source: ProvidersDataSource;

  constructor(mock: ProvidersMockService, api: ProvidersApiService) {
    this.source = environment.useMocks ? mock : api;
  }

  getUserProviders(userId: number): Observable<ProviderDTO[]> {
    return this.source.getUserProviders(userId);
  }
  getProviderById(id: number): Observable<ProviderDTO> {
    return this.source.getProviderById(id);
  }
}
