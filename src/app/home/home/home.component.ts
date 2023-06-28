import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

export interface DrpDwn {
  id: number;
  name: string;
  selectState: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  data: DrpDwn[] = [];
  public isCollapsed = true;
  prevSelectedWindow: DrpDwn | null = null;

  constructor() {
    this.data = [
      {
        id:1,
        name:'Home',
        selectState: false,
      },
      {
        id:2,
        name:'Music',
        selectState: false,
      },
      {
        id:3,
        name:'Books',
        selectState: false,
      }
    ];

    this.prevSelectedWindow = this.data[0];
    this.prevSelectedWindow.selectState = true;
  }

  dropDown(data: DrpDwn) {
    if(this.prevSelectedWindow){
      this.prevSelectedWindow.selectState = false;
    }
    data.selectState = true;
    this.prevSelectedWindow = data;
    window.alert(JSON.stringify(data));
  }
}

//ng build --output-path docs --base-href ANEFreeInIty-UI