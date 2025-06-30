import { Routes } from '@angular/router';
import { PocBoutonComponent } from './pages/poc-bouton/poc-bouton.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  { path: 'poc-bouton', component: PocBoutonComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
