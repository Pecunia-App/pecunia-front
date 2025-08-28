import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../_core/services/theme/theme.service';

@Component({
  selector: 'app-connected-layout',
  imports: [],
  templateUrl: './connected-layout.component.html',
  styleUrl: './connected-layout.component.scss',
})
export class ConnectedLayoutComponent {
  private themeSevice = inject(ThemeService);
  isDark(): boolean {
    return this.themeSevice.isDarkTheme();
  }
}
