import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
// import { environment } from '../../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  // const apiUrl = environment.apiUrl;
  // const credentials = {
  //   email: 'test@pecunia.fr',
  //   password: environment.testPassword,
  // };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClientTesting(),
        provideHttpClient(withFetch()),
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    service.clearToken();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should login and store token', (done) => {
  //   console.log('Test credentials:', credentials);

  //   service.login(credentials).subscribe({
  //     next: (token) => {
  //       expect(token).toBeTruthy();
  //       expect(service.getToken()).toBe(token);
  //       done();
  //     },
  //     error: (err) => {
  //       fail(`Erreur login: ${JSON.stringify(err)}`);
  //       done();
  //     },
  //   });
  // });
});
