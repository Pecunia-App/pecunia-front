import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeSwitchComponent } from './shared/theme-switch/theme-switch.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeSwitchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pecunia-front';
}
