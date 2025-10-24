import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProfileFormComponent } from './profile-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UserService } from '../../../_core/services/user/user.service';
import {
  ANIMATION_MODULE_TYPE,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';

class MockFormUtilsService {
  showError = jasmine.createSpy('showError');
  showInfo = jasmine.createSpy('showInfo');
  showSuccess = jasmine.createSpy('showSuccess');
}

class MockUserStoreService {
  _user = { id: 1, firstname: '', lastname: '', email: '', profilePicture: '' };
  user = jasmine.createSpy('user').and.callFake(() => this._user);
  refreshUser = jasmine.createSpy('refreshUser');
}
class MockThemeService {
  toggleTheme = jasmine.createSpy('toggleTheme');
  isDarkTheme = jasmine.createSpy('isDarkTheme').and.returnValue(false);
}

class MockNzModalService {
  confirm = jasmine.createSpy('confirm');
}

describe('ProfileFormComponent', () => {
  let userService: jasmine.SpyObj<UserService>;
  let component: ProfileFormComponent;

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', [
      'getCurrentUser',
      'updateProfile',
      'updatePassword',
      'uploadProfilePicture',
      'deleteProfilePicture',
    ]);

    // Mock de base : utilisateur vide
    userService.getCurrentUser.and.returnValue(
      of({ id: 1, firstname: '', lastname: '', email: '', profilePicture: '' })
    );
    userService.updateProfile.and.returnValue(
      of({
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        profilePicture: '',
      })
    );
    userService.updatePassword.and.returnValue(of(void 0));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ProfileFormComponent],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: 'FormUtilsService', useClass: MockFormUtilsService },
        { provide: 'UserStoreService', useClass: MockUserStoreService },
        { provide: 'ThemeService', useClass: MockThemeService },
        { provide: 'NzModalService', useClass: MockNzModalService },
        { provide: ANIMATION_MODULE_TYPE, useValue: 'NoopAnimations' },
        provideNoopAnimations(),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Form Initialization should initialize with empty values', () => {
    expect(component.profileForm.get('firstname')?.value).toBe('');
    expect(component.profileForm.get('lastname')?.value).toBe('');
    expect(component.profileForm.get('email')?.value).toBe('');
  });

  it('Form Validation should be valid with correct data (when enabled)', fakeAsync(() => {
    component.toggleEditMode(); // rend le formulaire éditable
    tick();
    component.profileForm.setValue({
      firstname: 'Alice',
      lastname: 'Wonder',
      email: 'alice@example.com',
      password: '',
      confirmPassword: '',
    });
    expect(component.profileForm.valid).toBeTrue();
  }));

  it('Form Submission should call updateProfile when form is valid', fakeAsync(() => {
    component.toggleEditMode();
    tick();

    component.currentUserId = 1;
    component.profileForm.patchValue({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
    });

    component.onSubmit();
    tick();

    expect(userService.updateProfile).toHaveBeenCalledWith(1, {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
    });
  }));

  it('User Interaction should update form value when user types', () => {
    component.toggleEditMode(); // active le form
    component.profileForm.get('firstname')?.setValue('Alice');
    expect(component.profileForm.get('firstname')?.value).toBe('Alice');
  });

  it('Form Initialization should have email validator on email field', () => {
    component.toggleEditMode();
    const emailControl = component.profileForm.get('email');
    emailControl?.setValue('invalid');
    expect(emailControl?.valid).toBeFalse();
    emailControl?.setValue('valid@email.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('Password validator should detect mismatch', () => {
    component.toggleEditMode();
    component.profileForm.patchValue({
      password: 'longenoughpassword',
      confirmPassword: 'differentpassword',
    });
    expect(component.profileForm.errors?.['passwordMismatch']).toBeTrue();
  });
});
