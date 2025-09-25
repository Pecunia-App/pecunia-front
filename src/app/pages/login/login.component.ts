import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PublicLayoutComponent } from '../../shared/layout/public-layout/public-layout.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { LoginFormComponent } from '../../shared/forms/login-form/login-form.component';
import { LinkComponent } from '../../shared/ui/link/link.component';

type InputStatus = null | 'success' | 'error';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PublicLayoutComponent,
    ButtonComponent,
    LoginFormComponent,
    LinkComponent,
  ],
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
