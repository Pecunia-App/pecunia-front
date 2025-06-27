import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  computed,
  effect,
  inject,
  Input,
  signal,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IconSize } from './icon.model';

@Component({
  selector: 'app-ui-icon',
  standalone: true,
  imports: [NgClass],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  private readonly http = inject(HttpClient);

  //déclaration des signaux => mini varialbles observables
  readonly _name = signal<string>('');
  readonly _size = signal<IconSize>('md');
  readonly _ariaLabel = signal<string>('');
  readonly _isDecorative = signal<boolean>(false);

  //setter pour mettre à jour les inputs avec des signaux
  @Input({ required: true }) set name(value: string) {
    this._name.set(value);
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

  // Méthode pour gérer l'erreur de chargement de l'icône
  constructor() {
    effect(() => {
      const iconName = this._name();
      this.checkIfIconExists(iconName).then((exists) => {
        if (!exists) {
          console.warn(
            `Icône "${iconName}" introuvable, fallback "plus" appliqué.`
          );
          this._name.set('plus');
        }
      });
    });
  }

  private async checkIfIconExists(iconName: string): Promise<boolean> {
    const url = `assets/icons/lucide/${iconName}.svg`;
    try {
      await firstValueFrom(this.http.head(url, { observe: 'response' }));
      return true;
    } catch {
      return false;
    }
  }
}
