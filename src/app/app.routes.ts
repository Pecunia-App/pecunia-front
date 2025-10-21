import { Routes } from '@angular/router';
import { authGuard } from './_core/guards/auth.guard';
import { roleGuard } from './_core/guards/role.guard';
import { visitorOnlyGuard } from './_core/guards/visitor-only.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserResolver } from './_core/resolver/user.resolver';
import { WalletResolver } from './_core/resolver/wallet.resolver';
import { TransactionListResolver } from './_core/resolver/transaction-list.resolver';
import { TransactionDetailResolver } from './_core/resolver/transaction-detail.resolver';
import { CategoriesResolver } from './_core/resolver/categories.resolver';
import { TagsResolver } from './_core/resolver/tags.resolver';
import { ProvidersResolver } from './_core/resolver/providers.resolver';

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
    resolve: {
      user: UserResolver,
      wallet: WalletResolver,
      transactions: TransactionListResolver,
    },
  },
  {
    path: 'poc-boutons',
    loadComponent: () =>
      import('./pages/poc-bouton/poc-bouton.component').then(
        (m) => m.PocBoutonComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import(
        './pages/transactions/transactions-list/transactions-list.component'
      ).then((m) => m.TransactionsListComponent),
    canActivate: [authGuard],
    resolve: {
      user: UserResolver,
      wallet: WalletResolver,
      transactions: TransactionListResolver,
      categories: CategoriesResolver,
      tags: TagsResolver,
      providers: ProvidersResolver,
    },
  },
  {
    path: 'transactions/add',
    loadComponent: () =>
      import(
        './pages/transactions/transactions-create/transactions-create.component'
      ).then((m) => m.TransactionsCreateComponent),
    canActivate: [authGuard],
    resolve: {
      categories: CategoriesResolver,
      tags: TagsResolver,
      providers: ProvidersResolver,
    },
  },
  {
    path: 'transactions/:id',
    loadComponent: () =>
      import(
        './pages/transactions/transaction-detail/transaction-detail.component'
      ).then((m) => m.TransactionDetailComponent),
    canActivate: [authGuard],
    resolve: {
      transaction: TransactionDetailResolver,
    },
  },
  {
    path: 'transactions/:id/update',
    loadComponent: () =>
      import(
        './pages/transactions/transactions-update/transactions-update.component'
      ).then((m) => m.TransactionsUpdateComponent),
    canActivate: [authGuard],
    resolve: {
      transaction: TransactionDetailResolver,
    },
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/parameters/parameters.component').then(
        (m) => m.ParametersComponent
      ),
    canActivate: [authGuard],
    resolve: {
      categories: CategoriesResolver,
      tags: TagsResolver,
      providers: ProvidersResolver,
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
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
