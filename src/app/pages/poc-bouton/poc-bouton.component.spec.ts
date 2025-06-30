import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocBoutonComponent } from './poc-bouton.component';
import { provideHttpClient } from '@angular/common/http';

describe('PocBoutonComponent', () => {
  let component: PocBoutonComponent;
  let fixture: ComponentFixture<PocBoutonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocBoutonComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(PocBoutonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
