import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CanvasUtilService } from 'src/app/services/canvas-util.service';

@Component({
  selector: 'app-canvas-home',
  templateUrl: './canvas-home.component.html',
  styleUrls: ['./canvas-home.component.scss'],
})
export class CanvasHomeComponent {
  @ViewChild('canvas') myCanvas: ElementRef<HTMLCanvasElement> | undefined;
  scaleFactor: number = 1;
  zoomThreshold: number = 30;
  initialZoom: number = 0;

  constructor(private canvasUtilService: CanvasUtilService) {}

  ngAfterViewInit(): void {
    this.canvasUtilService.setMyCanvas(this.myCanvas);
    this.canvasUtilService.setCanvasDimension(
      window.innerHeight,
      window.innerWidth
    );
    this.initializeCanvas();
  }

  initializeCanvas() {
    this.canvasUtilService.makeCanvas();
    this.canvasUtilService.drawGrid();
  }

  onResizeWin(evt: any) {
    this.canvasUtilService.setCanvasDimension(
      evt.target.innerHeight,
      evt.target.innerWidth
    );
    this.initializeCanvas();
  }

  onPinch(event: any) {
    console.log(event);
    this.canvasUtilService.setPinchFactor(event);
    this.initializeCanvas();
  }

  getCood(event: any) {
    this.canvasUtilService.calculateCood(event);
  }
}
