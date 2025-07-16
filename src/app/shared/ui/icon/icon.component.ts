import { NgClass } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import {
  AVAILABLE_ICONS,
  DEFAULT_ICON,
  IconName,
  IconSize,
} from './icon.model';

@Component({
  selector: 'app-ui-icon',
  standalone: true,
  imports: [NgClass],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  //déclaration des signaux => mini varialbles observables
  readonly _name = signal<IconName>(DEFAULT_ICON);
  readonly _size = signal<IconSize>('md');
  readonly _ariaLabel = signal<string>('');
  readonly _isDecorative = signal<boolean>(false);

  // Validation synchrone des icônes avec un guard TS
  private isValidIcon(iconName: string): iconName is IconName {
    return AVAILABLE_ICONS.includes(iconName as IconName);
  }

  //setter pour mettre à jour les inputs avec des signaux
  @Input({ required: true }) set name(value: string) {
    const validIcon = this.isValidIcon(value)
      ? (value as IconName)
      : DEFAULT_ICON;
    this._name.set(validIcon);
  }
  @Input() set size(value: IconSize) {
    this._size.set(value);
  }
  @Input() set ariaLabel(value: string) {
    this._ariaLabel.set(value);
  }
  @Input() set isDecorative(value: boolean) {
    this._isDecorative.set(value);
  }
  //getters pour les inputs pour récupérer les valeurs des signaux
  //computed permet d'écouter les signaux et de les utiliser comme des propriétés
  readonly iconPath = computed(() => `assets/icons/lucide/${this._name()}.svg`);

  readonly sizeClass = computed(() => `icon-size-${this._size()}`);

  readonly computedArialLabel = computed(() =>
    this._isDecorative() ? '' : this._ariaLabel() || this._name()
  );

  readonly maskImageUrl = computed(() => `url(${this.iconPath()})`);

  readonly cssClasses = computed(() => {
    const classes = ['icon', this.sizeClass()];
    return classes;
  });
}
