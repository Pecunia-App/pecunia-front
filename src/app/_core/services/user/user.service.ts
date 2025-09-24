import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PasswordUpdateForm, ProfileForm } from '../../models/forms.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static readonly API_URL = `${environment.apiUrl}`;
  private readonly http = inject(HttpClient);
  private currentUserId: number | null = null;

  getCurrentUser(): Observable<ProfileForm> {
    return this.http.get<ProfileForm>(`${UserService.API_URL}/users/me`).pipe(
      tap((user) => {
        this.currentUserId = user.id ?? null;
      })
    );
  }

  updateProfile(userData: Partial<ProfileForm>): Observable<ProfileForm> {
    if (!this.currentUserId) {
      throw new Error('User ID is not available');
    }
    return this.http.put<ProfileForm>(
      `${UserService.API_URL}/users/${this.currentUserId}`,
      userData
    );
  }
  updatePassword(passwords: PasswordUpdateForm): Observable<void> {
    console.log(
      'URL appelée:',
      `${UserService.API_URL}/users/${this.currentUserId}/password`
    );
    console.log('Payload envoyé:', passwords);
    return this.http.put<void>(
      `${UserService.API_URL}/users/${this.currentUserId}/password`,
      passwords
    );
  }
}
