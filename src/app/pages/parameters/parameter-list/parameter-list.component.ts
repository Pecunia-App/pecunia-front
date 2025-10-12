import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  Signal,
} from '@angular/core';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { CheckboxComponent } from '../../../shared/ui/checkbox/checkbox.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

export interface Displayable {
  id: number;
}

export interface DisplayInfo {
  name: string;
  icon?: string;
  color?: string;
}

export interface ParameterSection<T extends Displayable> {
  title: string;
  prefix: string;
  items: Signal<T[]>;
}

@Component({
  selector: 'app-parameter-list',
  imports: [CommonModule, IconComponent, CheckboxComponent, ButtonComponent],
  templateUrl: './parameter-list.component.html',
  styleUrl: './parameter-list.component.scss',
})
export class ParameterListComponent<T extends Displayable> {
  readonly sections = input<ParameterSection<T>[]>([]);
  @Input() prefix = 'parameter';
  @Input() isSelected!: (id: number, prefix: string) => boolean;

  // fonction typée pour mapper un item à DisplayInfo
  @Input() getDisplayInfo!: (item: T) => DisplayInfo;

  @Output() toggleItem = new EventEmitter<number>();
  @Output() editItem = new EventEmitter<number>();
  @Output() deleteItem = new EventEmitter<number>();
}
