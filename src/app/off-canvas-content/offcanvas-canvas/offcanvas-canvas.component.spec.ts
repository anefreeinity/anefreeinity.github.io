import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasCanvasComponent } from './offcanvas-canvas.component';

describe('OffcanvasCanvasComponent', () => {
  let component: OffcanvasCanvasComponent;
  let fixture: ComponentFixture<OffcanvasCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffcanvasCanvasComponent]
    });
    fixture = TestBed.createComponent(OffcanvasCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
