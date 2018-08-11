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

  // where start drag, we increase a data in the stream next(data):
  setDragData(data: DragData) {
    this._dragData.next(data);
  }

  // when you put the object, you will get the latest value, becuase
  // _dragData is BehaviorSubject
  getDragData(): Observable<DragData | null> {
    return this._dragData.asObservable();
  }
 
  
  clearDragData() {
    this._dragData.next(null);
  }
}
