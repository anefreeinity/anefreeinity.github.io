import { Component } from '@angular/core';
import { DrpDwn, components } from './models/componentRout';
import { Router } from '@angular/router';
import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data: DrpDwn[] = [];
  public isCollapsed = true;
  prevSelectedWindow: DrpDwn | null = null;

  constructor(private router: Router, private offcanvasService: NgbOffcanvas) {
    this.data = components;
    this.prevSelectedWindow = this.data[0];
    this.prevSelectedWindow.selectState = true;
    this.router.navigate(['/home']);
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
