import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersTabComponent } from './providers-tab.component';
import { provideHttpClient } from '@angular/common/http';

describe('ProvidersTabComponent', () => {
  let component: ProvidersTabComponent;
  let fixture: ComponentFixture<ProvidersTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvidersTabComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProvidersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
