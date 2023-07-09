import { TestBed } from '@angular/core/testing';

import { CanvasUtilService } from './canvas-util.service';

describe('CanvasUtilService', () => {
  let service: CanvasUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
