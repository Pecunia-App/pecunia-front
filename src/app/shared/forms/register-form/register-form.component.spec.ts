import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { provideHttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormComponent, RouterTestingModule],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Form rendering', () => {
    it('should display all register fields', () => {
      expect(
        fixture.nativeElement.querySelector('#firstname-input')
      ).toBeTruthy();
      expect(
        fixture.nativeElement.querySelector('#lastname-input')
      ).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#email-input')).toBeTruthy();
      expect(
        fixture.nativeElement.querySelector('#password-input')
      ).toBeTruthy();
      expect(
        fixture.nativeElement.querySelector('#confirm-password-input')
      ).toBeTruthy();
    });
  });

  describe('Form validation', () => {
    it('should show required errors when form is submitted empty', () => {
      component.registerForm.markAllAsTouched();
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain(
        'Le champ est obligatoire'
      );
      expect(fixture.nativeElement.textContent).toContain(
        'Le champ est obligatoire'
      );
      expect(fixture.nativeElement.textContent).toContain(
        "L'email est obligatoire"
      );
      expect(fixture.nativeElement.textContent).toContain(
        'Le mot de passe est obligatoire'
      );
      expect(fixture.nativeElement.textContent).toContain(
        'La confirmation est obligatoire'
      );
    });

    it('should show minLength error for short firstname', () => {
      component.registerForm.controls['firstname'].setValue('A');
      component.registerForm.controls['firstname'].markAsTouched();
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain(
        'Ce champ doit contenir au moins 2 caractères'
      );
    });

    it('should show minLength error for short lastname', () => {
      component.registerForm.controls['lastname'].setValue('B');
      component.registerForm.controls['lastname'].markAsTouched();
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain(
        'Ce champ doit contenir au moins 2 caractères'
      );
    });

    it('should show invalid email error for bad format', () => {
      component.registerForm.controls['email'].setValue('toto');
      component.registerForm.controls['email'].markAsTouched();
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain(
        "Le format d'email est invalide"
      );
    });

    it('should show minlength error for short password', () => {
      component.registerForm.controls['password'].setValue('123');
      component.registerForm.controls['password'].markAsTouched();
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain(
        'Le mot de passe doit contenir au moins 12 caractères'
      );
    });

    it('should show required error for empty confirmation', () => {
      component.registerForm.controls['confirmPassword'].setValue('');
      component.registerForm.controls['confirmPassword'].markAsTouched();
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain(
        'La confirmation est obligatoire'
      );
    });

    it('should show mismatch error for non-matching passwords', () => {
      component.registerForm.controls['password'].setValue('unmotdepasse12');
      component.registerForm.controls['confirmPassword'].setValue(
        'autrechose12'
      );
      component.registerForm.controls['confirmPassword'].markAsTouched();
      // Forcer le validator à être relancé
      component.registerForm.updateValueAndValidity();
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain(
        'Les mots de passe ne correspondent pas'
      );
    });

    it('should have no error message with valid fields', () => {
      component.registerForm.controls['firstname'].setValue('Jean');
      component.registerForm.controls['lastname'].setValue('Dupont');
      component.registerForm.controls['email'].setValue(
        'jean.dupont@email.com'
      );
      component.registerForm.controls['password'].setValue('UnSuperPassword12');
      component.registerForm.controls['confirmPassword'].setValue(
        'UnSuperPassword12'
      );
      component.registerForm.markAllAsTouched();
      component.registerForm.updateValueAndValidity();
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).not.toContain('obligatoire');
      expect(fixture.nativeElement.textContent).not.toContain('Au moins');
      expect(fixture.nativeElement.textContent).not.toContain(
        "Le format d'email est invalide"
      );
      expect(fixture.nativeElement.textContent).not.toContain(
        'ne correspondent pas'
      );
    });
  });

  describe('Submission', () => {
    it('should call onSubmit when form is valid and submitted', () => {
      spyOn(component, 'onSubmit').and.callThrough();
      component.registerForm.controls['firstname'].setValue('Jean');
      component.registerForm.controls['lastname'].setValue('Dupont');
      component.registerForm.controls['email'].setValue(
        'jean.dupont@email.com'
      );
      component.registerForm.controls['password'].setValue('UnSuperPassword12');
      component.registerForm.controls['confirmPassword'].setValue(
        'UnSuperPassword12'
      );
      fixture.detectChanges();

      const form = fixture.nativeElement.querySelector('form');
      form.dispatchEvent(new Event('submit'));
      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.registerForm.valid).toBeTrue();
    });

    it('should NOT call onSubmit when form is invalid and submitted', () => {
      spyOn(component, 'onSubmit').and.callThrough();
      component.registerForm.controls['firstname'].setValue('');
      component.registerForm.controls['lastname'].setValue('');
      component.registerForm.controls['email'].setValue('');
      component.registerForm.controls['password'].setValue('');
      component.registerForm.controls['confirmPassword'].setValue('');
      fixture.detectChanges();

      const form = fixture.nativeElement.querySelector('form');
      form.dispatchEvent(new Event('submit'));
      fixture.detectChanges();

      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.registerForm.valid).toBeFalse();
    });
  });
});
