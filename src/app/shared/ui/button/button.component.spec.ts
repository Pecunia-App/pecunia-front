import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Button properties', () => {
    it('should set button type correctly', () => {
      component.type = 'submit';
      fixture.detectChanges();
      expect(buttonElement.type).toBe('submit');
    });

    it('should set disabled state correctly', () => {
      component.disabled = true;
      fixture.detectChanges();
      expect(buttonElement.disabled).toBeTrue();
    });

    it('should set aria-label correctly', () => {
      component.ariaLabel = 'Test Button';
      fixture.detectChanges();
      expect(buttonElement.getAttribute('aria-label')).toBe('Test Button');
    });
  });

  describe('CSS Classes', () => {
    it('should apply primary variant class by default', () => {
      fixture.detectChanges();
      expect(buttonElement.classList.contains('ui-btn--primary')).toBeTrue();
    });

    it('should apply correct variant class when changed', () => {
      component.variant = 'secondary';
      fixture.detectChanges();
      expect(buttonElement.classList.contains('ui-btn--secondary')).toBeTrue();

      component.variant = 'primary-ghost';
      fixture.detectChanges();
      expect(
        buttonElement.classList.contains('ui-btn--primary-ghost')
      ).toBeTrue();
    });

    it('should apply size class correctly', () => {
      component.size = 'large';
      fixture.detectChanges();
      expect(
        buttonElement.classList.contains('ui-btn--size--large')
      ).toBeTrue();
    });

    it('should apply radius class correctly', () => {
      component.radius = 'large';
      fixture.detectChanges();
      expect(
        buttonElement.classList.contains('ui-btn--pill--large')
      ).toBeTrue();
    });

    it('should apply width class correctly', () => {
      component.width = 'full';
      fixture.detectChanges();
      expect(buttonElement.classList.contains('ui-btn--full')).toBeTrue();
    });

    it('should apply focused class when focused', () => {
      component.handleFocus();
      fixture.detectChanges();
      expect(buttonElement.classList.contains('ui-btn--focus')).toBeTrue();

      component.handleBlur();
      fixture.detectChanges();
      expect(buttonElement.classList.contains('ui-btn--focus')).toBeFalse();
    });
  });

  describe('Event handling', () => {
    it('should emit click event when clicked', () => {
      spyOn(component.buttonClick, 'emit');
      buttonElement.click();
      expect(component.buttonClick.emit).toHaveBeenCalled();
    });

    it('should not emit click event when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      spyOn(component.buttonClick, 'emit');
      buttonElement.click();
      expect(component.buttonClick.emit).not.toHaveBeenCalled();
    });
  });
});
