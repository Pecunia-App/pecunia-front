import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtilsService } from '../../../_core/services/form-utils.service';
import { UserService } from '../../../_core/services/user/user.service';
import {
  PasswordUpdateForm,
  ProfileForm,
  TypedFormGroup,
} from '../../../_core/models/forms.model';
import { InputComponent } from '../../ui/input/input.component';
import { IconComponent } from '../../ui/icon/icon.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    IconComponent,
    ButtonComponent,
  ],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
  private formUtils = inject(FormUtilsService);
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  showPassword = false;

  profileForm: TypedFormGroup<ProfileForm> = this.formBuilder.group(
    {
      firstname: ['', [Validators.minLength(2)]],
      lastname: ['', [Validators.minLength(2)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(12)]],
      confirmPassword: ['', [Validators.minLength(12)]],
    },
    {
      validators: this.passwordMatchValidator.bind(this),
    }
  ) as TypedFormGroup<ProfileForm>;

  isEditMode = false;

  ngOnInit() {
    this.loadUserData();
    // Désactiver tous les champs au chargement
    Object.keys(this.profileForm.controls).forEach((key) => {
      const control = this.profileForm.get(key);
      if (control) {
        control.disable();
      }
    });
  }

  private loadUserData(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du user :', err);
      },
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.handleConfirm();
    }
  }

  // Amélioration de handleConfirm
  handleConfirm(): void {
    if (!this.profileForm.valid) return;

    const formValue = this.profileForm.value;
    const updates: Partial<ProfileForm> = {};

    // ajoute uniquement les champs remplis
    if (formValue.firstname) {
      updates.firstname = formValue.firstname;
    }
    if (formValue.lastname) {
      updates.lastname = formValue.lastname;
    }
    if (formValue.email) {
      updates.email = formValue.email;
    }

    // n'appelle le backend que s'il y a au moins un champ à mettre à jour
    if (Object.keys(updates).length > 0) {
      this.userService.updateProfile(updates).subscribe({
        next: () => {
          this.formUtils.showSuccess('Profil mis à jour avec succès');
          this.toggleEditMode();
          this.resetPasswordFields();
        },
        error: (err: HttpErrorResponse) => {
          this.formUtils.showError('Erreur lors de la mise à jour du profil');
          console.error('Erreur :', err);
        },
      });
    }
    // 🔑 Mise à jour du mot de passe (si renseigné et confirmé)
    if (
      formValue.password &&
      formValue.password === formValue.confirmPassword
    ) {
      const passwordUpdate: PasswordUpdateForm = {
        newPassword: formValue.password,
        confirmNewPassword: formValue.confirmPassword,
      };

      this.userService.updatePassword(passwordUpdate).subscribe({
        next: () => {
          this.formUtils.showSuccess('Mot de passe mis à jour avec succès');
          this.resetPasswordFields();
        },
        error: (err: HttpErrorResponse) => {
          this.formUtils.showError(
            'Erreur lors de la mise à jour du mot de passe'
          );
          console.error('Erreur mot de passe :', err);
        },
      });
    }
  }

  // Nouvelle méthode pour réinitialiser les champs de mot de passe
  private resetPasswordFields(): void {
    this.profileForm.patchValue({
      password: '',
      confirmPassword: '',
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.loadUserData();
    }
    // Activer/désactiver tous les champs du formulaire
    Object.keys(this.profileForm.controls).forEach((key) => {
      const control = this.profileForm.get(key);
      if (control && !this.isEditMode) {
        control.disable();
      } else if (control && this.isEditMode) {
        control.enable();
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Amélioration du validateur de mot de passe
  private passwordMatchValidator(
    form: FormGroup
  ): null | { passwordMismatch: boolean } {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (!password && !confirmPassword) return null;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Amélioration de la gestion des erreurs
  getErrorMessage(controlName: string): string {
    const control = this.profileForm.get(controlName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return 'Ce champ est requis';
    if (control.errors['minlength']) return 'Minimum 2 caractères requis';
    if (control.errors['email']) return 'Email invalide';
    if (control.errors['passwordMismatch'])
      return 'Les mots de passe ne correspondent pas';

    return '';
  }
}
