import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  BADGE_COLORS,
  CategoryDTO,
  CategoryUpsertDTO,
  CategoryType,
} from '../../../../../_core/models/transactions/category.dto';
import { UserStoreService } from '../../../../../_core/store/user.store.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { AVAILABLE_ICONS } from '../../../../../shared/ui/icon/icon.model';

@Component({
  selector: 'app-edit-category-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzModalModule,
    CommonModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzRadioModule,
  ],
  templateUrl: './edit-category-modal.component.html',
  styleUrl: './edit-category-modal.component.scss',
})
export class EditCategoryModalComponent implements OnInit, OnChanges {
  private readonly userStore = inject(UserStoreService);
  private fb = inject(FormBuilder);

  @Input() isOpen = false;
  @Input() title = 'Modifier';
  @Input() currentCategory!: CategoryDTO;
  @Output() save = new EventEmitter<CategoryUpsertDTO>();
  @Output() closeModal = new EventEmitter<void>();

  form!: FormGroup;
  isSubmitting = false;

  readonly badgeColors = BADGE_COLORS;
  readonly availableIcons = AVAILABLE_ICONS;
  readonly categoryTypes: CategoryType[] = ['DEBIT', 'CREDIT'];

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.form && changes['currentCategory'] && this.currentCategory) {
      this.patchForm(this.currentCategory);
    }
  }

  onSave() {
    if (this.form.invalid) return;
    this.isSubmitting = true;
    const upsertDto: CategoryUpsertDTO = {
      categoryName: this.form.value.categoryName,
      icon: this.form.value.icon,
      color: this.form.value.color,
      isGlobal: this.form.value.isGlobal,
      type: this.form.value.type,
      userId: this.userStore.userId!,
    };
    this.save.emit(upsertDto);
    this.isSubmitting = false;
    this.onClose();
  }

  onClose() {
    this.form.reset();
    this.closeModal.emit();
  }

  private initForm() {
    const initialData = this.currentCategory || {
      categoryName: '',
      icon: 'question-circle',
      color: this.badgeColors[0].value,
      type: 'DEBIT',
      global: false,
    };
    this.form = this.fb.group({
      categoryName: [
        initialData.categoryName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      icon: [initialData.icon, [Validators.required]],
      color: [initialData.color, [Validators.required]],
      type: [initialData.type, [Validators.required]],
      isGlobal: [initialData.global],
    });
  }

  private patchForm(category: CategoryDTO) {
    this.form.patchValue({
      categoryName: category.categoryName,
      icon: category.icon,
      color: category.color,
      type: category.type,
      isGlobal: category.global,
    });
  }
}
