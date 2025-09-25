import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RadioOption } from '../../../_core/models/radio-option.model';
import { ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
  imports: [CommonModule],
})
export class RadioGroupComponent<T = string> implements ControlValueAccessor {
  @Input() legend?: string;
  @Input() name!: string;
  @Input() options: RadioOption<T>[] = [];
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<T>();

  value!: T;

  private onChange: ((value: T) => void) | null = null;
  private onTouched: (() => void) | null = null;

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectValue(value: T): void {
    if (this.disabled) return;

    this.value = value;
    if (this.onChange) {
      this.onChange(value);
    }
    if (this.onTouched) {
      this.onTouched();
    }
    this.valueChange.emit(value);
  }
}
