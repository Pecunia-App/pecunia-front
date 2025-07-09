import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputElement = fixture.nativeElement.querySelector('input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {
    it('should set the input type', () => {
      component.type = 'password';
      fixture.detectChanges();
      expect(inputElement.type).toBe('password');
    });

    it('should display the provided label', () => {
      component.label = 'First name';
      fixture.detectChanges();
      const label = fixture.nativeElement.querySelector('.ui-input__label');
      expect(label.textContent).toContain('First name');
    });

    it('should set the placeholder correctly', () => {
      component.placeholder = 'Enter your email';
      fixture.detectChanges();
      expect(inputElement.placeholder).toBe('Enter your email');
    });

    it('should set minWidth and maxWidth styles', () => {
      component.minWidth = 120;
      component.maxWidth = 300;
      fixture.detectChanges();
      const wrapper = fixture.nativeElement.querySelector('.ui-input__wrapper');
      expect(wrapper.style.minWidth).toContain('120');
      expect(wrapper.style.maxWidth).toContain('300');
    });
  });

  it('should disable the input when [disabled]=true', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(inputElement.disabled).toBeTrue();
  });

  it('should set required attribute', () => {
    component.required = true;
    fixture.detectChanges();
    expect(inputElement.required).toBeTrue();
  });

  describe('CSS Classes', () => {
    it('should apply status class', () => {
      component.status = 'error';
      fixture.detectChanges();
      const wrapper = fixture.nativeElement.querySelector(
        '.ui-input__field-group'
      );
      expect(wrapper.className).toContain('ui-input--error');
    });

    it('should apply focus class when focused', () => {
      inputElement.dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      const wrapper = fixture.nativeElement.querySelector(
        '.ui-input__field-group'
      );
      expect(wrapper.className).toContain('ui-input--focus');
    });

    it('should apply custom override class', () => {
      component.overideClass = 'my-custom-class';
      fixture.detectChanges();
      const wrapper = fixture.nativeElement.querySelector(
        '.ui-input__field-group'
      );
      expect(wrapper.className).toContain('my-custom-class');
    });
  });

  describe('Behavior', () => {
    it('should emit InputValueChange on input', () => {
      spyOn(component.InputValueChange, 'emit');
      inputElement.value = 'hello';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.InputValueChange.emit).toHaveBeenCalledWith('hello');
    });

    it('should emit inputFocus on focus', () => {
      spyOn(component.inputFocus, 'emit');
      inputElement.dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      expect(component.inputFocus.emit).toHaveBeenCalled();
    });

    it('should emit inputBlur on blur', () => {
      spyOn(component.inputBlur, 'emit');
      inputElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(component.inputBlur.emit).toHaveBeenCalled();
    });
  });
});
