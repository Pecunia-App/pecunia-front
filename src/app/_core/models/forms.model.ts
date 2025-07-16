import { FormControl, FormGroup } from '@angular/forms';

// Partie commune à tous les formulaires d'auth
export interface Credentials {
  email: string;
  password: string;
}

// Utilisé pour le login
export type LoginForm = Credentials;

// Utilisé pour le register
export interface RegisterForm extends Credentials {
  firstname: string;
  lastname: string;
  confirmPassword: string;
}

/**
 * typage générique pour un FormGroup
 *
 * on peut passer n'importe quelle interface d'objet pour créer un FormGroup typé
 *
 * Exemple : TypedFormGroup<RegisterForm>
 */
export type TypedFormGroup<T extends object> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;
