import { Component, forwardRef, inject, Input } from '@angular/core';
import { InputComponent } from '../../../../../ui/input/input.component';
import { IconComponent } from '../../../../../ui/icon/icon.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProvidersStoreService } from '../../../../../../_core/store/providers.store.service';
import { ProviderDTO } from '../../../../../../_core/models/transactions/provider.dto';
import { ProviderSelectModalComponent } from '../../modals/provider-select-modal/provider-select-modal.component';

@Component({
  selector: 'app-provider-select',
  imports: [InputComponent, IconComponent, NzModalModule],
  templateUrl: './provider-select.component.html',
  styleUrl: './provider-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProviderSelectComponent),
      multi: true,
    },
  ],
})
export class ProviderSelectComponent implements ControlValueAccessor {
  private readonly modal = inject(NzModalService);
  private readonly providerStore = inject(ProvidersStoreService);
  @Input() status: 'error' | 'success' | null = null;
  @Input() helper?: string;
  // ControlValueAccessor implementation
  private onChange: (value: string | number) => void = () => {
    /* intentionally empty */
  };
  private onTouched: () => void = () => {
    /* intentionally empty */
  };

  selectedProvider: ProviderDTO | null = null;

  writeValue(id: number | null): void {
    if (id === null || !id || Number.isNaN(Number(id))) {
      this.selectedProvider = null;
      return;
    }

    this.selectedProvider = this.providerStore.getProviderById(id) ?? null;
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  openModal(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Sélectionner un fournisseur',
      nzContent: ProviderSelectModalComponent,
      nzFooter: null,
      nzCentered: true,
      nzClassName: 'provider-modal',
      nzNoAnimation: true,
    });
    modalRef.afterClose.subscribe((provider: ProviderDTO | null) => {
      if (provider) {
        this.selectedProvider = provider;
        // propagate value to the form control (use the provider id)
        this.onChange(provider.id);
        this.onTouched();
      }
    });
  }
}
