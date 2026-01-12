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
import { UserService } from '../../../_core/services/user/user.service';
import { Router } from '@angular/router';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    IconComponent,
    ButtonComponent,
    NzAlertComponent,
    CommonModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private formUtils = inject(FormUtilsService);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  private apiError: string | null = null;
  private message = inject(NzMessageService);

  public isSubmitted = false;
  public successMessage: string | null = null;
  public isLoading = false;

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

    const nav = this.router.currentNavigation();
    this.successMessage = nav?.extras?.state?.['successMessage'] ?? null;

    if (this.successMessage) {
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    }
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

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.loginForm.disable();

    this.authService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loginForm.enable();
        })
      )
      .subscribe({
        next: () => {
          this.message.success('Connexion réussie 🎉!');
          this.userService.getCurrentUser().subscribe({
            next: (user) => {
              if (!user?.id) {
                this.message.error('Impossible de récupérer le compte.');
                this.router.navigate(['/login']);
                return;
              }
              this.userService.getWalletByUserId(user.id).subscribe({
                next: (wallet) =>
                  this.router.navigate([
                    wallet ? '/transactions' : '/first-login',
                  ]),
                error: () => this.router.navigate(['/first-login']),
              });
            },
            error: () => {
              this.message.error('Impossible de récupérer le compte.');
              this.router.navigate(['/login']);
            },
          });
        },
        error: (err) => {
          this.isSubmitted = false;
          this.apiError =
            typeof err.error === 'string' ? err.error : 'Erreur inconnue';
          this.message.error(`${this.apiError}`);
          this.loginForm.markAllAsTouched();
        },
      });
  }
}
