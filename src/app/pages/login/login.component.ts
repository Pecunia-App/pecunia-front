import { Component, inject } from '@angular/core';
import { PublicLayoutComponent } from '../../shared/layout/public-layout/public-layout.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Router } from '@angular/router';
import { LoginFormComponent } from '../../shared/forms/login-form/login-form.component';

type InputStatus = null | 'success' | 'error';

@Component({
  selector: 'app-login',
  imports: [PublicLayoutComponent, ButtonComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly Router = inject(Router);
  public statusFirstName: InputStatus = 'error';
  public statusLastName: InputStatus = 'success';

  navigateToHome() {
    this.Router.navigate(['/']);
  }
}
