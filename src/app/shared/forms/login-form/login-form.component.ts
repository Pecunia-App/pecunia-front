import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../ui/input/input.component';
import { IconComponent } from '../../ui/icon/icon.component';
import { LoginForm } from '../../../_core/models/forms.model';
import { ButtonComponent } from '../../ui/button/button.component';

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

  public isSubmitted = false;
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  //méthodes
  isFieldInError(field: keyof LoginForm): boolean {
    const control = this.loginForm.controls[field];
    if (control.invalid && control.dirty) return true;
    if (control.invalid && control.touched) return true;
    if (control.invalid && this.isSubmitted) return true;
    return false;
  }

  getEmailError(field: AbstractControl): string {
    if (field.errors?.['required']) return 'Email is required';
    if (field.errors?.['email']) return 'Invalid email address';
    return '';
  }

  getPasswordError(field: AbstractControl): string {
    if (field.errors?.['required']) return 'Password is required';
    if (field.errors?.['minlength'])
      return 'Password must be at least 6 characters long';
    return '';
  }

  handleFieldErrors(fieldName: keyof LoginForm): string {
    const field = this.loginForm.controls[fieldName];
    if (this.isFieldInError(fieldName)) {
      switch (fieldName) {
        case 'email':
          return this.getEmailError(field);
        case 'password':
          return this.getPasswordError(field);
        // Ajoutez d'autres champs ici si nécessaire
        default:
          return '';
      }
    }
    return '';
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      console.log('form submitted with: ', this.loginForm.value);
    }
  }
}
