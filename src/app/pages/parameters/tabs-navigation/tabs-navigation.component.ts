import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ParametersTabs } from '../parameters.component';

export interface Tab {
  tabParams: ParametersTabs;
  label: string;
}

@Component({
  selector: 'app-tabs-navigation',
  imports: [CommonModule],
  templateUrl: './tabs-navigation.component.html',
  styleUrl: './tabs-navigation.component.scss',
})
export class TabsNavigationComponent {
  // Signals
  tabsSignal = signal<Tab[]>([]);
  activeTabIdSignal = signal<string>('');

  // Input setters
  @Input() set tabs(value: Tab[]) {
    this.tabsSignal.set(value);
  }

  @Input() set activeTabId(value: string) {
    this.activeTabIdSignal.set(value);
  }

  @Input() ariaLabel = 'Navigation';

  // Output pour le parent
  @Output() tabChange = new EventEmitter<ParametersTabs>();

  // Fonction ou getter pour le template @for
  get tabsList() {
    return this.tabsSignal();
  }

  // Méthode pour émettre le changement de tab
  onTabChange(tabParams: ParametersTabs) {
    this.tabChange.emit(tabParams);
  }
}
