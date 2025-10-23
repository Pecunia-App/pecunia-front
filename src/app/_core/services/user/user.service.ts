import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PasswordUpdateForm, ProfileForm } from '../../models/forms.model';
import { WalletDTO } from '../../models/transactions/wallet.dto';
import { ProfilePictureDTO } from '../../models/users/profile-picture.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static readonly API_URL = `${environment.apiUrl}`;
  private readonly http = inject(HttpClient);

  getCurrentUser(): Observable<ProfileForm> {
    return this.http.get<ProfileForm>(`${UserService.API_URL}/users/me`);
  }

  updateProfile(
    userId: number,
    userData: Partial<ProfileForm>
  ): Observable<ProfileForm> {
    if (!userId) {
      return throwError(() => new Error('User ID is not available'));
    }
    return this.http.put<ProfileForm>(
      `${UserService.API_URL}/users/${userId}`,
      userData
    );
  }

  updatePassword(
    userId: number,
    passwords: PasswordUpdateForm
  ): Observable<void> {
    if (!userId) {
      return throwError(() => new Error('User ID is not available'));
    }
    return this.http.put<void>(
      `${UserService.API_URL}/users/${userId}/password`,
      passwords
    );
  }

  getWalletByUserId(userId: number): Observable<WalletDTO> {
    return this.http.get<WalletDTO>(
      `${UserService.API_URL}/wallets/users/${userId}`
    );
  }

  uploadProfilePicture(
    userId: number,
    file: File,
    hasExistingPhoto = false
  ): Observable<ProfilePictureDTO> {
    if (!userId) {
      return throwError(() => new Error('User ID is not available'));
    }

    if (!file) {
      return throwError(() => new Error('No file provided'));
    }

    const formData = new FormData();
    formData.append('file', file);

    const url = `${UserService.API_URL}/profile-pictures/users/${userId}`;
    const method = hasExistingPhoto ? 'PUT' : 'POST';

    return method === 'PUT'
      ? this.http.put<ProfilePictureDTO>(url, formData)
      : this.http.post<ProfilePictureDTO>(url, formData);
  }

  getProfilePicture(userId: number): Observable<ProfilePictureDTO> {
    return this.http.get<ProfilePictureDTO>(
      `${UserService.API_URL}/profile-pictures/users/${userId}`
    );
  }

  deleteProfilePicture(userId: number): Observable<void> {
    if (!userId) {
      return throwError(() => new Error('User ID is not available'));
    }

    return this.http.delete<void>(
      `${UserService.API_URL}/profile-pictures/users/${userId}`
    );
  }
}
