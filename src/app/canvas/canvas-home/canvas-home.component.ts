import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-home',
  templateUrl: './canvas-home.component.html',
  styleUrls: ['./canvas-home.component.scss'],
})
export class CanvasHomeComponent {
  @ViewChild('canvas') myCanvas: ElementRef<HTMLCanvasElement> | undefined;
  public context: CanvasRenderingContext2D | undefined;

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
  }
}
