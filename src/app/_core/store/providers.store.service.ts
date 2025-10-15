import { inject, Injectable, signal } from '@angular/core';
import { ProviderDTO } from '../models/transactions/provider.dto';
import { ProvidersService } from '../services/providers/providers.service';

@Injectable({
  providedIn: 'root',
})
export class ProvidersStoreService {
  private readonly providersService = inject(ProvidersService);
  readonly userProviders = signal<ProviderDTO[]>([]);
  readonly selectedProvider = signal<ProviderDTO | null>(null);
  readonly isLoading = signal(false);
  private loaded = false;

  loadAllProviders(userId: number, forceRefresh = false): void {
    if (this.loaded && !forceRefresh) return;
    this.isLoading.set(true);
    this.providersService.getUserProviders(userId).subscribe({
      next: (providers) => {
        this.userProviders.set(providers);
        this.isLoading.set(false);
        this.loaded = true;
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  getProviderById(id: number): void {
    this.isLoading.set(true);
    this.providersService.getProviderById(id).subscribe({
      next: (provider) => {
        this.selectedProvider.set(provider);
        this.isLoading.set(false);
      },
      error: () => {
        this.selectedProvider.set(null);
        this.isLoading.set(false);
      },
    });
  }

  getByIdFromStore(id: number): ProviderDTO | undefined {
    return this.userProviders().find((provider) => provider.id === id);
  }

  reset(): void {
    this.userProviders.set([]);
    this.selectedProvider.set(null);
    this.loaded = false;
  }
}
