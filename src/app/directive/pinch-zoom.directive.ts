import { Directive, HostListener, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appPinchZoom]',
})
export class PinchZoomDirective {
  @Input() scaleFactor: number = 1;
  @Input() zoomThreshold: number = 30;
  @Input() initialZoom: number = 0;
  @Input() debounceTime: number = 100; // in ms
  scale: number | undefined;
  @Output() onPinch$: Subject<number> = new Subject<number>();
  constructor() {}
  ngOnInit(): void {
    this.scale = this.initialZoom;
  }

  @HostListener('wheel', ['$event'])
  onWheel($event: WheelEvent) {
    if (!$event.ctrlKey) return;
    $event.preventDefault();

    let scale = $event.deltaY * this.scaleFactor;
    this.calculatePinch(scale);
  }

  calculatePinch(scale: number) {
    if (scale < -this.zoomThreshold) {
      this.scale = -this.zoomThreshold;
    } else if (scale > this.zoomThreshold) {
      this.scale = this.zoomThreshold;
    } else {
      this.scale = scale;
    }
    this.onPinch$.next(this.scale);
  }
}
