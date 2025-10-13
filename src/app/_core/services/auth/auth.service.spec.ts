import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  MOCK_AUTH_ERROR_401,
  MOCK_AUTH_ERROR_500,
  MOCK_JWT_TOKEN,
  MOCK_JWT_TOKEN_EXPIRED,
  MOCK_USER_INVALID,
  MOCK_USER_VALID,
} from './auth.mock';
import { environment } from '../../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Intercepte et flush toutes les requêtes ouvertes avant de vérifier
    httpMock.match(() => true).forEach((req) => req.flush({}));
    httpMock.verify();
    localStorage.clear();
  });

  it('TC01 - should store token on successful login', () => {
    //1) déclenchement req (observable)
    service.login(MOCK_USER_VALID).subscribe(() => {
      //4) vérification après avoir reçu la réponse simulé (async)
      expect(localStorage.getItem('pecunia-token')).toBe(MOCK_JWT_TOKEN);
      expect(service.isLoggedIn()).toBeTrue();
    });

    //2) interception et simulation requete HTTP avec HttpTestingController
    const reqMocked = httpMock.expectOne(`${environment.apiUrl}/auth/login`);

    expect(reqMocked.request.method).toBe('POST');
    expect(reqMocked.request.body).toEqual(MOCK_USER_VALID);
    //3) méthode flush simule la réponse et cela déclenche le subscribe de l'observable
    reqMocked.flush(MOCK_JWT_TOKEN);
  });

  it('TC02 - should handle 401 error on invalid credentials', () => {
    service.login(MOCK_USER_INVALID).subscribe({
      error: (error) => {
        const parsed = JSON.parse(error.error);
        expect(error.status).toBe(MOCK_AUTH_ERROR_401.status);
        expect(error.statusText).toBe(MOCK_AUTH_ERROR_401.statusText);
        expect(parsed.message).toBe(MOCK_AUTH_ERROR_401.error.message);
      },
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(MOCK_USER_INVALID);

    req.flush(
      { message: 'Email ou mot de passe incorrect' },
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  });

  it('TC03 - should handle 500 server error on login', () => {
    service.login(MOCK_USER_VALID).subscribe({
      next: () => fail('Should have failed with 500 error'),
      error: (error) => {
        const parsed = JSON.parse(error.error);
        expect(error.status).toBe(MOCK_AUTH_ERROR_500.status);
        expect(error.statusText).toBe(MOCK_AUTH_ERROR_500.statusText);
        expect(parsed.message).toBe(MOCK_AUTH_ERROR_500.error.message);
      },
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(MOCK_USER_VALID);

    req.flush(
      { message: 'Erreur inconnue' },
      {
        status: 500,
        statusText: 'Internal Server Error',
      }
    );
  });

  it('TC04 - should store token in localStorage and signal', () => {
    service.saveToken(MOCK_JWT_TOKEN);
    expect(localStorage.getItem('pecunia-token')).toBe(MOCK_JWT_TOKEN);
    expect(service.getToken()).toBe(MOCK_JWT_TOKEN);
  });

  it('TC05 - isLoggedIn should return true if token is valid (not expired)', () => {
    service.saveToken(MOCK_JWT_TOKEN);
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('TC06 - isLoggedIn should return false if token has an expired date', () => {
    service.saveToken(MOCK_JWT_TOKEN_EXPIRED);
    expect(service.isLoggedIn()).toBeFalse();
  });
  it('TC06 - isLoggedIn should return false if no token stored', () => {
    service.clearToken();
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('TC07 - should return user role from token', () => {
    service.saveToken(MOCK_JWT_TOKEN);
    expect(service.userRole()).toBe('ROLE_USER');
  });

  it('TC08 - should remove token from localStorage and signal', () => {
    //Simule un token stocké
    service.saveToken(MOCK_JWT_TOKEN);

    //Vérifie qu’il est bien présent avant suppression
    expect(localStorage.getItem('pecunia-token')).toBe(MOCK_JWT_TOKEN);
    expect(service.getToken()).toBe(MOCK_JWT_TOKEN);

    //Appelle la méthode à tester
    service.clearToken();

    //Vérifie qu’il est supprimé du localStorage et du signal
    expect(localStorage.getItem('pecunia-token')).toBeNull();
    expect(service.getToken()).toBeNull();
  });

  it('TC09 - should clear token if expired (verifyToken)', () => {
    service.saveToken(MOCK_JWT_TOKEN_EXPIRED);

    expect(localStorage.getItem('pecunia-token')).toBe(MOCK_JWT_TOKEN_EXPIRED);
    expect(service.getToken()).toBe(MOCK_JWT_TOKEN_EXPIRED);

    service.verifyToken();

    expect(localStorage.getItem('pecunia-token')).toBeNull();
    expect(service.getToken()).toBeNull();
  });
});
