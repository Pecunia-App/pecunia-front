import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  signal,
} from '@angular/core';
import {
  inputMaxWidth,
  inputMinWidth,
  inputType,
  inputStatus,
  inputWidth,
} from './input.model';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-ui-input',
  imports: [NgClass, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  // ControlValueAccessor implementation
  private onChange: (value: string | number) => void = () => {
    /* intentionally empty */
  };
  private onTouched: () => void = () => {
    /* intentionally empty */
  };

  readonly _type = signal<inputType>('text');
  readonly _status = signal<inputStatus>(null);
  readonly _label = signal<string>('');
  readonly _placeholder = signal<string>('');
  readonly _value = signal<string>('');
  readonly _helper = signal<string>('');
  //css
  readonly _overideClass = signal<string>('');
  readonly _width = signal<inputWidth>('auto');
  readonly _minWidth = signal<inputMinWidth>(null);
  readonly _maxWidth = signal<inputMaxWidth>(null);
  //accessibilité
  readonly _ariaLabel = signal<string | null>(null);
  readonly _ariaDescribedBy = signal<string | null>(null);
  readonly _required = signal<boolean>(false);
  readonly _disabled = signal<boolean>(false);
  readonly _readonly = signal<boolean>(false);
  //formulaire
  readonly _name = signal<string | null>(null);
  readonly _id = signal<string | null>(null);
  //gestion focus
  readonly _isFocused = signal<boolean>(false);
  //gestion readonly mais cliquable
  readonly _openable = signal<boolean>(false);

  @Output() InputValueChange = new EventEmitter<string>();
  @Output() inputBlur = new EventEmitter<Event>();
  @Output() inputFocus = new EventEmitter<Event>();

  // Setters
  @Input() set type(value: inputType) {
    this._type.set(value ?? 'text');
  }
  @Input() set status(value: inputStatus) {
    this._status.set(value ?? null);
  }
  @Input() set label(value: string) {
    this._label.set(value ?? '');
  }
  @Input() set placeholder(value: string) {
    this._placeholder.set(value ?? '');
  }
  @Input() set value(value: string) {
    this._value.set(value ?? '');
  }
  @Input() set helper(value: string) {
    this._helper.set(value ?? '');
  }
  @Input() set overideClass(value: string) {
    this._overideClass.set(value ?? '');
  }
  @Input() set width(value: inputWidth) {
    this._width.set(value ?? 'auto');
  }
  @Input() set minWidth(value: inputMinWidth) {
    this._minWidth.set(value ?? null);
  }
  @Input() set maxWidth(value: inputMaxWidth) {
    this._maxWidth.set(value ?? null);
  }
  @Input() set ariaLabel(value: string | null) {
    this._ariaLabel.set(value ?? null);
  }

  @Input() set ariaDescribedBy(value: string | null) {
    this._ariaDescribedBy.set(value ?? null);
  }
  @Input() set required(value: boolean) {
    this._required.set(value ?? false);
  }
  @Input() set disabled(value: boolean) {
    this._disabled.set(value ?? false);
  }
  @Input() set readonly(value: boolean) {
    this._readonly.set(value ?? false);
  }
  @Input() set name(value: string | null) {
    this._name.set(value ?? null);
  }
  @Input() set id(value: string | null) {
    this._id.set(value ?? null);
  }
  @Input() set openable(value: boolean) {
    this._openable.set(value ?? false);
  }

  // Getters
  readonly cssClasses = computed(() =>
    [
      'ui-input',
      this._status() ? `ui-input--${this._status()}` : '',
      this._isFocused() ? 'ui-input--focus' : '',
      this._overideClass(),
    ]
      .filter(Boolean)
      .join(' ')
  );

  // pour passer les valeurs aux formulaires avec ReactiveForms et controlValueAccessor
  writeValue(value: string): void {
    this._value.set(value ?? '');
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

  sanitizeNumericInput(event: Event): string {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value ?? '';

    // Remplace la virgule par un point
    value = value.replace(',', '.');

    // Autoriser uniquement les chiffres positifs et un seul point
    value = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');

    // Interdire de commencer par un point
    if (value.startsWith('.')) {
      value = '';
    }

    // Limiter à 2 décimales max
    const match = value.match(/^\d+(\.\d{0,2})?/);
    value = match ? match[0] : '';

    // Réinjecte la valeur nettoyée
    return (inputElement.value = value);
  }

  // Handlers
  handleOnChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (this._type() === 'number') {
      this.sanitizeNumericInput(event);
    }
    this._value.set(inputElement.value);
    this.InputValueChange.emit(inputElement.value);
    this.onChange(inputElement.value);
  }
  handleOnBlur(event: Event) {
    this._isFocused.set(false);
    this.inputBlur.emit(event);
    this.onTouched();
  }
  HandleOnFocus(event: Event) {
    this._isFocused.set(true);
    this.inputFocus.emit(event);
  }
}
