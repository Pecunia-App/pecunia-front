import { inject, Injectable } from '@angular/core';
import { ProvidersDataSource } from './providers.data-source';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProviderDTO } from '../../models/transactions/provider.dto';

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
}
