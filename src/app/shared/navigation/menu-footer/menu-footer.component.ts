import { Component, inject } from '@angular/core';
import { IconComponent } from '../../ui/icon/icon.component';
import { LinkComponent } from '../../ui/link/link.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-footer',
  imports: [IconComponent, LinkComponent, ButtonComponent],
  templateUrl: './menu-footer.component.html',
  styleUrl: './menu-footer.component.scss',
})
export class MenuFooterComponent {
  private router = inject(Router);

  public handleButtonClick() {
    this.router.navigate(['/transactions/add']);
  }
}
