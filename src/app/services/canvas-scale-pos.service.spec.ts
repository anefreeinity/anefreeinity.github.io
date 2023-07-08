import { TestBed } from '@angular/core/testing';

import { CanvasScalePosService } from './canvas-scale-pos.service';

describe('CanvasScalePosService', () => {
  let service: CanvasScalePosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasScalePosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
