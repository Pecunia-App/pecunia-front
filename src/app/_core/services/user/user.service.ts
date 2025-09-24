import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProfileForm } from '../../models/forms.model';

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
        this.currentUserId = user.id ?? null; // Utilisation de l'opérateur de coalescence nulle
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
}
