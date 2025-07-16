import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { PublicLayoutComponent } from '../../shared/layout/public-layout/public-layout.component';
import { Router } from '@angular/router';
import { RegisterFormComponent } from '../../shared/forms/register-form/register-form.component';

@Component({
  selector: 'app-register',
  imports: [ButtonComponent, PublicLayoutComponent, RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  readonly Router = inject(Router);
  navigateToHome() {
    this.Router.navigate(['/']);
  }
}
