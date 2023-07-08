import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanvasScalePosService {
  private scale: BehaviorSubject<number> = new BehaviorSubject<number>(50);
  public scale$: Observable<number> = this.scale.asObservable();

  private xCood: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public xCood$: Observable<number> = this.xCood.asObservable();

  private yCood: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public yCood$: Observable<number> = this.yCood.asObservable();

  constructor() {}

  setScale(scale: number) {
    this.scale.next(scale);
  }

  setXCood(scale: number) {
    this.xCood.next(scale);
  }

  setYCood(scale: number) {
    this.yCood.next(scale);
  }
}
