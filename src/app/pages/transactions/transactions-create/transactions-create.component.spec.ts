import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsCreateComponent } from './transactions-create.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('TransactionsCreateComponent', () => {
  let component: TransactionsCreateComponent;
  let fixture: ComponentFixture<TransactionsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsCreateComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
