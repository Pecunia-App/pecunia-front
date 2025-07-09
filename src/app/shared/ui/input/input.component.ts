import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
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

@Component({
  selector: 'app-ui-input',
  imports: [NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
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
  //formulaire
  readonly _name = signal<string | null>(null);
  readonly _id = signal<string | null>(null);
  //gestion focus
  readonly _isFocused = signal<boolean>(false);

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
  @Input() set name(value: string | null) {
    this._name.set(value ?? null);
  }
  @Input() set id(value: string | null) {
    this._id.set(value ?? null);
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

  handleOnChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this._value.set(inputElement.value);
    this.InputValueChange.emit(inputElement.value);
  }
  handleOnBlur(event: Event) {
    this._isFocused.set(false);
    this.inputBlur.emit(event);
  }
  HandleOnFocus(event: Event) {
    this._isFocused.set(true);
    this.inputFocus.emit(event);
  }
}
