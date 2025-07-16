import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../_core/services/theme/theme.service';
import { MenuHeaderComponent } from '../../navigation/menu-header/menu-header.component';

@Component({
  selector: 'app-connected-layout',
  standalone: true,
  imports: [MenuHeaderComponent],
  templateUrl: './connected-layout.component.html',
  styleUrl: './connected-layout.component.scss',
})
export class ConnectedLayoutComponent {
  private themeSevice = inject(ThemeService);
  isDark(): boolean {
    return this.themeSevice.isDarkTheme();
  }
}
