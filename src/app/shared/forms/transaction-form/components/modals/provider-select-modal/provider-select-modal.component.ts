import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ProvidersStoreService } from '../../../../../../_core/store/providers.store.service';
import { ProviderDTO } from '../../../../../../_core/models/transactions/provider.dto';

@Component({
  selector: 'app-provider-select-modal',
  imports: [CommonModule, NzTabsModule],
  templateUrl: './provider-select-modal.component.html',
  styleUrl: './provider-select-modal.component.scss',
})
export class ProviderSelectModalComponent {
  private readonly modalRef = inject(NzModalRef);
  private readonly providersStore = inject(ProvidersStoreService);

  readonly providers = this.providersStore.userProviders();

  selectProvider(provider: ProviderDTO) {
    this.modalRef.close(provider);
  }
}
