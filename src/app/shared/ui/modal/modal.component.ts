import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-ui-modal',
  imports: [ButtonComponent, CommonModule, NzModalModule, NzButtonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  @Input() content = 'Cette action est irréversible.';
  @Input() confirmText = 'Supprimer';
  @Input() confirmType: 'primary' | 'default' | 'dashed' | 'link' | 'text' =
    'primary';
  @Input() cancelText = 'Annuler';
  @Input() buttonLabel = 'Button label';
  @Output() confirmAction = new EventEmitter<void>();
  @Output() cancelAction = new EventEmitter<void>();

  isVisible = false;
  isConfirmLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.confirmAction.emit();
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.cancelAction.emit();
    this.isVisible = false;
  }
}
