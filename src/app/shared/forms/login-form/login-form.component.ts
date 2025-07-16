import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../ui/input/input.component';
import { IconComponent } from '../../ui/icon/icon.component';
import { LoginForm } from '../../../_core/models/forms.model';
import { ButtonComponent } from '../../ui/button/button.component';
import { FormUtilsService } from '../../../_core/services/form-utils.service';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    IconComponent,
    ButtonComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private formUtils = inject(FormUtilsService);
  public isSubmitted = false;
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(12)]],
  });

  isFieldInError(field: keyof LoginForm): boolean {
    return this.formUtils.isFieldInError<LoginForm>(
      this.loginForm,
      field,
      this.isSubmitted
    );
  }

  handleFieldErrors(fieldName: keyof LoginForm): string {
    const field = this.loginForm.controls[fieldName];
    if (!this.isFieldInError(fieldName)) return '';

    switch (fieldName) {
      case 'email':
        return this.formUtils.getEmailError(field);
      case 'password':
        return this.formUtils.getPasswordError(field);
      // Ajoutez d'autres champs ici si nécessaire
      default:
        return this.formUtils.getStandardErrorMessage(field);
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      console.log('form submitted with: ', this.loginForm.value);
    }
  }
}
