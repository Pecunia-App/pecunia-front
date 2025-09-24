import { Routes } from '@angular/router';
import { authGuard } from './_core/guards/auth.guard';
import { roleGuard } from './_core/guards/role.guard';
import { visitorOnlyGuard } from './_core/guards/visitor-only.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/homepage/homepage.component').then(
        (m) => m.HomepageComponent
      ),
    canActivate: [visitorOnlyGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [visitorOnlyGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    canActivate: [visitorOnlyGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./pages/transactions/transactions.component').then(
        (m) => m.TransactionsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/parameters/parameters.component').then(
        (m) => m.ParametersComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.component').then((m) => m.AdminComponent),
    canActivate: [roleGuard('ROLE_ADMIN')],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/homepage/homepage.component').then(
        (m) => m.HomepageComponent
      ),
    canActivate: [visitorOnlyGuard],
  },
];
