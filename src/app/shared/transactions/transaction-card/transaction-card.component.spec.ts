import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCardComponent } from './transaction-card.component';
import { MOCK_TRANSACTIONS_RESPONSE } from '../../../_core/mocks/mock-transactions';

describe('TransactionCardComponent', () => {
  let component: TransactionCardComponent;
  let fixture: ComponentFixture<TransactionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionCardComponent);
    component = fixture.componentInstance;
    component.transaction = MOCK_TRANSACTIONS_RESPONSE.content[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
