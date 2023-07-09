import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CanvasScalePosService } from './canvas-scale-pos.service';
import { clamp } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CanvasUtilService {
  private myCanvas: BehaviorSubject<any | undefined> = new BehaviorSubject<
    any | undefined
  >(undefined);
  public context: any | undefined;
  public scale: number = 50;
  public originX: number = 0;
  public originY: number = 0;
  public scalHold: number = 50;
  public pinchFactor: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public isZooming: boolean = false;
  public isUserGivenScale: boolean = false;
  public xAxis: number = 0;
  public yAxis: number = 0;
  public xTolerance: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public yTolerance: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private canvasScalePosService: CanvasScalePosService) {
    this.canvasScalePosService.userScale$.subscribe((sc) => {
      if (sc === null) return;
      this.isUserGivenScale = true;
      this.scale = sc!;
      this.makeCanvas();
      this.drawGrid();
    });
  }

  // setMyCanvas(canvas: ElementRef<HTMLCanvasElement> | undefined) {
  //   this.myCanvas.next(canvas);
  // }

  // getMyCanvas(): ElementRef<HTMLCanvasElement> | undefined {
  //   return this.myCanvas.value;
  // }

  setMyCanvas(canvas: any | undefined) {
    this.myCanvas.next(canvas);
  }

  getMyCanvas(): any | undefined {
    return this.myCanvas.value;
  }

  setCanvasDimension(height: number, width: number) {
    this.myCanvas.value!.height = height;
    this.myCanvas.value!.width = width;
    // this.myCanvas.value!.clientHeight = height;
    // this.myCanvas.value!.clientWidth = width;
  }

  getCanvasHeight(): number {
    return this.myCanvas.value!.clientHeight;
  }

  getCanvasWidth(): number {
    return this.myCanvas.value!.clientWidth;
  }

  setPinchFactor(pf: number) {
    this.pinchFactor.next(pf);
  }

  getPinchFactor(): number {
    return this.pinchFactor.value;
  }

  makeCanvas() {
    if (!this.myCanvas.value) return;
    this.context = this.myCanvas.value!.getContext('2d')!;
    this.context.fillStyle = '#dbdbdb';
    this.context.fillRect(
      0,
      0,
      this.myCanvas.value!.clientWidth,
      this.myCanvas.value!.clientHeight
    );
  }

  drawGrid() {
    // window.alert(
    //   `width: ${this.myCanvas!.nativeElement.width}, height: ${
    //     this.myCanvas!.nativeElement.height
    //   }`
    // );
    if (!this.myCanvas.value) return;
    if (!this.isZooming && !this.isUserGivenScale) {
      this.scale = Math.round(
        (this.myCanvas.value!.clientHeight / 15) * 0.6 +
          (this.myCanvas.value!.clientWidth / 27) * 0.4
      );
    }

    this.scalHold = this.scale;

    if (!this.isUserGivenScale) {
      this.scale = this.scale + this.pinchFactor.value;
    }

    this.canvasScalePosService.setScale(Math.round(this.scale));
    this.scale = Math.round(this.scale);
    console.log(`scale: ${this.scale}`);
    this.isUserGivenScale = false;

    let isFirst: boolean = true;
    let isCoord: boolean = false;
    let count = 0;
    for (
      let i = this.scale;
      i < this.myCanvas.value!.clientHeight;
      i += this.scale
    ) {
      count++;
      this.context!.beginPath();
      this.context!.moveTo(0, i);
      this.context!.lineTo(this.myCanvas.value!.clientWidth, i);

      if (i === this.myCanvas.value!.clientHeight / 2) {
        this.context!.strokeStyle = '#ff0000';
        this.yAxis = i;
      } else if (
        isFirst &&
        i < this.myCanvas.value!.clientHeight / 2 &&
        i + this.scale > this.myCanvas.value!.clientHeight / 2
      ) {
        let dist1 = this.myCanvas.value!.clientHeight / 2 - i;
        let dist2 = i + this.scale - this.myCanvas.value!.clientHeight / 2;

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
      i < this.myCanvas.value!.clientWidth;
      i += this.scale
    ) {
      this.context!.beginPath();
      this.context!.moveTo(i, 0);
      this.context!.lineTo(i, this.myCanvas.value!.clientHeight);

      if (i === this.myCanvas.value!.clientWidth / 2) {
        this.context!.strokeStyle = '#ff0000';
        this.xAxis = i;
      } else if (
        isFirst &&
        i < this.myCanvas.value!.clientWidth / 2 &&
        i + this.scale > this.myCanvas.value!.clientWidth / 2
      ) {
        let dist1 = this.myCanvas.value!.clientWidth / 2 - i;
        let dist2 = i + this.scale - this.myCanvas.value!.clientWidth / 2;

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
    let yVal = clamp(event.clientY, 0, this.myCanvas.value!.clientHeight);
    let xVal = clamp(event.clientX, 0, this.myCanvas.value!.clientWidth);
    xVal -= this.xAxis;
    yVal -= this.yAxis;
    yVal *= -1;
    xVal -= this.xTolerance.value;
    yVal -= this.yTolerance.value;
    this.canvasScalePosService.setXCood(Math.round(xVal));
    this.canvasScalePosService.setYCood(Math.round(yVal));
  }

  setCanvasOrigin(event: any) {
    let yCurrVal = clamp(event.clientY, 0, this.myCanvas.value!.clientHeight);
    let xCurrVal = clamp(event.clientX, 0, this.myCanvas.value!.clientWidth);
    xCurrVal -= this.xAxis;
    yCurrVal -= this.yAxis;
    yCurrVal *= -1;

    this.yTolerance.next(yCurrVal);
    this.xTolerance.next(xCurrVal);
    this.calculateCood(event);
  }
}
