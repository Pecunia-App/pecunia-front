import { Injectable, OnDestroy, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService implements OnDestroy {
  private _width = signal(window.innerWidth);
  private resizeHandler = () => this._width.set(window.innerWidth);
  readonly width = this._width.asReadonly();

  constructor() {
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  // Breakpoints réutilisables
  get isMobile(): boolean {
    return this._width() < 768;
  }

  get isTablet(): boolean {
    return this._width() >= 768 && this._width() < 1024;
  }

  get isDesktop(): boolean {
    return this._width() >= 1024;
  }
}
