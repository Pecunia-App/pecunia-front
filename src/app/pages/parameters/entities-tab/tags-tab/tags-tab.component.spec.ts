import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsTabComponent } from './tags-tab.component';
import { provideHttpClient } from '@angular/common/http';

describe('TagsTabComponent', () => {
  let component: TagsTabComponent;
  let fixture: ComponentFixture<TagsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsTabComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
