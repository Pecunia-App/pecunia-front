import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsUpdateComponent } from './transactions-update.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('TransactionsUpdateComponent', () => {
  let component: TransactionsUpdateComponent;
  let fixture: ComponentFixture<TransactionsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsUpdateComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
