import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedLayoutComponent } from './connected-layout.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('ConnectedLayoutComponent', () => {
  let component: ConnectedLayoutComponent;
  let fixture: ComponentFixture<ConnectedLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectedLayoutComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
