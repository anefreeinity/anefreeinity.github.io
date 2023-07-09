import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanvasScalePosService {
  private scale: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(40);
  public scale$: Observable<number | null> = this.scale.asObservable();

  private userScale: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);
  public userScale$: Observable<number | null> = this.userScale.asObservable();

  private xCood: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public xCood$: Observable<number> = this.xCood.asObservable();

  private yCood: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public yCood$: Observable<number> = this.yCood.asObservable();

  private scaleFactor: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public scaleFactor$: Observable<number> = this.scaleFactor.asObservable();

  private zoomThreshold: BehaviorSubject<number> = new BehaviorSubject<number>(
    30
  );
  public zoomThreshold$: Observable<number> = this.zoomThreshold.asObservable();

  constructor() {}

  setScale(scale: number) {
    this.scale.next(scale);
  }

  setUserScale(userScale: number) {
    this.userScale.next(userScale);
  }

  setXCood(scale: number) {
    this.xCood.next(scale);
  }

  setYCood(scale: number) {
    this.yCood.next(scale);
  }

  setscaleFactor(scaleFactor: number) {
    this.scaleFactor.next(scaleFactor);
  }

  setzoomThreshold(zoomThreshold: number) {
    this.zoomThreshold.next(zoomThreshold);
  }

  getXCood(): number {
    return this.xCood.value;
  }

  getYCood(): number {
    return this.yCood.value;
  }

  getScale(): number {
    return this.scale.value!;
  }

  getscaleFactor(): number {
    return this.scaleFactor.value;
  }

  getzoomThreshold(): number {
    return this.zoomThreshold.value;
  }
}
