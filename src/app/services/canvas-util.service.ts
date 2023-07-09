import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CanvasScalePosService } from './canvas-scale-pos.service';
import { clamp } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CanvasUtilService {
  private myCanvas: BehaviorSubject<ElementRef<HTMLCanvasElement> | undefined> =
    new BehaviorSubject<ElementRef<HTMLCanvasElement> | undefined>(undefined);

  public context: CanvasRenderingContext2D | undefined;
  public scale: number = 50;
  public originX: number = 0;
  public originY: number = 0;
  public scalHold: number = 50;
  public pinchFactor: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public isZooming: boolean = false;
  public xAxis: number = 0;
  public yAxis: number = 0;

  constructor(private canvasScalePosService: CanvasScalePosService) {}

  setMyCanvas(canvas: ElementRef<HTMLCanvasElement> | undefined) {
    this.myCanvas.next(canvas);
  }

  getMyCanvas(): ElementRef<HTMLCanvasElement> | undefined {
    return this.myCanvas.value;
  }

  setCanvasDimension(height: number, width: number) {
    this.myCanvas.value!.nativeElement.height = height;
    this.myCanvas.value!.nativeElement.width = width;
  }

  getCanvasHeight(): number {
    return this.myCanvas.value!.nativeElement.height;
  }

  getCanvasWidth(): number {
    return this.myCanvas.value!.nativeElement.width;
  }

  setPinchFactor(pf: number) {
    this.pinchFactor.next(pf);
  }

  getPinchFactor(): number {
    return this.pinchFactor.value;
  }

  makeCanvas() {
    this.context = this.myCanvas.value!.nativeElement.getContext('2d')!;
    this.context.fillStyle = '#dbdbdb';
    this.context.fillRect(
      0,
      0,
      this.myCanvas.value!.nativeElement.width,
      this.myCanvas.value!.nativeElement.height
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
        (this.myCanvas.value!.nativeElement.height / 15) * 0.6 +
          (this.myCanvas.value!.nativeElement.width / 27) * 0.4
      );
    }
    this.scalHold = this.scale;
    this.scale = this.scale + this.pinchFactor.value;
    this.canvasScalePosService.setScale(Math.round(this.scale));

    let isFirst: boolean = true;
    let isCoord: boolean = false;
    let count = 0;
    for (
      let i = this.scale;
      i < this.myCanvas.value!.nativeElement.height;
      i += this.scale
    ) {
      count++;
      this.context!.beginPath();
      this.context!.moveTo(0, i);
      this.context!.lineTo(this.myCanvas.value!.nativeElement.width, i);

      if (i === this.myCanvas.value!.nativeElement.height / 2) {
        this.context!.strokeStyle = '#ff0000';
        this.yAxis = i;
      } else if (
        isFirst &&
        i < this.myCanvas.value!.nativeElement.height / 2 &&
        i + this.scale > this.myCanvas.value!.nativeElement.height / 2
      ) {
        let dist1 = this.myCanvas.value!.nativeElement.height / 2 - i;
        let dist2 =
          i + this.scale - this.myCanvas.value!.nativeElement.height / 2;

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
      i < this.myCanvas.value!.nativeElement.width;
      i += this.scale
    ) {
      this.context!.beginPath();
      this.context!.moveTo(i, 0);
      this.context!.lineTo(i, this.myCanvas.value!.nativeElement.height);

      if (i === this.myCanvas.value!.nativeElement.width / 2) {
        this.context!.strokeStyle = '#ff0000';
        this.xAxis = i;
      } else if (
        isFirst &&
        i < this.myCanvas.value!.nativeElement.width / 2 &&
        i + this.scale > this.myCanvas.value!.nativeElement.width / 2
      ) {
        let dist1 = this.myCanvas.value!.nativeElement.width / 2 - i;
        let dist2 =
          i + this.scale - this.myCanvas.value!.nativeElement.width / 2;

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

  calculateCood(event: any) {
    let yVal = clamp(
      event.clientY,
      0,
      this.myCanvas.value!.nativeElement.height
    );
    let xVal = clamp(
      event.clientX,
      0,
      this.myCanvas.value!.nativeElement.width
    );
    xVal -= this.xAxis;
    yVal -= this.yAxis;
    yVal *= -1;
    this.canvasScalePosService.setXCood(Math.round(xVal));
    this.canvasScalePosService.setYCood(Math.round(yVal));
  }
}
