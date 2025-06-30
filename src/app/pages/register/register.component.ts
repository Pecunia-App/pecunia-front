import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ThemeSwitchComponent } from '../../shared/theme-switch/theme-switch.component';
import { PublicLayoutComponent } from '../../shared/layout/public-layout/public-layout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ButtonComponent, ThemeSwitchComponent, PublicLayoutComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  readonly Router = inject(Router);
  navigateToHome() {
    this.Router.navigate(['/']);
  }
}
