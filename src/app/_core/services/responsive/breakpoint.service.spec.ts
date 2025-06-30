import { TestBed } from '@angular/core/testing';

import { BreakpointService } from './breakpoint.service';

describe('BreakpointService', () => {
  let service: BreakpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakpointService);
  });

  function setWindowWidth(width: number) {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event('resize'));
  }

  it('should detect mobile, tablet, desktop correctly', () => {
    // simulate a mobile width
    setWindowWidth(500);
    expect(service.isMobile).toBeTrue();
    expect(service.isTablet).toBeFalse();
    expect(service.isDesktop).toBeFalse();

    // simulate a tablet width
    setWindowWidth(900);
    expect(service.isMobile).toBeFalse();
    expect(service.isTablet).toBeTrue();
    expect(service.isDesktop).toBeFalse();

    // simulate a desktop width
    setWindowWidth(1300);
    expect(service.isMobile).toBeFalse();
    expect(service.isTablet).toBeFalse();
    expect(service.isDesktop).toBeTrue();
  });

  it('should clean up the listener on destroy', () => {
    spyOn(window, 'removeEventListener');
    service.ngOnDestroy();
    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
