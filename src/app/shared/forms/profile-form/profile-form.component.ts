import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../ui/input/input.component';
import { IconComponent } from '../../ui/icon/icon.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { FormUtilsService } from '../../../_core/services/form-utils.service';
import { ProfileForm } from '../../../_core/models/forms.model';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    IconComponent,
    ButtonComponent,
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss',
})
export class ProfileFormComponent {
  private formBuilder = inject(FormBuilder);
  private formUtils = inject(FormUtilsService);
  public isSubmitted = false;

  profileForm: FormGroup = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(12)]],
    profilePicture: [null],
  });

  isFieldInError(field: keyof ProfileForm): boolean {
    return this.formUtils.isFieldInError<ProfileForm>(
      this.profileForm,
      field,
      this.isSubmitted
    );
  }
  getFieldStatus(field: keyof ProfileForm): 'error' | 'success' | null {
    if (this.isFieldInError(field)) return 'error';
    if (this.profileForm.controls[field].valid) return 'success';
    return null;
  }
  handleFieldErrors(field: keyof ProfileForm): string {
    const control = this.profileForm.controls[field];
    if (!this.isFieldInError(field)) return '';

    switch (field) {
      case 'firstname':
        return this.formUtils.getNameError(control);
      case 'lastname':
        return this.formUtils.getNameError(control);
      case 'email':
        return this.formUtils.getEmailError(control);
      case 'password':
        return this.formUtils.getPasswordError(control);
      default:
        return this.formUtils.getStandardErrorMessage(control);
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.profileForm.valid) {
      console.log('Formulaire soumis:', this.profileForm.value);
    }
  }
}
