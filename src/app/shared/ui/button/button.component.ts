import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  ButtonMaxWidth,
  ButtonMinWidth,
  ButtonRadius,
  ButtonSize,
  ButtonType,
  ButtonWidth,
  VariantType,
} from './button.model';

@Component({
  selector: 'app-ui-button',
  imports: [NgClass, NzButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
})
export class ButtonComponent {
  // Déclaration des signaux pour les propriétés du bouton
  readonly _type = signal<ButtonType>('button');
  readonly _disabled = signal<boolean>(false);
  readonly _ariaLabel = signal<string>('');
  readonly _overideClass = signal<string>('');
  readonly _variant = signal<VariantType>('primary');
  readonly _size = signal<ButtonSize>('medium');
  readonly _radius = signal<ButtonRadius>('medium');
  readonly _width = signal<ButtonWidth>('auto');
  readonly _minWidth = signal<ButtonMinWidth>(null);
  readonly _maxWidth = signal<ButtonMaxWidth>(null);

  // Signal pour gérer le focus du bouton
  //usage interne donc pas de @Input
  readonly _focused = signal<boolean>(false);

  @Output() buttonClick = new EventEmitter<Event>();

  // Setters pour mettre à jour les signaux
  @Input() set type(value: ButtonType) {
    this._type.set(value ?? 'button');
  }
  @Input() set disabled(value: boolean) {
    this._disabled.set(value);
  }
  @Input() set ariaLabel(value: string) {
    this._ariaLabel.set(value);
  }
  @Input() set variant(value: VariantType) {
    this._variant.set(value ?? 'primary');
  }
  @Input() set overideClass(value: string) {
    this._overideClass.set(value ?? '');
  }
  @Input() set size(value: ButtonSize) {
    this._size.set(value ?? 'medium');
  }
  @Input() set radius(value: ButtonRadius) {
    this._radius.set(value ?? 'medium');
  }
  @Input() set width(value: ButtonWidth) {
    this._width.set(value ?? 'auto');
  }
  @Input() set minWidth(value: ButtonMinWidth) {
    this._minWidth.set(value);
  }
  @Input() set maxWidth(value: ButtonMaxWidth) {
    this._maxWidth.set(value);
  }
  @Input() nzType: 'primary' | 'default' | 'dashed' | 'text' | 'link' | null =
    'default';

  // Getters pour récupérer les valeurs des signaux
  //computed permet d'écouter les signaux et de les utiliser comme des propriétés
  readonly cssClasses = computed(() =>
    [
      'ui-btn',
      `ui-btn--${this._variant()}`,
      `ui-btn--size--${this._size()}`,
      `ui-btn--pill--${this._radius()}`,
      `ui-btn--${this._width()}`,
      this._disabled() ? 'ui-btn--disabled' : '',
      this._focused() ? 'ui-btn--focus' : '',
      this._overideClass(),
    ]
      .filter(Boolean)
      .join(' ')
  );

  readonly btnType = computed(() => this._type());

  readonly isDisabled = computed(() => this._disabled());

  readonly btnAriaLabel = computed(() => this._ariaLabel());

  handleClick(event: Event) {
    if (!this.disabled) this.buttonClick.emit(event);
  }

  handleFocus() {
    this._focused.set(true);
  }

  handleBlur() {
    this._focused.set(false);
  }
}
