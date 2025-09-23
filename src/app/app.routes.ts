import { Routes } from '@angular/router';
import { PocBoutonComponent } from './pages/poc-bouton/poc-bouton.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { authGuard } from './_core/guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { roleGuard } from './_core/guards/role.guard';
import { visitorOnlyGuard } from './_core/guards/visitor-only.guard';
import { ParametersComponent } from './pages/parameters/parameters.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [visitorOnlyGuard],
  },
  { path: 'poc-bouton', component: PocBoutonComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [visitorOnlyGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [visitorOnlyGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'parameters',
    component: ParametersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [roleGuard('ROLE_ADMIN')],
  },
  {
    path: '**',
    component: HomepageComponent,
    canActivate: [visitorOnlyGuard],
  },
];
