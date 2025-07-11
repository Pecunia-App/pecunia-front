import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ThemeSwitchComponent } from '../../shared/theme-switch/theme-switch.component';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { LinkComponent } from '../../shared/ui/link/link.component';

@Component({
  selector: 'app-poc-bouton',
  imports: [
    ThemeSwitchComponent,
    IconComponent,
    ButtonComponent,
    LinkComponent,
  ],
  templateUrl: './poc-bouton.component.html',
  styleUrl: './poc-bouton.component.scss',
})
export class PocBoutonComponent {
  title = 'pecunia-front';

  handleButtonClick(): void {
    console.log('Button clicked!');
  }
}
