import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtilsService } from '../../../_core/services/form-utils.service';
import { RegisterForm } from '../../../_core/models/forms.model';
import { InputComponent } from '../../ui/input/input.component';
import { IconComponent } from '../../ui/icon/icon.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { AuthService } from '../../../_core/services/auth/auth.service';
import { User } from '../../../_core/models/users/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    IconComponent,
    ButtonComponent,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  private formBuilder = inject(FormBuilder);
  private formUtils = inject(FormUtilsService);
  private authService = inject(AuthService);
  private router = inject(Router);
  public isSubmitted = false;
  registerForm: FormGroup = this.formBuilder.group(
    {
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          FormUtilsService.nameValidator(),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          FormUtilsService.nameValidator(),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          FormUtilsService.passwordValidator(),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: FormUtilsService.passwordsMatch }
  );
  successMessage: string | null = null;
  errorMessage: string | null = null;

  isFieldInError(field: keyof RegisterForm): boolean {
    return this.formUtils.isFieldInError<RegisterForm>(
      this.registerForm,
      field,
      this.isSubmitted
    );
  }

  getFieldStatus(field: keyof RegisterForm): 'error' | 'success' | null {
    if (this.isFieldInError(field)) return 'error';
    if (this.registerForm.controls[field].valid) return 'success';
    return null;
  }

  getConfirmPasswordStatus(): 'error' | 'success' | null {
    if (
      this.isFieldInError('confirmPassword') ||
      this.registerForm.hasError('mismatch')
    ) {
      return 'error';
    }
    if (this.registerForm.controls['confirmPassword'].valid) {
      return 'success';
    }
    return null;
  }

  handleFieldErrors(field: keyof RegisterForm): string {
    const control = this.registerForm.controls[field];
    if (!this.isFieldInError(field)) return '';

    switch (field) {
      case 'firstname':
      case 'lastname':
        return this.formUtils.getNameError(control);
      case 'email':
        return this.formUtils.getEmailError(control);
      case 'password':
        return this.formUtils.getPasswordError(control);
      case 'confirmPassword':
        // On veut à la fois required et mismatch ici
        if (this.registerForm.hasError('mismatch')) {
          return 'Les mots de passe ne correspondent pas';
        }
        return this.formUtils.getConfirmPasswordError(control);
      default:
        return this.formUtils.getStandardErrorMessage(control);
    }
  }

  getConfirmPasswordHelper(): string {
    const control = this.registerForm.controls['confirmPassword'];
    if (
      (control.touched || control.dirty || this.isSubmitted) &&
      this.registerForm.hasError('mismatch')
    ) {
      return 'Les mots de passe ne correspondent pas';
    }
    if (this.isFieldInError('confirmPassword')) {
      return this.handleFieldErrors('confirmPassword');
    }
    return '';
  }

  onSubmit() {
    this.isSubmitted = true;
    const { firstname, lastname, email, password, confirmPassword } =
      this.registerForm.value;
    const user = { firstname, lastname, email, password, confirmPassword };
    this.authService.register(user as User).subscribe({
      next: () => {
        this.registerForm.reset();
        this.successMessage = '';
        this.errorMessage = '';
      },
      complete: () =>
        this.router.navigate(['/login'], {
          state: { successMessage: 'Compte créé avec succès 🎉' },
        }),
      error: (error) => {
        console.error('Error registering user:', error);
        this.errorMessage =
          "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
      },
    });
  }
}
