import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { IconComponent } from './icon.component';
import { By } from '@angular/platform-browser';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should render icon path correctly', () => {
    component.name = 'arrow-left';
    fixture.detectChanges();

    const req = httpMock.expectOne({
      method: 'HEAD',
      url: 'assets/icons/lucide/arrow-left.svg',
    });
    req.flush(null, { status: 200, statusText: 'OK' });

    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('span.icon'))
      .nativeElement as HTMLSpanElement;
    expect(span.style.maskImage).toContain('arrow-left.svg');
  });

  it('should apply correct size class', () => {
    component.name = 'plus';
    component.size = 'lg';
    fixture.detectChanges();

    const req = httpMock.expectOne({
      method: 'HEAD',
      url: 'assets/icons/lucide/plus.svg',
    });
    req.flush(null, { status: 200, statusText: 'OK' });

    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span.icon'));
    expect(span.classes['icon-size-lg']).toBeTrue();
  });

  it('should fallback to "plus" if icon does not exist', async () => {
    component.name = 'not-a-real-icon';
    fixture.detectChanges();

    // 1) L’icône demandée n’existe pas -> 404
    const miss = httpMock.expectOne({
      method: 'HEAD',
      url: 'assets/icons/lucide/not-a-real-icon.svg',
    });
    miss.flush('Not Found', { status: 404, statusText: 'Not Found' });

    // Détecte les changements après le fallback
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component._name()).toBe('plus');
  });
});
