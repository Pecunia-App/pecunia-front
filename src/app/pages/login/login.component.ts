import { Component, inject } from '@angular/core';
import { PublicLayoutComponent } from '../../shared/layout/public-layout/public-layout.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ThemeSwitchComponent } from '../../shared/theme-switch/theme-switch.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [PublicLayoutComponent, ButtonComponent, ThemeSwitchComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly Router = inject(Router);

  navigateToHome() {
    this.Router.navigate(['/']);
  }
}
