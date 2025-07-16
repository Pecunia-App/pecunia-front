import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  isFieldInError<T extends object>(
    /**
     * Détecte si un champ est en erreur dans un FormGroup typé
     */
    form: FormGroup<{ [K in keyof T]: FormControl<T[K]> }>,
    field: keyof T,
    isSubmitted = false
  ): boolean {
    const control = form.get(field as string);
    if (!control) return false;
    return control.invalid && (control.dirty || control.touched || isSubmitted);
  }
  /**
   * Message d'erreur générique pour n'importe quel champ
   */
  getStandardErrorMessage(control: AbstractControl): string {
    if (!control || !control.errors) return '';
    if (control.hasError('required')) return 'Ce champ est requis';
    if (control.hasError('email')) return "Format d'email invalide";
    if (control.hasError('minlength')) {
      const min = control.getError('minlength')?.requiredLength;
      return `Au moins ${min} caractères`;
    }
    if (control.hasError('maxlength')) {
      const max = control.getError('maxlength')?.requiredLength;
      return `Au maximum ${max} caractères`;
    }
    if (control.hasError('mismatch')) return 'Les champs ne correspondent pas';
    return 'Champ invalide';
  }

  getPasswordError(control: AbstractControl): string {
    if (!control || !control.errors) return '';
    if (control.hasError('required')) return 'Le mot de passe est obligatoire';
    if (control.hasError('minlength')) {
      const min = control.getError('minlength')?.requiredLength;
      return `Le mot de passe doit contenir au moins ${min} caractères`;
    }
    return this.getStandardErrorMessage(control);
  }

  getEmailError(control: AbstractControl): string {
    if (!control || !control.errors) return '';
    if (control.hasError('required')) return "L'email est obligatoire";
    if (control.hasError('email')) return "Le format d'email est invalide";
    return this.getStandardErrorMessage(control);
  }
}
