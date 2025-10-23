import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { UserStoreService } from '../../../_core/store/user.store.service';
import { ThemeService } from '../../../_core/services/theme/theme.service';
import { catchError, finalize, forkJoin, of, tap } from 'rxjs';

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
  private userStore = inject(UserStoreService);
  private themeService = inject(ThemeService);

  showUploadModal = false;
  showPassword = false;
  isEditMode = false;
  hasProfilePicture = false;

  currentUserId: number | null = null;
  tempAvatarPreview: string | null = null;
  uploadPreview: string | null = null;
  uploadFile: File | null = null;

  readonly DEFAULT_AVATAR = 'assets/images/default-user.svg';

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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

  get avatarSrc(): string {
    const profilePicture = this.userStore.user()?.profilePicture;
    if (this.tempAvatarPreview) return this.tempAvatarPreview;
    if (profilePicture) return `data:image/png;base64,${profilePicture}`;
    return this.DEFAULT_AVATAR;
  }

  ngOnInit(): void {
    this.loadUserData();
    this.disableFormControls();
  }

  private loadUserData(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user: ProfileForm) => {
        this.currentUserId = user.id || null;

        this.profileForm.patchValue({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        });

        this.hasProfilePicture = !!this.userStore.user()?.profilePicture;
        this.tempAvatarPreview = null; // Réinitialiser la prévisualisation
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du user:', err);
      },
    });
  }

  setDefaultAvatar(): void {
    this.hasProfilePicture = false;
  }

  private disableFormControls(): void {
    Object.keys(this.profileForm.controls).forEach((key) => {
      this.profileForm.get(key)?.disable();
    });
  }

  private enableFormControls(): void {
    Object.keys(this.profileForm.controls).forEach((key) => {
      this.profileForm.get(key)?.enable();
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.handleConfirm();
    }
  }

  handleConfirm(): void {
    if (!this.currentUserId) {
      this.formUtils.showError('Utilisateur non identifié');
      return;
    }

    const jobs = [];

    // Upload/Update photo si sélectionnée (utilise toujours PUT)
    if (this.uploadFile) {
      jobs.push(this.uploadProfilePicture());
    }

    // Mise à jour profil
    const formValue = this.profileForm.value;
    const updates: Partial<ProfileForm> = {};

    if (formValue.firstname) updates.firstname = formValue.firstname;
    if (formValue.lastname) updates.lastname = formValue.lastname;
    if (formValue.email) updates.email = formValue.email;

    if (Object.keys(updates).length > 0) {
      jobs.push(this.userService.updateProfile(this.currentUserId, updates));
    }

    // Mise à jour mot de passe
    if (
      formValue.password &&
      formValue.password === formValue.confirmPassword
    ) {
      const pwd: PasswordUpdateForm = {
        newPassword: formValue.password,
        confirmNewPassword: formValue.confirmPassword,
      };
      jobs.push(this.userService.updatePassword(this.currentUserId, pwd));
    }

    if (jobs.length === 0) {
      this.formUtils.showSuccess('Aucune modification à enregistrer');
      return;
    }

    forkJoin(jobs)
      .pipe(
        finalize(() => {
          this.formUtils.showSuccess('Modifications enregistrées');
          this.userStore.refreshUser(); // Lance le refresh du store
          // Délai pour s'assurer que le store est à jour
          setTimeout(() => {
            this.toggleEditMode();
            this.profileForm.markAsPristine();
            this.cleanUploadState();
          }, 300);
        })
      )
      .subscribe({
        error: (err) => {
          console.error('Erreur globale:', err);
          this.formUtils.showError('Une erreur est survenue');
        },
      });
  }

  private uploadProfilePicture() {
    if (!this.uploadFile || !this.currentUserId) {
      return of(null);
    }

    // Toujours utiliser PUT (crée ou met à jour)
    return this.userService
      .uploadProfilePicture(this.currentUserId, this.uploadFile, true)
      .pipe(
        tap((response) => {
          if (response) {
            this.hasProfilePicture = true;
            this.tempAvatarPreview = null;
          }
        }),
        catchError((error) => {
          console.error('Erreur upload:', error);
          this.formUtils.showError("Erreur lors de l'upload de la photo");
          return of(null);
        })
      );
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;

    if (!this.isEditMode) {
      this.loadUserData();
      this.cleanUploadState();
    }

    if (this.isEditMode) {
      this.enableFormControls();
    } else {
      this.disableFormControls();
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDarkTheme(): boolean {
    return this.themeService.isDarkTheme();
  }

  private passwordMatchValidator(
    form: FormGroup
  ): null | { passwordMismatch: boolean } {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (!password && !confirmPassword) return null;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

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

  openFilePicker(): void {
    this.fileInput?.nativeElement?.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const allowedTypes = ['image/png', 'image/jpeg'];

    if (!allowedTypes.includes(file.type)) {
      this.formUtils.showError('Seules les images PNG et JPEG sont acceptées.');
      input.value = '';
      return;
    }

    this.uploadFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadPreview = reader.result as string;
      this.showUploadModal = true;
    };
    reader.readAsDataURL(file);
  }

  confirmUpload(): void {
    if (this.uploadFile && this.uploadPreview) {
      this.tempAvatarPreview = this.uploadPreview;
      this.profileForm.markAsDirty();
      this.showUploadModal = false;
    }
  }

  cancelUpload(): void {
    this.cleanUploadState();
    this.showUploadModal = false;
  }

  private cleanUploadState(): void {
    this.uploadPreview = null;
    this.uploadFile = null;
    this.tempAvatarPreview = null;
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  deleteProfilePicture(): void {
    if (!this.currentUserId) {
      this.formUtils.showError('Utilisateur non identifié');
      return;
    }

    if (
      !confirm('Êtes-vous sûr de vouloir supprimer votre photo de profil ?')
    ) {
      return;
    }

    this.userService.deleteProfilePicture(this.currentUserId).subscribe({
      next: () => {
        this.hasProfilePicture = false;
        this.userStore.refreshUser();
        this.formUtils.showSuccess('Photo de profil supprimée');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur suppression:', err);
        this.formUtils.showError('Erreur lors de la suppression de la photo');
      },
    });
  }

  openUploadModal(): void {
    this.showUploadModal = true;
  }
}
