import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { provideHttpClient } from '@angular/common/http';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form rendering', () => {
    it('should display email and password fields', () => {
      const emailInput = fixture.nativeElement.querySelector('#email-input');
      const passwordInput =
        fixture.nativeElement.querySelector('#password-input');
      expect(emailInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();
    });
  });

  describe('Form validation', () => {
    it('should show required errors when form is submitted empty', () => {
      component.loginForm.markAllAsTouched(); // force l'état touched
      fixture.detectChanges();

      const emailHelper = fixture.nativeElement.querySelector(
        '[data-test="helper-email-input"]'
      );
      const passwordHelper = fixture.nativeElement.querySelector(
        '[data-test="helper-password-input"]'
      );
      expect(emailHelper.textContent).toContain('Email is required');
      expect(passwordHelper.textContent).toContain('Password is required');
    });

    it('should show invalid email error for bad format', () => {
      component.loginForm.controls['email'].setValue('toto');
      component.loginForm.controls['email'].markAsTouched();
      fixture.detectChanges();

      const emailHelper = fixture.nativeElement.querySelector(
        '[data-test="helper-email-input"]'
      );
      expect(emailHelper.textContent).toContain('Invalid email address');
    });

    it('should show minlength error for short password', () => {
      component.loginForm.controls['email'].setValue('john@mail.com');
      component.loginForm.controls['password'].setValue('123');
      component.loginForm.controls['password'].markAsTouched();
      fixture.detectChanges();
      const passwordHelper = fixture.nativeElement.querySelector(
        '[data-test="helper-password-input"]'
      );
      expect(passwordHelper.textContent).toContain(
        'Password must be at least 6 characters long'
      );
    });

    it('should have no error message with valid fields', () => {
      component.loginForm.controls['email'].setValue('john@mail.com');
      component.loginForm.controls['password'].setValue('123456');
      component.loginForm.markAllAsTouched();
      fixture.detectChanges();

      const emailHelper = fixture.nativeElement.querySelector(
        '[data-test="helper-email-input"]'
      );
      const passwordHelper = fixture.nativeElement.querySelector(
        '[data-test="helper-password-input"]'
      );
      expect(emailHelper).toBeNull();
      expect(passwordHelper).toBeNull();
    });
  });

  describe('Submission', () => {
    it('should call onSubmit when form is valid and submitted', () => {
      spyOn(component, 'onSubmit');
      component.loginForm.controls['email'].setValue('john@mail.com');
      component.loginForm.controls['password'].setValue('123456');
      fixture.detectChanges();

      const form = fixture.nativeElement.querySelector('form');
      form.dispatchEvent(new Event('submit'));
      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should NOT call onSubmit when form is invalid and submitted', () => {
      spyOn(console, 'log');
      // Laisse les champs vides ou avec une valeur invalide
      component.loginForm.controls['email'].setValue('');
      component.loginForm.controls['password'].setValue('');
      fixture.detectChanges();
      const form = fixture.nativeElement.querySelector('form');
      form.dispatchEvent(new Event('submit'));
      fixture.detectChanges();

      expect(console.log).not.toHaveBeenCalledWith(
        'form submitted with: ',
        jasmine.anything()
      );
    });
  });
});
