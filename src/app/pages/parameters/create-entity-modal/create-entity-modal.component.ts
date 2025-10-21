import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';

export interface CreateEntityEvent {
  name: string;
}

@Component({
  selector: 'app-create-entity-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NzModalModule, CommonModule],
  templateUrl: './create-entity-modal.component.html',
})
export class CreateEntityModalComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  @Input() isOpen = false;
  @Input() title = 'Créer';
  @Input() fieldLabel = 'Nom';
  @Input() placeholder = 'Entrez un nom...';
  @Input() fieldName = 'entityName';
  @Input() minLength = 1;
  @Input() maxLength = 20;
  @Input() errorMessage = 'Ce champ est obligatoire.';

  @Output() closeModal = new EventEmitter<void>();
  @Output() create = new EventEmitter<CreateEntityEvent>();

  form!: FormGroup;
  isSubmitting = false;

  ngOnInit() {
    this.form = this.fb.group({
      [this.fieldName]: [
        '',
        [
          Validators.required,
          Validators.minLength(this.minLength),
          Validators.maxLength(this.maxLength),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    const value = { name: this.form.value[this.fieldName] };

    // On émet l’événement vers le parent
    this.create.emit(value);

    // Reset form après création
    this.form.reset();
    this.isSubmitting = false;
    this.onClose();
  }

  onClose() {
    this.form.reset();
    this.closeModal.emit();
  }

  get fieldControl() {
    return this.form.get(this.fieldName);
  }
}
