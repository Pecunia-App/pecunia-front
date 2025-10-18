import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-ui-checkbox',
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() disabled = false;
  @Input() checked = false;
  readonly focused = signal(false);
  @Output() changed = new EventEmitter<boolean>();

  // ControlValueAccessor implementation
  private onChange: (value: boolean) => void = () => {
    /* intentionally empty */
  };
  private onTouched: () => void = () => {
    /* intentionally empty */
  };

  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();
    this.changed.emit(this.checked);
  }

  get classes() {
    return {
      'ui-checkbox--checked': this.checked,
      'ui-checkbox--disabled': this.disabled,
      'ui-checkbox--focus': this.focused(),
    };
  }

  onFocus(): void {
    this.focused.set(true);
  }

  onBlur(): void {
    this.focused.set(false);
  }
}
