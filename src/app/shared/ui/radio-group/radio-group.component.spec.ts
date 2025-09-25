import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioGroupComponent } from './radio-group.component';

describe('RadioGroupComponent', () => {
  let component: RadioGroupComponent;
  let fixture: ComponentFixture<RadioGroupComponent<string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioGroupComponent<string>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the legend if provided', () => {
    component.legend = 'Sélectionnez une devise';
    fixture.detectChanges();

    const legendEl: HTMLElement | null =
      fixture.nativeElement.querySelector('legend');
    expect(legendEl?.textContent).toContain('Sélectionnez une devise');
  });

  it('should render all options', () => {
    component.options = [
      { label: 'Euro', value: 'EUR' },
      { label: 'Dollar', value: 'USD' },
    ];
    fixture.detectChanges();

    const labels = fixture.nativeElement.querySelectorAll('.radio-option');
    expect(labels.length).toBe(2);
    expect(labels[0].textContent).toContain('Euro');
    expect(labels[1].textContent).toContain('Dollar');
  });

  it('should emit valueChange when an option is selected', () => {
    component.options = [
      { label: 'Euro', value: 'EUR' },
      { label: 'Dollar', value: 'USD' },
    ];
    fixture.detectChanges();

    spyOn(component.valueChange, 'emit');

    const inputs: NodeListOf<HTMLInputElement> =
      fixture.nativeElement.querySelectorAll('input[type="radio"]');
    inputs[1].click();

    fixture.detectChanges();

    expect(component.value).toBe('USD');
    expect(component.valueChange.emit).toHaveBeenCalledWith('USD');
  });

  it('should disable all radios if disabled is true', () => {
    component.options = [
      { label: 'Euro', value: 'EUR' },
      { label: 'Dollar', value: 'USD' },
    ];
    component.disabled = true;
    fixture.detectChanges();

    const inputs: NodeListOf<HTMLInputElement> =
      fixture.nativeElement.querySelectorAll('input[type="radio"]');
    expect(inputs[0].disabled).toBeTrue();
    expect(inputs[1].disabled).toBeTrue();
  });
});
