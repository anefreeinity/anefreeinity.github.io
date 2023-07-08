import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CanvasScalePosService } from 'src/app/services/canvas-scale-pos.service';
import { clamp } from 'lodash';

@Component({
  selector: 'app-canvas-home',
  templateUrl: './canvas-home.component.html',
  styleUrls: ['./canvas-home.component.scss'],
})
export class CanvasHomeComponent {
  @ViewChild('canvas') myCanvas: ElementRef<HTMLCanvasElement> | undefined;
  public context: CanvasRenderingContext2D | undefined;
  public scale: number = 50;
  public originX: number = 0;
  public originY: number = 0;
  public scalHold: number = 50;
  public pinchFactor: number = 0;
  public isZooming: boolean = false;
  public xAxis: number = 0;
  public yAxis: number = 0;

  constructor(private canvasScalePosService: CanvasScalePosService) {}

  ngAfterViewInit(): void {
    this.myCanvas!.nativeElement.height = window.innerHeight;
    this.myCanvas!.nativeElement.width = window.innerWidth;
    this.initializeCanvas();
  }

  initializeCanvas() {
    this.makeCanvas();
    this.drawGrid();
  }

  makeCanvas() {
    this.context = this.myCanvas!.nativeElement.getContext('2d')!;
    this.context.fillStyle = '#dbdbdb';
    this.context.fillRect(
      0,
      0,
      this.myCanvas!.nativeElement.width,
      this.myCanvas!.nativeElement.height
    );
  }

  drawGrid() {
    // window.alert(
    //   `width: ${this.myCanvas!.nativeElement.width}, height: ${
    //     this.myCanvas!.nativeElement.height
    //   }`
    // );

    if (!this.isZooming) {
      this.scale = Math.round(
        (this.myCanvas!.nativeElement.height / 15) * 0.6 +
          (this.myCanvas!.nativeElement.width / 27) * 0.4
      );
    }
    this.scalHold = this.scale;
    this.scale = this.scale + this.pinchFactor;
    this.canvasScalePosService.setScale(Math.round(this.scale));

    let isFirst: boolean = true;
    let isCoord: boolean = false;
    let count = 0;
    for (
      let i = this.scale;
      i < this.myCanvas!.nativeElement.height;
      i += this.scale
    ) {
      count++;
      this.context!.beginPath();
      this.context!.moveTo(0, i);
      this.context!.lineTo(this.myCanvas!.nativeElement.width, i);

      if (i === this.myCanvas!.nativeElement.height / 2) {
        this.context!.strokeStyle = '#ff0000';
        this.yAxis = i;
      } else if (
        isFirst &&
        i < this.myCanvas!.nativeElement.height / 2 &&
        i + this.scale > this.myCanvas!.nativeElement.height / 2
      ) {
        let dist1 = this.myCanvas!.nativeElement.height / 2 - i;
        let dist2 = i + this.scale - this.myCanvas!.nativeElement.height / 2;

        if (dist1 > dist2) {
          isCoord = true;
        } else {
          this.context!.strokeStyle = '#ff0000';
          this.yAxis = i;
        }
        isFirst = false;
      } else if (isCoord) {
        this.context!.strokeStyle = '#ff0000';
        this.yAxis = i;
        isCoord = false;
      }
      this.context!.stroke();
      this.context!.strokeStyle = '#2d2d2e';
    }

    isFirst = true;
    for (
      let i = this.scale;
      i < this.myCanvas!.nativeElement.width;
      i += this.scale
    ) {
      this.context!.beginPath();
      this.context!.moveTo(i, 0);
      this.context!.lineTo(i, this.myCanvas!.nativeElement.height);

      if (i === this.myCanvas!.nativeElement.width / 2) {
        this.context!.strokeStyle = '#ff0000';
        this.xAxis = i;
      } else if (
        isFirst &&
        i < this.myCanvas!.nativeElement.width / 2 &&
        i + this.scale > this.myCanvas!.nativeElement.width / 2
      ) {
        let dist1 = this.myCanvas!.nativeElement.width / 2 - i;
        let dist2 = i + this.scale - this.myCanvas!.nativeElement.width / 2;

        if (dist1 > dist2) {
          isCoord = true;
        } else {
          this.context!.strokeStyle = '#ff0000';
          this.xAxis = i;
        }
        isFirst = false;
      } else if (isCoord) {
        this.context!.strokeStyle = '#ff0000';
        this.xAxis = i;
        isCoord = false;
      }
      this.context!.stroke();
      this.context!.strokeStyle = '#2d2d2e';
    }
  }

  onResizeWin(evt: any) {
    console.log(
      `width: ${evt.target.innerWidth}, height: ${evt.target.innerHeight}`
    );
    this.myCanvas!.nativeElement.height = evt.target.innerHeight;
    this.myCanvas!.nativeElement.width = evt.target.innerWidth;
    this.initializeCanvas();
  }

  zoomScale: number = 0;
  @HostListener('wheel', ['$event'])
  onWheel($event: WheelEvent) {
    if (!$event.ctrlKey) return;
    $event.preventDefault();

    let scale = $event.deltaY * 0.8;
    if (scale < -20) {
      this.pinchFactor = -20;
    } else if (scale > 20) {
      this.pinchFactor = 20;
    } else {
      this.pinchFactor = scale;
    }
    this.initializeCanvas();
  }

  getCood(event: any) {
    let yVal = clamp(event.clientY, 0, this.myCanvas!.nativeElement.height);
    let xVal = clamp(event.clientX, 0, this.myCanvas!.nativeElement.width);
    xVal -= this.xAxis;
    yVal -= this.yAxis;
    yVal *= -1;
    this.canvasScalePosService.setXCood(Math.round(xVal));
    this.canvasScalePosService.setYCood(Math.round(yVal));
    //console.log(event);
  }
}
