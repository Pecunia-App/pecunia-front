import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ParameterListComponent,
  ParameterSection,
  Displayable,
  DisplayInfo,
} from './parameter-list.component';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { CheckboxComponent } from '../../../shared/ui/checkbox/checkbox.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { BadgeColorValue } from '../../../_core/models/transactions/category.dto';
import { IconName } from '../../../shared/ui/icon/icon.model';

interface TestItem extends Displayable {
  name: string;
  icon?: IconName;
  color?: BadgeColorValue;
}

@Component({
  imports: [ParameterListComponent],
  template: `
    <app-parameter-list
      [sections]="sections"
      [prefix]="'test'"
      [isSelected]="isSelected"
      [getDisplayInfo]="getDisplayInfo"
    ></app-parameter-list>
  `,
})
class TestHostComponent {
  items: TestItem[] = [
    {
      id: 1,
      name: 'Item 1',
      icon: 'landmark',
      color: 'background-badge-blue-low',
    },
    {
      id: 2,
      name: 'Item 2',
      icon: 'factory',
      color: 'background-badge-orange-low',
    },
  ];

  sections: ParameterSection<TestItem>[] = [
    {
      title: 'Test Section',
      prefix: 'test',
      items: signal(this.items),
    },
  ];

  isSelected = () => false;

  getDisplayInfo = (item: TestItem): DisplayInfo => ({
    name: item.name,
    icon: item.icon,
    color: item.color,
  });
}

describe('ParameterListComponent<T>', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let component: ParameterListComponent<TestItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ParameterListComponent, // standalone
        IconComponent,
        CheckboxComponent,
        ButtonComponent,
        CommonModule,
        TestHostComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    // récupérer l'instance du composant générique
    component = fixture.debugElement.children[0].componentInstance;
  });

  it('should create ParameterListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have one section with two items', () => {
    const sections = component.sections();
    expect(sections.length).toBe(1);
    expect(sections[0].items()!.length).toBe(2);
    expect(sections[0].items()![0].id).toBe(1);
    expect(sections[0].items()![1].name).toBe('Item 2');
  });

  it('should provide correct display info', () => {
    const info = component.getDisplayInfo(host.items[0]);
    expect(info.name).toBe('Item 1');
    expect(info.icon).toBe('landmark');
    expect(info.color).toBe('background-badge-blue-low');
  });
});
