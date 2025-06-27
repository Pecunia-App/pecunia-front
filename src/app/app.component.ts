import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeSwitchComponent } from './shared/theme-switch/theme-switch.component';
import { ButtonComponent } from './shared/ui/button/button.component';
import { IconComponent } from './shared/ui/icon/icon.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeSwitchComponent, ButtonComponent, IconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pecunia-front';

  handleButtonClick(): void {
    console.log('Button clicked!');
  }
}
