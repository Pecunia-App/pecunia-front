import { Component, signal } from '@angular/core';
import { ConnectedLayoutComponent } from '../../shared/layout/connected-layout/connected-layout.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/ui/icon/icon.component';

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  selected: boolean;
}

type Parameters = 'categories' | 'tags' | 'providers';

@Component({
  selector: 'app-parameters',
  imports: [ConnectedLayoutComponent, CommonModule, IconComponent],
  templateUrl: './parameters.component.html',
  styleUrl: './parameters.component.scss',
})
export class ParametersComponent {
  activeTab = signal<Parameters>('categories');

  incomeCategories = signal<Category[]>([
    {
      id: 1,
      name: 'Autres',
      icon: 'circle-question-mark',
      color: '#6B7280',
      selected: false,
    },
    { id: 2, name: 'Cadeaux', icon: 'gift', color: '#10B981', selected: false },
    {
      id: 3,
      name: 'Congé parental',
      icon: 'baby',
      color: '#EC4899',
      selected: false,
    },
    {
      id: 4,
      name: 'Entreprise',
      icon: 'briefcase-business',
      color: '#F59E0B',
      selected: false,
    },
    {
      id: 5,
      name: 'Prêt',
      icon: 'landmark',
      color: '#EF4444',
      selected: false,
    },
    {
      id: 6,
      name: "Remboursement d'assurances",
      icon: 'shield-ban',
      color: '#F97316',
      selected: false,
    },
    {
      id: 7,
      name: 'Revenus supplémentaires',
      icon: 'plus',
      color: '#3B82F6',
      selected: false,
    },
    {
      id: 8,
      name: 'Salaire',
      icon: 'banknote',
      color: '#8B5CF6',
      selected: false,
    },
  ]);
  expenseCategories = signal<Category[]>([
    {
      id: 9,
      name: 'Alimentation',
      icon: 'utensils-crossed',
      color: '#10B981',
      selected: false,
    },
    {
      id: 10,
      name: 'Logement',
      icon: 'house',
      color: '#3B82F6',
      selected: false,
    },
    {
      id: 11,
      name: 'Transport',
      icon: 'car',
      color: '#F59E0B',
      selected: false,
    },
    {
      id: 12,
      name: 'Loisirs',
      icon: 'gamepad-2',
      color: '#EC4899',
      selected: false,
    },
  ]);

  setActiveTab(tab: Parameters) {
    this.activeTab.set(tab);
  }
  toggleCategorySelection(categoryId: number, isIncome: boolean) {
    if (isIncome) {
      this.incomeCategories.update((cats) =>
        cats.map((cat) =>
          cat.id === categoryId ? { ...cat, selected: !cat.selected } : cat
        )
      );
    } else {
      this.expenseCategories.update((cats) =>
        cats.map((cat) =>
          cat.id === categoryId ? { ...cat, selected: !cat.selected } : cat
        )
      );
    }
  }

  toggleAllCategories(isIncome: boolean) {
    const categories = isIncome
      ? this.incomeCategories()
      : this.expenseCategories();
    const allSelected = categories.every((cat) => cat.selected);

    if (isIncome) {
      this.incomeCategories.update((cats) =>
        cats.map((cat) => ({ ...cat, selected: !allSelected }))
      );
    } else {
      this.expenseCategories.update((cats) =>
        cats.map((cat) => ({ ...cat, selected: !allSelected }))
      );
    }
  }

  createCategory() {
    console.log('Create category');
    // Implement category creation logic
  }

  deleteSelectedCategories() {
    console.log('Delete selected categories');
    // Implement deletion logic
  }

  editCategory(categoryId: number) {
    console.log('Edit category:', categoryId);
    // Implement edit logic
  }

  deleteCategory(categoryId: number) {
    console.log('Delete category:', categoryId);
    // Implement delete logic
  }

  hasSelectedCategories(): boolean {
    return (
      this.incomeCategories().some((cat) => cat.selected) ||
      this.expenseCategories().some((cat) => cat.selected)
    );
  }
}
