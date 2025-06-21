import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme = signal<'light' | 'dark'>('light');
  readonly theme = this._theme.asReadonly();

  constructor() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    this.setTheme(savedTheme || systemTheme);
    console.log(
      'systemTheme',
      window.matchMedia('(prefers-color-scheme: dark)')
    );
  }

  setTheme(theme: 'light' | 'dark') {
    this._theme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggleTheme() {
    const newTheme = this._theme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}
