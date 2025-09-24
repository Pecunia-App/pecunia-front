import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TypedFormGroup } from '../models/forms.model';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  isFieldInError<T extends object>(
    /**
     * Détecte si un champ est en erreur dans un FormGroup typé
     */
    form: TypedFormGroup<T>,
    field: keyof T,
    isSubmitted = false
  ): boolean {
    const control = form.get(field.toString());
    if (!control) return false;
    return control.invalid && (control.dirty || control.touched || isSubmitted);
  }

  getMinLengthError(control: AbstractControl, label = 'Ce champ'): string {
    if (control.hasError('minlength')) {
      const min = control.getError('minlength')?.requiredLength;
      return `${label} doit contenir au moins ${min} caractères`;
    }
    return '';
  }
  getMaxLengthError(control: AbstractControl, label = 'Ce champ'): string {
    if (control.hasError('maxlength')) {
      const max = control.getError('maxlength')?.requiredLength;
      return `${label} doit contenir au maximum ${max} caractères`;
    }
    return '';
  }
  /**
   * Message d'erreur générique pour n'importe quel champ
   */
  getStandardErrorMessage(
    control: AbstractControl,
    label = 'Ce champ'
  ): string {
    if (!control || !control.errors) return '';
    if (control.hasError('required')) return 'Ce champ est requis';
    if (control.hasError('email')) return "Format d'email invalide";
    if (control.hasError('minlength'))
      return this.getMinLengthError(control, label);
    if (control.hasError('maxlength'))
      return this.getMaxLengthError(control, label);
    if (control.hasError('mismatch')) return 'Les champs ne correspondent pas';
    return 'Champ invalide';
  }

  getPasswordError(control: AbstractControl): string {
    if (!control || !control.errors) return '';
    if (control.hasError('required')) return 'Le mot de passe est obligatoire';
    if (control.hasError('minlength'))
      return this.getMinLengthError(control, 'Le mot de passe');

    return this.getStandardErrorMessage(control);
  }

  getEmailError(control: AbstractControl): string {
    if (!control || !control.errors) return '';
    if (control.hasError('required')) return "L'email est obligatoire";
    if (control.hasError('email')) return "Le format d'email est invalide";
    return this.getStandardErrorMessage(control);
  }

  getConfirmPasswordError(
    control: AbstractControl,
    label = 'La confirmation'
  ): string {
    if (!control || !control.errors) return '';
    if (control.hasError('required')) return `${label} est obligatoire`;
    return this.getStandardErrorMessage(control, label);
  }

  /**
   * Validator custom pour vérifier que password et confirmPassword sont identiques
   * À utiliser dans les options de FormGroup : { validators: FormUtilsService.passwordsMatch }
   */
  static passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    if (password !== confirm) {
      return { mismatch: true };
    }
    return null;
  }

  getNameError(control: AbstractControl): string {
    if (!control || !control.errors) return '';
    if (control.hasError('required')) return 'Le champ est obligatoire';
    if (control.hasError('minlength')) return this.getMinLengthError(control);
    if (control.hasError('maxlength')) return this.getMaxLengthError(control);
    return this.getStandardErrorMessage(control);
  }

  showSuccess(message: string): void {
    alert('✅ ' + message);
  }

  showError(message: string): void {
    alert('❌ ' + message);
  }
}
