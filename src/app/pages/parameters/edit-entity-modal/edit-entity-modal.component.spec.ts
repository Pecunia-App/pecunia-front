import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntityModalComponent } from './edit-entity-modal.component';

describe('EditEntityModalComponent', () => {
  let component: EditEntityModalComponent;
  let fixture: ComponentFixture<EditEntityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEntityModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditEntityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
