import { Component } from '@angular/core';
import { DrpDwn, components } from './models/componentRout';
import { Router } from '@angular/router';
import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { CanvasScalePosService } from './services/canvas-scale-pos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data: DrpDwn[] = [];
  public isCollapsed = true;
  prevSelectedWindow: DrpDwn | null = null;
  scale: number = 50;
  xCood: number = 0;
  yCood: number = 0;

  constructor(
    private router: Router,
    private offcanvasService: NgbOffcanvas,
    private canvasScalePosService: CanvasScalePosService
  ) {
    this.data = components;
    this.prevSelectedWindow = this.data[0];
    this.prevSelectedWindow.selectState = true;
    this.router.navigate(['/home']);
    this.canvasUtil();
  }

  canvasUtil() {
    this.canvasScalePosService.scale$.subscribe((scale) => {
      this.scale = scale;
    });

    this.canvasScalePosService.xCood$.subscribe((x) => {
      this.xCood = x;
    });

    this.canvasScalePosService.yCood$.subscribe((y) => {
      this.yCood = y;
    });
  }

  dropDown(event: any, data: DrpDwn) {
    event.preventDefault();
    if (this.prevSelectedWindow) {
      this.prevSelectedWindow.selectState = false;
    }
    data.selectState = true;
    this.prevSelectedWindow = data;
    //window.alert(JSON.stringify(data));
    this.router.navigate([`/${data.route}`]);
  }

  open(event: any, content: any) {
    event.preventDefault();
    this.offcanvasService
      .open(content, {
        ariaLabelledBy: 'offcanvas-basic-title',
      })
      .result.then(
        (result) => {
          //this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
}
