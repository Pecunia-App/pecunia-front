import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../_core/services/theme/theme.service';
import { IconComponent } from '../ui/icon/icon.component';

@Component({
  selector: 'app-theme-switch',
  imports: [IconComponent],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
})
export class ThemeSwitchComponent {
  private themeService = inject(ThemeService);

  isDark = computed(() => this.themeService.theme() === 'dark');

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
