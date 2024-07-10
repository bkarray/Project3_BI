import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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


export class S8o8o1RessourcesService {

  public host:string="https://localhost:8443";
  public authenticated!: boolean;
  public authenticatedUser: any;

  private users: any = [];
  readonly APIUrl = 'http://127.0.0.1:8000';
  readonly PhotoUrl = 'http://127.0.0.1:8000/media/';

  
  constructor(
    private http:HttpClient,
    private router: Router
    ) 
    {}

  // Obtenir un bouton spécifique par son ID
  TS_Sce_GetButton_From_DB_To_UI(id: number): Observable<T_Button> {
    return this.http.get<T_Button>(this.APIUrl + '/T_Button/' + id + '/');
  }

  TS_Sce_GetButton_FBtn_FrontBehindObject_From_DB_To_UI(FBtn_FrontBehindObject: string): Observable<T_Button[]> {
    return this.http.get<T_Button[]>(`${this.APIUrl}/T_Button/FBtn_FrontBehindObject/${FBtn_FrontBehindObject}/`);
  }

  TS_Sce_GetAllButtonData(): Observable<any[]> {
    const url = `${this.APIUrl}/T_Button/Get_all_Data/`;
    return this.http.get<any[]>(url);
  }

  
  TS_Sce_GetAllCmdCenterData(): Observable<any[]> {
    const url = `${this.APIUrl}/T_CmdCenter/Get_all_Data/`;
    return this.http.get<any[]>(url);
  }

  

  TS_Sce_GetAllTypeData(): Observable<any[]> {
    const url = `${this.APIUrl}/T_VarType/Get_all_Data/`;
    return this.http.get<any[]>(url);
  }

 
  
  /*TS_Sce_Update_VarTransfert(VarTransfert: any): Observable<any> {
    return this.http.put<any>(this.APIUrl + '/URL_VarTransfert/', VarTransfert);
  }*/



  TS_Sce_GetAllFonctionData(): Observable<any[]> {
    const url = `${this.APIUrl}/T_Fonction/Get_all_Data/`;
    return this.http.get<any[]>(url);
  }
  
  TS_Sce_GetAllVarTransfertData(): Observable<any[]> {
    const url = `${this.APIUrl}/T_VarTransfert/Get_all_Data/`;
    return this.http.get<any[]>(url);
  }
  TS_Sce_GetAllVarLocalTSData(): Observable<any[]> {
    const url = `${this.APIUrl}/URL_VarLocalTS/`;
    return this.http.get<any[]>(url);
  }



  TS_Sce_Get_VarTransfert(VarTransfert: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/URL_VarTransfert/', VarTransfert);
  }
  TS_Sce_Post_VarTransfert(VarTransfert: any): Observable<any> {
    return this.http.post<any>(this.APIUrl + '/URL_VarTransfert/', VarTransfert);
  }
  TS_Sce_Put_VarTransfert(VarTransfert: any): Observable<any> {
    return this.http.put<any>(this.APIUrl + '/URL_VarTransfert/', VarTransfert);
  }
  TS_Sce_Delete_VarTransfert(id: number): Observable<any> {
    return this.http.delete<any>(`${this.APIUrl}/URL_VarTransfert_Id/${id}`);
  }

  TS_Sce_Get_Fonction(Fonction: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/URL_Fonction/', Fonction);
  }
  TS_Sce_Post_Fonction(Fonction: any): Observable<any> {
    return this.http.post<any>(this.APIUrl + '/URL_Fonction/', Fonction);
  }
  TS_Sce_Put_Fonction(Fonction: any): Observable<any> {
    return this.http.put<any>(this.APIUrl + '/URL_Fonction/', Fonction);
  }
  TS_Sce_Delete_Fonction(id: number): Observable<any> {
    return this.http.delete<any>(`${this.APIUrl}/URL_Fonction/${id}`);
  }

  TS_Sce_Get_VarLocalTS(VarLocalTS: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/URL_VarLocalTS/', VarLocalTS);
  }
  TS_Sce_Post_VarLocalTS(VarLocalTS: any): Observable<any> {
    return this.http.post<any>(this.APIUrl + '/URL_VarLocalTS/', VarLocalTS);
  }
  TS_Sce_Put_VarLocalTS(VarLocalTS: any): Observable<any> {
    return this.http.put<any>(this.APIUrl + '/URL_VarLocalTS/', VarLocalTS);
  }
  TS_Sce_Delete_VarLocalTS(id: number): Observable<any> {
    return this.http.delete<any>(`${this.APIUrl}/URL_VarLocalTS/${id}`);
  }

  TS_Sce_Get_CmdCenter(VarCmdCenter: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + '/URL_CmdCenter/', VarCmdCenter);
  }
  TS_Sce_Post_CmdCenter(VarCmdCenter: any): Observable<any> {
    return this.http.post<any>(this.APIUrl + '/URL_CmdCenter/', VarCmdCenter);
  }
  TS_Sce_Put_CmdCenter(VarCmdCenter: any): Observable<any> {
    return this.http.put<any>(this.APIUrl + '/URL_CmdCenter/', VarCmdCenter);
  }
  TS_Sce_Delete_CmdCenter(id: number): Observable<any> {
    return this.http.delete<any>(`${this.APIUrl}/URL_CmdCenter/${id}`);
  }




  
  // Mettre à jour un bouton existant TS_Sce_UpdateButton_From_UI_To_DB
  TS_Sce_UpdateButton_From_UI_To_DB(button: T_Button): Observable<T_Button> {
    return this.http.put<T_Button>(this.APIUrl + '/T_Button/' + button.FBtn_Id + '/', button);
  }

  


  
    // Ajouter un nouveau bouton
    addButton(button: T_Button): Observable<T_Button> {
      return this.http.post<T_Button>(this.APIUrl + '/T_Button/', button);
    }

    



    TS_Sce_Post_(val:any){
      return this.http.post(this.APIUrl + '/test1/', val);
    }

    TS_Sce_Get_(): Observable<any[]> {
      return this.http.get<any[]>(this.APIUrl + '/test2/');
    }
    

    // Obtenir tous les boutons
    getButtons(): Observable<T_Button[]> {
      return this.http.get<T_Button[]>(this.APIUrl + '/T_Button/');
    }

  

    



    // Supprimer un bouton
    deleteButton(id: number): Observable<any> {
      return this.http.delete(this.APIUrl + '/T_Button/' + id + '/');
    }

  
}


