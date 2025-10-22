import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  OnChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';

// --- Event output ---
export interface UpdateEntityEvent {
  name: string;
}
@Component({
  selector: 'app-edit-entity-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NzModalModule, CommonModule, NzInputModule],
  templateUrl: './edit-entity-modal.component.html',
})
export class EditEntityModalComponent implements OnChanges {
  private fb = inject(FormBuilder);

  @Input() isOpen = false;
  @Input() title = 'Modifier';
  @Input() fieldLabel = 'Nom';
  @Input() placeholder = '';
  @Input() errorMessage = 'Ce champ est obligatoire.';
  @Input() entityType: 'tag' | 'provider' = 'tag';
  @Input() currentName = '';
  @Output() save = new EventEmitter<UpdateEntityEvent>();
  @Output() closeModal = new EventEmitter<void>();

  form!: FormGroup;
  isSubmitting = false;

  ngOnChanges() {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  onSave() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    this.save.emit({ name: this.form.value.name });

    this.form.reset();
    this.isSubmitting = false;
    this.onClose();
  }

  onClose() {
    this.form.reset();
    this.closeModal.emit();
  }
}
