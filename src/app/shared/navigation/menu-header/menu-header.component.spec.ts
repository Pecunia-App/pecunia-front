import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHeaderComponent } from './menu-header.component';
import { provideRouter } from '@angular/router';

describe('MenuHeaderComponent', () => {
  let component: MenuHeaderComponent;
  let fixture: ComponentFixture<MenuHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuHeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
