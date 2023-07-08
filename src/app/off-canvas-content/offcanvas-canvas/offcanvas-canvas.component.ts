import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-offcanvas-canvas',
  templateUrl: './offcanvas-canvas.component.html',
  styleUrls: ['./offcanvas-canvas.component.scss'],
})
export class OffcanvasCanvasComponent {
  @Input() offcanvas: any | undefined;
}
