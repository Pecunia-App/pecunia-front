import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHeaderDropdownComponent } from './menu-header-dropdown.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('MenuHeaderDropdownComponent', () => {
  let component: MenuHeaderDropdownComponent;
  let fixture: ComponentFixture<MenuHeaderDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuHeaderDropdownComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuHeaderDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
