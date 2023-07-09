import { Component, HostListener, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CanvasScalePosService } from 'src/app/services/canvas-scale-pos.service';

@Component({
  selector: 'app-offcanvas-canvas',
  templateUrl: './offcanvas-canvas.component.html',
  styleUrls: ['./offcanvas-canvas.component.scss'],
})
export class OffcanvasCanvasComponent {
  @Input() offcanvas: any | undefined;
  scaleController = new FormControl<number>(50);
  scaleFactorController = new FormControl<number>(1);
  zoomThresholdController = new FormControl<number>(30);

  scaleLabel = 'Scale';
  scaleFactorLabel = 'Scale Factor';
  zoomThresholdLabel = 'Zoom Threshold';

  currentSelectedScale: number = 50;
  currentSelectedscaleFactor: number = 1;
  currentSelectedzoomThreshold: number = 30;

  scaleValues: number[] = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];
  scaleFactorValues: number[] = [
    0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.5, 1.8, 2, 2.5, 3,
  ];
  zoomThresholdVlues: number[] = [20, 30, 40, 50];

  constructor(private canvasScalePosService: CanvasScalePosService) {
    this.currentSelectedScale = this.canvasScalePosService.getScale();
    this.currentSelectedscaleFactor =
      this.canvasScalePosService.getscaleFactor();
    this.currentSelectedzoomThreshold =
      this.canvasScalePosService.getzoomThreshold();
  }

  scaleSelectionChange(scale: number) {
    this.currentSelectedScale = scale;
    this.canvasScalePosService.setUserScale(scale);
  }

  scaleFactorSelectionChange(scaleFactor: number) {
    this.currentSelectedscaleFactor = scaleFactor;
    this.canvasScalePosService.setscaleFactor(scaleFactor);
  }

  zoomThresholdSelectionChange(zoomThreshold: number) {
    this.currentSelectedzoomThreshold = zoomThreshold;
    this.canvasScalePosService.setzoomThreshold(zoomThreshold);
  }
}
