import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { routes } from './app.routes';
import { fr_FR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authInterceptor } from './_core/interceptor/auth.interceptor';
import { AuthService } from './_core/services/auth/auth.service';
import { UserStoreService } from './_core/store/user.store.service';

registerLocaleData(fr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzI18n(fr_FR),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAppInitializer(() => {
      const auth = inject(AuthService);
      const userStore = inject(UserStoreService);

      const token = auth.getToken();
      if (!token) return;

      auth.verifyToken();
      if (auth.getToken()) {
        userStore.loadUser();
      }
    }),
  ],
};
