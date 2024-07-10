import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,BehaviorSubject} from 'rxjs';

export interface T_Button {
  /* # 1 Id */
  FBtn_Id?: number;

  /* # 2 Object */
  FBtn_Object: string;

  /* # 3 Input */
  /* # 3.1 Attachment */
  /* # 3.2 UI */
  FBtn_Name: string;
  FBtn_Label: string;
  FBtn_Style: string;
  FBtn_Size: string;
  FBtn_Color: string;
  FBtn_BackgroundColor: string;
  FBtn_Border: string;

  /* # 3.3 Position */
  FBtn_FrontBehind: string;
  FBtn_FrontBehindObject: string;
  FBtn_PositionX: string;
  FBtn_PositionY: string;

  /* # 4 Output */
  /* # 4.1 Treatment */
  FBtn_TreatmentButton: string;
  FBtn_TreatmentType: string;
  FBtn_InputButtonAction3: string;
}

@Injectable({
  providedIn: 'root'
})

export class S8o8o2SceDatabaseService {
  public host: string = "https://localhost:8443";
  public authenticated!: boolean;
  public authenticatedUser: any;
  private users: any = [];
  private readonly APIUrl = 'http://127.0.0.1:8000';
  readonly PhotoUrl = 'http://127.0.0.1:8000/media/';
  private buttonData: any = {
    VarS_InputButtonId: null,
    VarS_InputButtonName: '',
    // ... (autres propriétés)
  };

  constructor(private http: HttpClient, private router: Router) {}

  // Une méthode pour obtenir une copie des données
  TS_Sce_Get_Copy_ButtonData(): any {
    return this.buttonDataSubject.asObservable();
  }

  // Une méthode pour mettre à jour les données
  TS_Sce_Update_ButtonData(newData: any): void {
    this.buttonData = {...this.buttonData, ...newData};
    this.buttonDataSubject.next(this.buttonData); // notifier tous les abonnés du changement
  }

  // a voir
  private buttonDataSubject = new BehaviorSubject<any>(this.buttonData);
  buttonData$ = this.buttonDataSubject.asObservable();
  updateButtonData(newData: any): void {
    this.buttonData = {...this.buttonData, ...newData};
    this.buttonDataSubject.next(this.buttonData);
  }



}
