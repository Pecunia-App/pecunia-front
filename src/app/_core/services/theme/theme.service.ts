import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme = signal<'light' | 'dark'>('light');
  readonly theme = this._theme.asReadonly();
  readonly isDarkTheme = computed(() => this._theme() === 'dark');

  constructor() {
    const savedTheme = localStorage.getItem('pecunia-theme') as
      | 'light'
      | 'dark'
      | null;
    this.setTheme(savedTheme ?? 'light');
  }

  setTheme(theme: 'light' | 'dark') {
    this._theme.set(theme);
    localStorage.setItem('pecunia-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggleTheme() {
    const newTheme = this._theme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}
