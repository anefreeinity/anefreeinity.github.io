import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CanvasScalePosService } from 'src/app/services/canvas-scale-pos.service';
import { CanvasUtilService } from 'src/app/services/canvas-util.service';

@Component({
  selector: 'app-canvas-home',
  templateUrl: './canvas-home.component.html',
  styleUrls: ['./canvas-home.component.scss'],
})
export class CanvasHomeComponent {
  //@ViewChild('canvas') myCanvas: ElementRef<HTMLCanvasElement> | undefined;
  scaleFactor: number = 1;
  zoomThreshold: number = 30;
  initialZoom: number = 0;

  constructor(
    private canvasUtilService: CanvasUtilService,
    private canvasScalePosService: CanvasScalePosService
  ) {
    this.canvasScalePosService.scaleFactor$.subscribe((sf) => {
      this.scaleFactor = sf;
    });

    this.canvasScalePosService.zoomThreshold$.subscribe((zt) => {
      this.zoomThreshold = zt;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let myCanvas = document.getElementById('myCanvas');
      this.canvasUtilService.setMyCanvas(myCanvas);
      this.canvasUtilService.setCanvasDimension(
        window.innerHeight,
        window.innerWidth
      );
      this.initializeCanvas();
    }, 50);
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

  setOrigin(event: any) {
    this.canvasUtilService.setCanvasOrigin(event);
  }
}
