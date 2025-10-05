import { Component, computed, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-badge',
  imports: [IconComponent, CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  @Input() bgColorClass?: string; // ex: 'background-badge-green-low'
  @Input() iconName!: string;
  @Input() iconSize: 'sm' | 'md' | 'lg' = 'md';
  @Input() ariaLabel?: string;

  readonly cssClasses = computed(() =>
    ['ui-badge', this.bgColorClass].filter(Boolean)
  );
}
