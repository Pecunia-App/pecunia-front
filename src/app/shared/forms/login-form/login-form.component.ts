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
import { AuthService } from '../../../_core/services/auth/auth.service';
import { Router } from '@angular/router';

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
  private authService = inject(AuthService);
  private router = inject(Router);
  private apiError: string | null = null;

  public isSubmitted = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(12)]],
  });

  constructor() {
    // Réinitialise l’erreur API dès qu’un champ change
    this.loginForm.controls['email'].valueChanges.subscribe(() =>
      this.resetApiError()
    );
    this.loginForm.controls['password'].valueChanges.subscribe(() =>
      this.resetApiError()
    );
  }

  isFieldInError(field: keyof LoginForm): boolean {
    return (
      this.formUtils.isFieldInError<LoginForm>(
        this.loginForm,
        field,
        this.isSubmitted
      ) || !!this.apiError
    );
  }

  handleFieldErrors(fieldName: keyof LoginForm): string {
    const field = this.loginForm.controls[fieldName];
    if (this.apiError) return this.apiError!;
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

  resetApiError() {
    this.apiError = null;
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log('password', this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => this.router.navigate(['/main']),
        error: (err) => {
          this.isSubmitted = false;
          this.apiError =
            typeof err.error === 'string' ? err.error : 'Erreur inconnue';
          // Marque les champs comme touchés pour forcer l'affichage de l'erreur
          this.loginForm.controls['email'].markAsTouched();
          this.loginForm.controls['password'].markAsTouched();
        },
      });
    }
  }
}
