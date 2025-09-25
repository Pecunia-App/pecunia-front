import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFooterComponent } from './menu-footer.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('MenuFooterComponent', () => {
  let component: MenuFooterComponent;
  let fixture: ComponentFixture<MenuFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuFooterComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
