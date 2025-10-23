import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  BADGE_COLORS,
  CategoryUpsertDTO,
} from '../../../../../_core/models/transactions/category.dto';
import { AVAILABLE_ICONS } from '../../../../../shared/ui/icon/icon.model';
import { UserStoreService } from '../../../../../_core/store/user.store.service';
import { NzSelectModule } from 'ng-zorro-antd/select';

export class CategoryValidators {
  static categoryName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();

      if (!value) {
        return {
          required: { message: 'Le nom de la catégorie est obligatoire.' },
        };
      }

      if (value.length < 1) {
        return {
          minLength: { message: 'Le nom doit contenir au moins 1 caractère.' },
        };
      }

      if (value.length > 20) {
        return {
          maxLength: { message: 'Le nom ne peut pas dépasser 20 caractères.' },
        };
      }

      return null;
    };
  }

  static iconRequired(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { required: { message: 'Veuillez sélectionner une icône.' } };
      }
      return null;
    };
  }

  static colorRequired(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { required: { message: 'Veuillez sélectionner une couleur.' } };
      }
      return null;
    };
  }
}

@Component({
  selector: 'app-create-category-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzModalModule,
    CommonModule,
    NzInputModule,
    FormsModule,
    NzSelectModule,
  ],
  templateUrl: './create-category-modal.component.html',
  styleUrl: './create-category-modal.component.scss',
})
export class CreateCategoryModalComponent implements OnInit {
  private readonly userStore = inject(UserStoreService);
  private readonly fb = inject(FormBuilder);
  private readonly userId = this.userStore.userId;
  availableIcons = AVAILABLE_ICONS;
  badgeColors = BADGE_COLORS;

  @Input() isOpen = false;
  @Input() title = 'Créer';
  @Input() errorMessage = 'Ces champs est obligatoire.';

  @Output() closeModal = new EventEmitter<void>();
  @Output() create = new EventEmitter<CategoryUpsertDTO>();

  form!: FormGroup;
  isSubmitting = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      categoryName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      icon: [AVAILABLE_ICONS[0], [Validators.required]],
      type: ['DEBIT', [Validators.required]],
      color: ['background-badge-grey', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.userId) return;
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    const value: CategoryUpsertDTO = {
      categoryName: this.form.value.categoryName,
      icon: this.form.value.icon,
      type: this.form.value.type,
      color: this.form.value.color,
      isGlobal: false,
      userId: this.userId,
    };
    this.create.emit(value);
    this.form.reset();
    this.isSubmitting = false;
    this.onCancel();
  }

  onCancel() {
    this.form.reset();
    this.isSubmitting = false;
    this.closeModal.emit();
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && (field.dirty || field.touched)) {
      const firstError = Object.values(field.errors)[0];
      return firstError?.message || 'Ce champ contient une erreur.';
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
