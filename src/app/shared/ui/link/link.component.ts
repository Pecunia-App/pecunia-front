import { NgClass } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LinkMaxWidth,
  LinkMinWidth,
  LinkVariant,
  LinkWidth,
} from './link.model';

@Component({
  selector: 'app-ui-link',
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
})
export class LinkComponent {
  readonly _routerLink = signal<string | string[] | null>(null);
  readonly _variant = signal<LinkVariant>('primary');
  readonly _width = signal<LinkWidth>('auto');
  readonly _minWidth = signal<LinkMinWidth>(null);
  readonly _maxWidth = signal<LinkMaxWidth>(null);
  readonly _ariaLabel = signal<string | null>(null);
  readonly _disabled = signal<boolean>(false);
  readonly _tabIndex = signal<number>(0);
  readonly _isSubMenu = signal<boolean>(false);
  readonly _isFooterMenu = signal<boolean>(false);

  // Focus state pour l'accessibilité/style
  readonly _isFocused = signal(false);

  @Input() set routerLink(value: string | string[] | null) {
    this._routerLink.set(value);
  }
  @Input() set variant(value: LinkVariant) {
    this._variant.set(value ?? 'primary');
  }
  @Input() set width(value: LinkWidth) {
    this._width.set(value ?? 'auto');
  }
  @Input() set minWidth(value: LinkMinWidth) {
    this._minWidth.set(value ?? null);
  }
  @Input() set maxWidth(value: LinkMaxWidth) {
    this._maxWidth.set(value ?? null);
  }
  @Input() set ariaLabel(value: string | null) {
    this._ariaLabel.set(value ?? null);
  }
  @Input() set disabled(value: boolean) {
    this._disabled.set(value ?? false);
  }
  @Input() set tabIndex(value: number) {
    this._tabIndex.set(value ?? 0);
  }
  @Input() set isSubmenu(value: boolean) {
    this._isSubMenu.set(value ?? false);
  }
  @Input() set isFooterMenu(value: boolean) {
    this._isFooterMenu.set(value ?? false);
  }

  readonly cssClasses = computed(() =>
    [
      'ui-link',
      `ui-link--${this._variant()}`,
      `ui-link--${this._width()}`,
      this._isSubMenu() ? 'ui-link--submenu' : '',
      this._isFooterMenu() ? 'ui-link--footer--menu' : '',
      this._disabled() ? 'ui-link--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  );

  handleFocus() {
    this._isFocused.set(true);
  }
  handleBlur() {
    this._isFocused.set(false);
  }
}
