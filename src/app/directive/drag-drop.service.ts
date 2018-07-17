import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

export interface DragData {
  tag: string; // identify dragable object
  data: any; // deliver data
}

@Injectable()
export class DragDropService {

  private _dragData = new BehaviorSubject<DragData | null>(null);

  setDragData(data: DragData) {
    this._dragData.next(data);
  }

  getDragData(): Observable<DragData | null> {
    return this._dragData.asObservable();
  }

  clearDragData() {
    this._dragData.next(null);
  }
}
