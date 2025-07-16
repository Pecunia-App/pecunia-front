import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { By } from '@angular/platform-browser';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  it('should render icon path correctly', () => {
    component.name = 'arrow-left';
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('span.icon'))
      .nativeElement as HTMLSpanElement;
    expect(span.style.maskImage).toContain('arrow-left.svg');
  });

  it('should apply correct size class', () => {
    component.name = 'plus';
    component.size = 'lg';
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span.icon'));
    expect(span.classes['icon-size-lg']).toBeTrue();
  });

  it('should fallback to "plus" if icon does not exist', async () => {
    component.name = 'not-a-real-icon';
    fixture.detectChanges();

    await fixture.whenStable();

    expect(component._name()).toBe('plus');
  });
});
