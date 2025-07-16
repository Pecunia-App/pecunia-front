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
        'Au moins 6 caractères'
      );
    });

    it('should return maxlength error', () => {
      const control = new FormControl('abcdefghi', {
        nonNullable: true,
        validators: [Validators.maxLength(5)],
      });
      control.markAsTouched();
      expect(service.getStandardErrorMessage(control)).toContain(
        'Au maximum 5 caractères'
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
});
