import { Component, inject } from '@angular/core';
import { PublicLayoutComponent } from '../../shared/layout/public-layout/public-layout.component';
import { BreakpointService } from '../../_core/services/responsive/breakpoint.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [PublicLayoutComponent, ButtonComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  readonly breakpoint = inject(BreakpointService);
  readonly Router = inject(Router);

  navigateToRegister() {
    this.Router.navigate(['/register']);
  }

  navigateToLogin() {
    this.Router.navigate(['/login']);
  }
}
