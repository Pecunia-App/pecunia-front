import { TestBed } from '@angular/core/testing';
import { FormUtilsService } from './form-utils.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { LoginForm } from '../models/forms.model';

describe('FormUtilsService', () => {
  let service: FormUtilsService;
  let form: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormUtilsService);
    form = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isFieldInError', () => {
    it('should return true if email is invalid and dirty', () => {
      const control = form.controls.email;
      control.setValue('');
      control.markAsDirty();
      expect(service.isFieldInError<LoginForm>(form, 'email')).toBeTrue();
    });
    it('should return true if password is invalid and touched', () => {
      const control = form.controls.password;
      control.setValue('');
      control.markAsTouched();
      expect(service.isFieldInError<LoginForm>(form, 'password')).toBeTrue();
    });

    it('should return true if email is invalid and isSubmitted', () => {
      const control = form.controls.email;
      control.setValue('');
      expect(service.isFieldInError<LoginForm>(form, 'email', true)).toBeTrue();
    });

    it('should return false if field is valid', () => {
      const control = form.controls.email;
      control.setValue('test@email.com');
      control.markAsDirty();
      expect(service.isFieldInError<LoginForm>(form, 'email')).toBeFalse();
    });

    it('should return false for unknown field', () => {
      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        service.isFieldInError<LoginForm>(form, 'unknown' as any)
      ).toBeFalse();
    });
  });
  describe('getStandardErrorMessage', () => {
    it('should return required error', () => {
      const control = new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      });
      control.markAsTouched();
      expect(service.getStandardErrorMessage(control)).toContain(
        'Ce champ est requis'
      );
    });

    it('should return email error', () => {
      const control = new FormControl('not-an-email', {
        nonNullable: true,
        validators: [Validators.email],
      });
      control.markAsTouched();
      expect(service.getStandardErrorMessage(control)).toContain(
        "Format d'email invalide"
      );
    });

    it('should return minlength error', () => {
      const control = new FormControl('abc', {
        nonNullable: true,
        validators: [Validators.minLength(6)],
      });
      control.markAsTouched();
      expect(service.getStandardErrorMessage(control)).toContain(
        'Ce champ doit contenir au moins 6 caractères'
      );
    });

    it('should return maxlength error', () => {
      const control = new FormControl('abcdefghi', {
        nonNullable: true,
        validators: [Validators.maxLength(5)],
      });
      control.markAsTouched();
      expect(service.getStandardErrorMessage(control)).toContain(
        'Ce champ doit contenir au maximum 5 caractères'
      );
    });

    it('should return mismatch error', () => {
      // On utilise AbstractControl pour setter l'erreur
      const control: AbstractControl = new FormControl('');
      control.setErrors({ mismatch: true } as ValidationErrors);
      expect(service.getStandardErrorMessage(control)).toContain(
        'Les champs ne correspondent pas'
      );
    });

    it('should return empty string for valid control', () => {
      const control = new FormControl('validValue');
      expect(service.getStandardErrorMessage(control)).toBe('');
    });
  });

  describe('getEmailError', () => {
    it('should return required error', () => {
      const control = new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      });
      control.markAsTouched();
      expect(service.getEmailError(control)).toContain('obligatoire');
    });

    it('should return invalid email error', () => {
      const control = new FormControl('test', {
        nonNullable: true,
        validators: [Validators.email],
      });
      control.markAsTouched();
      expect(service.getEmailError(control)).toContain('format');
    });
  });

  describe('getPasswordError', () => {
    it('should return required error', () => {
      const control = new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      });
      control.markAsTouched();
      expect(service.getPasswordError(control)).toContain('obligatoire');
    });

    it('should return minlength error with correct min', () => {
      const control = new FormControl('123', {
        nonNullable: true,
        validators: [Validators.minLength(8)],
      });
      control.markAsTouched();
      expect(service.getPasswordError(control)).toContain('8 caractères');
    });
  });

  describe('getMinLengthError', () => {
    it('should return minLength error with custom label', () => {
      const control = new FormControl('abc', [Validators.minLength(6)]);
      control.setValue('abc');
      control.markAsTouched();
      expect(service.getMinLengthError(control, 'Le champ')).toBe(
        'Le champ doit contenir au moins 6 caractères'
      );
    });

    it('should return default label if not provided', () => {
      const control = new FormControl('ab', [Validators.minLength(3)]);
      control.setValue('ab');
      control.markAsTouched();
      expect(service.getMinLengthError(control)).toBe(
        'Ce champ doit contenir au moins 3 caractères'
      );
    });

    it('should return empty string for valid value', () => {
      const control = new FormControl('abcdef', [Validators.minLength(6)]);
      control.setValue('abcdef');
      expect(service.getMinLengthError(control, 'Le champ')).toBe('');
    });
  });

  describe('getConfirmPasswordError', () => {
    it('should return required error', () => {
      const control = new FormControl('', [Validators.required]);
      control.markAsTouched();
      expect(service.getConfirmPasswordError(control)).toContain('obligatoire');
    });

    it('should return empty string for valid value', () => {
      const control = new FormControl('motdepasse', [Validators.required]);
      control.setValue('motdepasse');
      expect(service.getConfirmPasswordError(control)).toBe('');
    });
  });

  describe('passwordsMatch', () => {
    it('should return null if passwords match', () => {
      const form = new FormGroup({
        password: new FormControl('abc123'),
        confirmPassword: new FormControl('abc123'),
      });
      expect(FormUtilsService.passwordsMatch(form)).toBeNull();
    });

    it('should return a mismatch if passwords do not match', () => {
      const form = new FormGroup({
        password: new FormControl('abc123'),
        confirmPassword: new FormControl('different'),
      });
      expect(FormUtilsService.passwordsMatch(form)).toEqual({ mismatch: true });
    });
  });
});
