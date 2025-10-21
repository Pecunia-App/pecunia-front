import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEntityModalComponent } from './create-entity-modal.component';

describe('CreateProviderModalComponent', () => {
  let component: CreateEntityModalComponent;
  let fixture: ComponentFixture<CreateEntityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEntityModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEntityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
