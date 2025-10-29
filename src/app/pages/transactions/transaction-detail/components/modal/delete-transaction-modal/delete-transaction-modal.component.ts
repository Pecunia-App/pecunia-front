import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ButtonComponent } from '../../../../../../shared/ui/button/button.component';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-delete-transaction-modal',
  imports: [CommonModule, ButtonComponent, NzModalModule],
  templateUrl: './delete-transaction-modal.component.html',
  styleUrl: './delete-transaction-modal.component.scss',
})
export class DeleteTransactionModalComponent {
  private readonly modal = inject(NzModalRef<DeleteTransactionModalComponent>);

  @Input() transactionName?: string;

  handleCancel(): void {
    this.modal.destroy(null);
  }

  handleConfirm(): void {
    this.modal.destroy(true);
  }
}
