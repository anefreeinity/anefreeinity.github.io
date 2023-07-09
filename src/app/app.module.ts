import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CanvasHomeComponent } from './canvas/canvas-home/canvas-home.component';
import { OffcanvasCanvasComponent } from './off-canvas-content/offcanvas-canvas/offcanvas-canvas.component';
import { PinchZoomDirective } from './directive/pinch-zoom.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CanvasHomeComponent,
    OffcanvasCanvasComponent,
    PinchZoomDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'canvas-home', component: CanvasHomeComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
