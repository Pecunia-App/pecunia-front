import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { BreakpointService } from '../../../_core/services/responsive/breakpoint.service';
import { AuthService } from '../../../_core/services/auth/auth.service';
import { IconComponent } from '../../ui/icon/icon.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-header-dropdown',
  imports: [IconComponent, RouterLink],
  templateUrl: './menu-header-dropdown.component.html',
  styleUrl: './menu-header-dropdown.component.scss',
})
export class MenuHeaderDropdownComponent {
  private breakpointService = inject(BreakpointService);
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly isOpen = signal(false);
  readonly isDesktop = computed(() => this.breakpointService.isDesktop);

  readonly userName = 'Emmett Brown'; // à remplacer plus tard
  readonly avatarUrl: string | null = null;

  @ViewChild('dropdownBtn', { static: true })
  dropdownBtn!: ElementRef<HTMLButtonElement>;

  profileImage(): string {
    return this.avatarUrl || 'assets/images/default-user.svg';
  }

  toggle() {
    this.isOpen.set(!this.isOpen());
  }

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/']);
  }

  isAdmin(): boolean {
    const role = this.authService.userRole();
    if (typeof role === 'string' && role === 'ROLE_ADMIN') return true;
    return false;
  }

  //gérer le click hors dropdown pour le fermer
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.isOpen.set(false);
    }
  }

  // Gestion clavier sur le bouton du dropdown
  onDropdownBtnKeydown(event: KeyboardEvent) {
    if (!this.isOpen()) {
      if (event.key === 'Enter' || event.key === 'ArrowDown') {
        event.preventDefault();
        this.isOpen.set(true);
        setTimeout(() => {
          const dropdown = document.querySelector('.dropdown-menu');
          if (dropdown) {
            const items = dropdown.querySelectorAll(
              '[role="menuitem"]:not([disabled])'
            );
            if (items.length > 0) {
              (items[0] as HTMLElement).focus();
            }
          }
        });
      }
    }
  }

  // Navigation clavier dans le menu ouvert
  handleKeydown(event: KeyboardEvent) {
    const dropdown = document.getElementById('dropdown-menu');
    if (!dropdown) return;

    const items = Array.from(
      dropdown.querySelectorAll('[role="menuitem"]:not([disabled])')
    ) as HTMLElement[];
    if (items.length === 0) return;

    const currentIndex = items.findIndex((el) => el === document.activeElement);

    // Navigation
    if (event.key === 'ArrowDown' || (event.key === 'Tab' && !event.shiftKey)) {
      event.preventDefault();
      const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      items[nextIndex].focus();
      return;
    }
    if (event.key === 'ArrowUp' || (event.key === 'Tab' && event.shiftKey)) {
      event.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      items[prevIndex].focus();
      return;
    }
    // Validation action
    if (
      event.key === 'Enter' ||
      event.key === ' ' // espace
    ) {
      event.preventDefault();
      const focused = items[currentIndex];
      if (focused) {
        // Si c'est un <a>, déclenche le click
        const link = focused.querySelector('a');
        if (link) {
          link.click();
        }
        // Si c'est un <button>, déclenche le click
        const btn = focused.querySelector('button');
        if (btn) {
          btn.click();
        }
      }
      return;
    }
    // Escape pour fermer
    if (event.key === 'Escape') {
      this.isOpen.set(false);
      setTimeout(() => {
        this.dropdownBtn?.nativeElement.focus();
      });
    }
  }
}
