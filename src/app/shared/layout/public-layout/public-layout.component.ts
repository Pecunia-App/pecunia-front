import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../_core/services/theme/theme.service';

@Component({
  selector: 'app-public-layout',
  imports: [],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss',
})
export class PublicLayoutComponent {
  private themeService = inject(ThemeService);

  isDark(): boolean {
    return this.themeService.isDarkTheme();
  }
}
