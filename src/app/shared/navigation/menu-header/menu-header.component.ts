import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../../_core/services/theme/theme.service';
import { BreakpointService } from '../../../_core/services/responsive/breakpoint.service';
import { LinkComponent } from '../../ui/link/link.component';
import { MenuHeaderDropdownComponent } from '../menu-header-dropdown/menu-header-dropdown.component';

@Component({
  selector: 'app-menu-header',
  imports: [LinkComponent, MenuHeaderDropdownComponent],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss',
})
export class MenuHeaderComponent {
  private themeService = inject(ThemeService);
  private breakpointService = inject(BreakpointService);

  isDark(): boolean {
    return this.themeService.isDarkTheme();
  }
  readonly isDesktop = computed(() => this.breakpointService.isDesktop);
}
