import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class S8o8o4NotifyResourceUpdatedService {
  
  constructor() {}

  private dataSource = new Subject<any>();
  TS_Sce_Notify_UpdateButton_From_UI_To_FileDB() {
    this.dataSource.next();
  }
  List_Notify_UpdateButton_From_UI_To_FileDB = this.dataSource.asObservable();
  
  

}