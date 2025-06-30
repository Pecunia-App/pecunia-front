import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorage.removeItem('pecunia-theme');
    document.documentElement.removeAttribute('data-theme');
    service = TestBed.inject(ThemeService);
  });

  it('should initialize with light theme by default', () => {
    expect(service.theme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should initialize with saved theme from localStorage', () => {
    localStorage.setItem('pecunia-theme', 'dark');
    const newService = new ThemeService();
    expect(newService.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should set theme and update localStorage and attribute', () => {
    service.setTheme('dark');
    expect(service.theme()).toBe('dark');
    expect(localStorage.getItem('pecunia-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should toggle theme correctly', () => {
    service.setTheme('light');
    service.toggleTheme();
    expect(service.theme()).toBe('dark');
    service.toggleTheme();
    expect(service.theme()).toBe('light');
  });

  it('should update isDarkTheme computed signal', () => {
    service.setTheme('dark');
    expect(service.isDarkTheme()).toBeTrue();
    service.setTheme('light');
    expect(service.isDarkTheme()).toBeFalse();
  });
});
