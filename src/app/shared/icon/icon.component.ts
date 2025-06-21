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

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgClass],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  private readonly http = inject(HttpClient);

  //déclaration des signaux => mini varialbles observables
  readonly name = signal<string>('');
  readonly size = signal<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly alt = signal<string>('');
  readonly decorative = signal<boolean>(false);

  //setter pour mettre à jour les inputs avec des signaux
  @Input({ required: true }) set setName(value: string) {
    this.name.set(value);
  }

  @Input() set setSize(value: 'xs' | 'sm' | 'md' | 'lg') {
    this.size.set(value);
  }

  @Input() set setAlt(value: string) {
    this.alt.set(value);
  }

  @Input() set setDecorative(value: boolean) {
    this.decorative.set(value);
  }

  //getters pour les inputs pour récupérer les valeurs des signaux
  //computed permet d'écouter les signaux et de les utiliser comme des propriétés
  readonly iconPath = computed(() => `assets/icons/lucide/${this.name()}.svg`);

  readonly sizeClass = computed(() => `icon-size-${this.size()}`);

  readonly computedAlt = computed(() =>
    this.decorative() ? '' : this.alt() || this.name()
  );

  readonly maskImageUrl = computed(() => `url(${this.iconPath()})`);

  readonly cssClasses = computed(() => {
    const classes = ['icon', this.sizeClass()];
    return classes;
  });

  // Méthode pour gérer l'erreur de chargement de l'icône
  constructor() {
    effect(() => {
      const iconName = this.name();
      this.checkIfIconExists(iconName).then((exists) => {
        if (!exists) {
          console.warn(
            `Icône "${iconName}" introuvable, fallback "plus" appliqué.`
          );
          this.name.set('plus');
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
