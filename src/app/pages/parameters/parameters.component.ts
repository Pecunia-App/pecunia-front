import { Component, inject, OnInit, signal } from '@angular/core';
import { ConnectedLayoutComponent } from '../../shared/layout/connected-layout/connected-layout.component';
import { CommonModule } from '@angular/common';
import {
  Tab,
  TabsNavigationComponent,
} from './tabs-navigation/tabs-navigation.component';
import { UserStoreService } from '../../_core/store/user.store.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TagsTabComponent } from './tags-tab/tags-tab.component';
import { ProvidersTabComponent } from './providers-tab/providers-tab.component';
import { CategoriesTabComponent } from './categories-tab/categories-tab.component';
export type ParametersTabs = 'categories' | 'tags' | 'providers';

@Component({
  selector: 'app-parameters',
  imports: [
    ConnectedLayoutComponent,
    CommonModule,
    TabsNavigationComponent,
    NzModalModule,
    NzButtonModule,
    TagsTabComponent,
    ProvidersTabComponent,
    CategoriesTabComponent,
  ],
  templateUrl: './parameters.component.html',
  styleUrl: './parameters.component.scss',
})
export class ParametersComponent implements OnInit {
  private readonly userStore = inject(UserStoreService);

  activeTab = signal<ParametersTabs>('categories');

  tabs: Tab[] = [
    { tabParams: 'categories', label: 'Catégories' },
    { tabParams: 'tags', label: 'Tags' },
    { tabParams: 'providers', label: 'Fournisseurs' },
  ];

  ngOnInit() {
    this.userStore.loadUser();
  }
  get currentUserId(): number | null {
    return this.userStore.user()?.id ?? null;
  }
  setActiveTab(tab: ParametersTabs): void {
    this.activeTab.set(tab);
  }
}
