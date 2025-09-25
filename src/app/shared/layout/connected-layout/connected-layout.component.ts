import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../../_core/services/theme/theme.service';
import { MenuHeaderComponent } from '../../navigation/menu-header/menu-header.component';
import { BreakpointService } from '../../../_core/services/responsive/breakpoint.service';
import { MenuFooterComponent } from '../../navigation/menu-footer/menu-footer.component';

@Component({
  selector: 'app-connected-layout',
  imports: [MenuHeaderComponent, MenuFooterComponent],
  templateUrl: './connected-layout.component.html',
  styleUrl: './connected-layout.component.scss',
})
export class ConnectedLayoutComponent {
  private themeSevice = inject(ThemeService);
  private breakpointService = inject(BreakpointService);
  readonly isMobile = computed(
    () => this.breakpointService.isMobile || this.breakpointService.isTablet
  );
  isDark(): boolean {
    return this.themeSevice.isDarkTheme();
  }
}
