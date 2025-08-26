import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocBoutonComponent } from './poc-bouton.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('PocBoutonComponent', () => {
  let component: PocBoutonComponent;
  let fixture: ComponentFixture<PocBoutonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocBoutonComponent],
      providers: [
        provideHttpClient(withFetch()),
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PocBoutonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
