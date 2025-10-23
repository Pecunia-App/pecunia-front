import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryModalComponent } from './create-category-modal.component';
import { provideHttpClient } from '@angular/common/http';

describe('CreateCategoryModalComponent', () => {
  let component: CreateCategoryModalComponent;
  let fixture: ComponentFixture<CreateCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCategoryModalComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
