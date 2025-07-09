import { Component, inject } from '@angular/core';
import { PublicLayoutComponent } from '../../shared/layout/public-layout/public-layout.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ThemeSwitchComponent } from '../../shared/theme-switch/theme-switch.component';
import { Router } from '@angular/router';
import { InputComponent } from '../../shared/ui/input/input.component';
import { IconComponent } from '../../shared/ui/icon/icon.component';

type InputStatus = null | 'success' | 'error';

@Component({
  selector: 'app-login',
  imports: [
    PublicLayoutComponent,
    ButtonComponent,
    ThemeSwitchComponent,
    InputComponent,
    IconComponent,
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
