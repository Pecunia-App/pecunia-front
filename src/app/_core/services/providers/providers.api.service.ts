import { inject, Injectable } from '@angular/core';
import { ProvidersDataSource } from './providers.data-source';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ProviderCreateDTO,
  ProviderDTO,
} from '../../models/transactions/provider.dto';

@Injectable({
  providedIn: 'root',
})
export class ProvidersApiService implements ProvidersDataSource {
  private static readonly API_URL = `${environment.apiUrl}`;
  private baseUrl = `${ProvidersApiService.API_URL}`;
  private http = inject(HttpClient);

  getUserProviders(userId: number): Observable<ProviderDTO[]> {
    return this.http.get<ProviderDTO[]>(
      `${this.baseUrl}/providers/users/${userId}`
    );
  }
  getProviderById(id: number): Observable<ProviderDTO> {
    return this.http.get<ProviderDTO>(`${this.baseUrl}/providers/${id}`);
  }

  createProvider(dto: ProviderCreateDTO): Observable<ProviderDTO> {
    return this.http.post<ProviderDTO>(`${this.baseUrl}/providers`, dto);
  }

  updateProvider(
    id: number,
    dto: { providerName: string }
  ): Observable<ProviderDTO> {
    return this.http.put<ProviderDTO>(`${this.baseUrl}/providers/${id}`, dto);
  }

  deleteProvider(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/providers/${id}`);
  }
}
