import { Component, ElementRef, ViewChild } from '@angular/core';

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

  constructor() {}

  ngAfterViewInit(): void {
    this.myCanvas!.nativeElement.height = window.innerHeight;
    this.myCanvas!.nativeElement.width = window.innerWidth;
    this.context = this.myCanvas!.nativeElement.getContext('2d')!;
    this.context.fillStyle = '#dbdbdb';
    this.context.fillRect(
      0,
      0,
      this.myCanvas!.nativeElement.width,
      this.myCanvas!.nativeElement.height
    );

    this.drawGrid();
  }

  drawGrid() {
    // window.alert(
    //   `width: ${this.myCanvas!.nativeElement.width}, height: ${
    //     this.myCanvas!.nativeElement.height
    //   }`
    // );

    this.scale = Math.round(
      (this.myCanvas!.nativeElement.height / 15) * 0.6 +
        (this.myCanvas!.nativeElement.width / 27) * 0.4
    );

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
        }
        isFirst = false;
      } else if (isCoord) {
        this.context!.strokeStyle = '#ff0000';
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
        }
        isFirst = false;
      } else if (isCoord) {
        this.context!.strokeStyle = '#ff0000';
        isCoord = false;
      }
      this.context!.stroke();
      this.context!.strokeStyle = '#2d2d2e';
    }
  }

  onResizeWin(evt: any) {
    console.log(evt.target.innerHeight);
    this.myCanvas!.nativeElement.height = evt.target.innerHeight;
    this.myCanvas!.nativeElement.width = evt.target.innerWidth;
    this.context = this.myCanvas!.nativeElement.getContext('2d')!;
    this.context.fillStyle = '#dbdbdb';
    this.context.fillRect(
      0,
      0,
      this.myCanvas!.nativeElement.width,
      this.myCanvas!.nativeElement.height
    );
    this.drawGrid();
  }
}
