import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Credentials } from '../../models/forms.model';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { AppJwtPayload } from '../../models/auth.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly API_URL = `${environment.apiUrl}`;
  private readonly http = inject(HttpClient);
  // 1. Signal qui stocke le token
  private _token = signal<string | null>(localStorage.getItem('pecunia-token'));

  // 2. Signal computed pour savoir si l'utilisateur est connecté
  readonly isLoggedIn = computed<boolean>(() => {
    const value = this._token();
    if (!value) return false;

    try {
      const decoded = jwtDecode<JwtPayload>(value);
      const exp = decoded?.exp;
      if (!exp) return false;

      const expiryDate = new Date(exp * 1000);
      return expiryDate > new Date();
    } catch {
      return false;
    }
  });
  // 3. Signal computed pour récupérer le rôle
  readonly userRole = computed<string | null>(() => {
    const value = this._token();
    if (!value) return null;

    try {
      const decoded = jwtDecode<AppJwtPayload>(value);
      return decoded?.roles?.[0]?.authority || null;
    } catch {
      return null;
    }
  });
  // 4. Stocke le token dans le signal ET localStorage
  saveToken(token: string): void {
    localStorage.setItem('pecunia-token', token);
    this._token.set(token);
  }
  // 5. Supprime le token
  clearToken(): void {
    localStorage.removeItem('pecunia-token');
    this._token.set(null);
  }
  // 6. Pour l'interceptor
  getToken(): string | null {
    return this._token();
  }
  // 7. Connexion : récupère le token du backend et le stocke
  login(credentials: Credentials): Observable<string> {
    return this.http
      .post(`${AuthService.API_URL}/auth/login`, credentials, {
        responseType: 'text',
      })
      .pipe(
        tap((token) => {
          console.log('Token JWT reçu :', token); // ✅ Affiche le JWT brut
          this.saveToken(token);
        })
      );
  }
  // 8. Utilisable au démarrage de l'app (pour invalider un token expiré au reload)
  verifyToken(): void {
    const token = this._token();
    if (!token) return;

    try {
      const decoded = jwtDecode<AppJwtPayload>(token);
      const exp = decoded?.exp;
      if (!exp) return;
      const expiryDate = new Date(exp * 1000);
      if (expiryDate < new Date()) {
        this.clearToken();
      }
    } catch {
      this.clearToken();
    }
  }

  // **** registration *****
  register(user: User) {
    return this.http.post(`${AuthService.API_URL}/auth/register`, user);
  }

  getDecodedToken(): AppJwtPayload | null {
    const token = this._token();
    if (!token) return null;
    try {
      return jwtDecode<AppJwtPayload>(token);
    } catch (err) {
      console.error('Erreur lors du décodage du JWT', err);
      return null;
    }
  }

  getUserId(): number | null {
    const decoded = this.getDecodedToken();
    return decoded && typeof decoded.id === 'number' ? decoded.id : null;
  }

  getUserEmail(): string | null {
    const decoded = this.getDecodedToken();
    return decoded?.sub ?? null;
  }
}
