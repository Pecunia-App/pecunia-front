import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkComponent } from './link.component';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  template: '<div>Mock page</div>',
  standalone: true,
})
class MockPageComponent {}

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let linkElement: HTMLAnchorElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkComponent, MockPageComponent],
      providers: [
        provideRouter([
          { path: 'register', component: MockPageComponent },
          { path: '', component: MockPageComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    linkElement = fixture.debugElement.query(By.css('a')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Link properties', () => {
    it('should set variant class correctly', () => {
      component.variant = 'alert';
      fixture.detectChanges();
      expect(linkElement.classList.contains('ui-link--alert')).toBeTrue();

      component.variant = 'primary';
      fixture.detectChanges();
      expect(linkElement.classList.contains('ui-link--primary')).toBeTrue();
    });

    it('should set width class correctly', () => {
      component.width = 'full';
      fixture.detectChanges();
      expect(linkElement.classList.contains('ui-link--full')).toBeTrue();

      component.width = 'auto';
      fixture.detectChanges();
      expect(linkElement.classList.contains('ui-link--auto')).toBeTrue();
    });

    it('should set aria-label correctly', () => {
      component.ariaLabel = 'Mot de passe oublié';
      fixture.detectChanges();
      expect(linkElement.getAttribute('aria-label')).toBe(
        'Mot de passe oublié'
      );
    });

    it('should set minWidth and maxWidth styles', () => {
      component.minWidth = 120;
      component.maxWidth = 300;
      fixture.detectChanges();
      expect(linkElement.style.minWidth).toContain('120');
      expect(linkElement.style.maxWidth).toContain('300');
    });

    it('should set tabIndex correctly', () => {
      component.tabIndex = 2;
      fixture.detectChanges();
      expect(linkElement.tabIndex).toBe(2);
    });
  });

  describe('CSS Classes', () => {
    it('should apply disabled class when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      expect(linkElement.classList.contains('ui-link--disabled')).toBeTrue();
      expect(linkElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should not apply disabled class when not disabled', () => {
      component.disabled = false;
      fixture.detectChanges();
      expect(linkElement.classList.contains('ui-link--disabled')).toBeFalse();
      expect(linkElement.getAttribute('aria-disabled')).toBe('false');
    });
  });

  describe('Events', () => {
    it('should set focus state on focus', () => {
      linkElement.dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      expect(component._isFocused()).toBeTrue();
    });

    it('should unset focus state on blur', () => {
      linkElement.dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      linkElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(component._isFocused()).toBeFalse();
    });

    it('should prevent click when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      const event = new MouseEvent('click');
      spyOn(event, 'preventDefault');
      linkElement.dispatchEvent(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('RouterLink', () => {
    it('should set routerLink correctly', () => {
      component.routerLink = ['/register'];
      fixture.detectChanges();
      // Vérifie que l'attribut href est généré (simulé par RouterTestingModule)
      expect(linkElement.getAttribute('href')).toContain('/register');
    });
  });
});
