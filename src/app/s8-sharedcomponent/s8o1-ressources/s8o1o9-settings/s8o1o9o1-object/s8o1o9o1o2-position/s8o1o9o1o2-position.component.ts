/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';

/* Importation: Command Center */
import { Interface_Tab_IFU_Recherche } from '../../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail } from '../../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Update } from '../../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail_UI } from '../../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_CommunicationData } from '../../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { data } from '../../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';

/* Importation : Interface */
import { Interface_CmdCToFileData } from '../../../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

/* Importation : Service */
import { S8o8o1RessourcesService } from '../../../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';
import { S8o8o2SceDatabaseService } from '../../../../s8o8-services/s8o8o2-sce-database/s8o8o2-sce-database.service';
import { S8o8o3SceCommunicationService } from '../../../../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service';
import { S8o8o4NotifyResourceUpdatedService } from '../../../../s8o8-services/s8o8o4-NotifyResourceUpdated/s8o8o4-notify-resource-updated.service';
import { S8o8o5ServicecenterService } from '../../../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

/* Importation : Table T_Button */
import { T_Button } from '../../../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';

@Component({
  selector: 'app-s8o1o9o1o2-position',
  templateUrl: './s8o1o9o1o2-position.component.html',
  styleUrls: ['./s8o1o9o1o2-position.component.css']
})
export class S8o1o9o1o2PositionComponent implements OnInit {

constructor(
  private S8o8o1RessourcesService: S8o8o1RessourcesService,
    private S8o8o2SceDatabaseService: S8o8o2SceDatabaseService,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService,
    private S8o8o4NotifyResourceUpdatedService: S8o8o4NotifyResourceUpdatedService,
    private S8o8o5ServicecenterService: S8o8o5ServicecenterService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef,  
  ) 
  {}  

@Input() Input_Var_Selected: string | number = ''

ngOnInit(): void {
  this.TS_Position_Active();
}

TS_Position_Active(): void {
  this.TS_GetData_From_File_CommandCenter()
}

public id_1: string | number = ''
public id_2: string | number = ''
public id_3: string | number = ''
public id_4: string | number = ''
public Tab_IFU_Recherche: Interface_Tab_IFU_Recherche[] = []
public Tab_Object: Interface_Tab_BD_Button_Detail[] = []
public Tab_SelectedItem: Interface_Tab_BD_Button_Detail[] = []
public Tab_SelectedItem_Update: Interface_Tab_BD_Button_Update[] = []
TS_GetData_From_File_CommandCenter(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdC_To_Position().subscribe(data => {
    this.id_1 = data.id_1.toString()
    if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_14') {
      this.id_1 = '2_Post_Data_From_FileMenuContextuel_15'
      console.log('2.12 - FileUI - From CmdC to Position - TS_Sce_Detect') 
        if (data.tab_3.Tab_SelectedItem !== undefined) {
          this.Tab_SelectedItem = data.tab_3.Tab_SelectedItem;
        }
      this.TS_IFU_Position() 
    }
    
    if (this.id_1 === '3_Post_Data_From_FileObject_6') {
      this.id_1 = '3_Post_Data_From_FileObject_7'
      console.log('3.6 - FilePosition - From CmdC to Position - TS_Sce_Detect') 
      if (data.tab_3.Tab_SelectedItem !== undefined) {
        this.Tab_SelectedItem = data.tab_3.Tab_SelectedItem;
      }
      this.TS_IFU_Position() 
    }

    if (this.id_1 === '4_Post_Data_From_FileSettings_SelectedItem_4') {
      this.id_1 = '4_Post_Data_From_FileSettings_SelectedItem_5'
      console.log('4.4 - FilePosition - From CmdC to Position - TS_Sce_Detect') 
      if (data.tab_3.Tab_SelectedItem !== undefined) {
        this.Tab_SelectedItem = data.tab_3.Tab_SelectedItem;
      }
      this.TS_IFU_Position() 
    }

  })
}

TS_PostData_To_File_CmdC(): void {

  const Data_Interface: Interface_CmdCToFileData = {
    id_1: this.id_1,
    id_2: '',
    id_3: '',
    id_4: '',
    tab_1: {},
    tab_2: {},
    tab_3: {},
    tab_4: {},
    tab_5: {},
    tab_6: {}
  }

  console.log('End - FilePosition', Data_Interface)
  this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_Position_To_CmdC(Data_Interface)
  
}

TS_IFU_Position(): void {
  this.TS_UpdateEmptyValuesToZero()
  this.VarS_IFU_FrontBehind = this.Tab_SelectedItem[0].FBtn_FrontBehind
  this.VarS_IFU_FrontBehindObject = this.Tab_SelectedItem[0].FBtn_FrontBehindObject
  this.VarS_IFU_PositionX = this.Tab_SelectedItem[0].FBtn_PositionX
  this.VarS_IFU_PositionY = this.Tab_SelectedItem[0].FBtn_PositionY
  this.VarS_IFU_PositionX_1 = this.Tab_SelectedItem[0].FBtn_PositionX_1
  this.VarS_IFU_PositionY_1 = this.Tab_SelectedItem[0].FBtn_PositionY_1
  this.TS_PostData_To_File_CmdC()
}

private TS_UpdateEmptyValuesToZero(): void {
  this.Tab_SelectedItem.forEach(item => {
      Object.keys(item).forEach(key => {
          if (item[key] === '' || item[key] == null) {
              item[key] = 0;
          }
      });
  });
}

TS_Sce_Update_Ressources_T_Button() { 
    if (this.Tab_SelectedItem && this.Tab_SelectedItem.length > 0) {
        console.log('this.FBtn_Id', this.Tab_SelectedItem[0].FBtn_Id);
        const { FBtn_PositionX_1, FBtn_PositionY_1, ...rest } = this.Tab_SelectedItem[0];
        const newItem = {
            ...rest, // Utilisation du reste de propriétés après avoir exclu les deux non désirées
            FBtn_FrontBehind: this.VarS_IFU_FrontBehind,
            FBtn_FrontBehindObject: this.VarS_IFU_FrontBehindObject,
            FBtn_PositionX: this.VarS_IFU_PositionX,
            FBtn_PositionY: this.VarS_IFU_PositionY,
        };
        this.Tab_SelectedItem_Update = [newItem];
        console.log('this.Tab_SelectedItem_Update', this.Tab_SelectedItem_Update);
        console.log('this.Tab_SelectedItem', this.Tab_SelectedItem);
        console.log('this.Tab_SelectedItem_Update[0].FBtn_FrontBehind', this.Tab_SelectedItem_Update[0].FBtn_FrontBehind);
        console.log('this.Tab_SelectedItem_Update[0].FBtn_FrontBehind', this.Tab_SelectedItem[0].FBtn_PositionX);
    } else {
        console.error('No selected item with a valid FBtn_Id to update.');
    }
    this.TS_PostData_To_File_CmdC()
}

/*
    const dataToSend: Partial<Interface_CommunicationData> = {
        Tab_SelectedItem_Update: this.Tab_SelectedItem_Update
    };
    this.id = '3_Post_Data_From_FileUI_Update_1'
    console.log('Start - FilePosition - TS_PostData_To_File_CmdC: Tab_SelectedItem_Update', this.Tab_SelectedItem_Update);
    console.log('Start1',this.id)
    console.log('Start2',dataToSend)
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_From_UI_To_CmdC(this.id);
    setTimeout(() => { this.S8o8o5ServicecenterService.TS_Sce_SendData_Tab_From_UI_To_CmdC(dataToSend) }, 1);*/


































public VarS_IFU_FrontBehind: string = '';
public VarS_IFU_FrontBehindObject: string = '';
public VarS_IFU_PositionX: string = '';
public VarS_IFU_PositionY: string = '';
public VarS_IFU_PositionX_1: string = '';
public VarS_IFU_PositionY_1: string = ''; 
private Var_Subscription?: Subscription;
TS_GetData_From_FileSettings(): void {
  this.Var_Subscription = this.S8o8o3SceCommunicationService.TS_Sce_Detect_From_FileSettings$.subscribe(data => {
    if (data) {
      this.Tab_SelectedItem = data.Tab_SelectedItem;
      this.VarS_IFU_FrontBehind = this.Tab_SelectedItem[0].FBtn_FrontBehind;
      this.VarS_IFU_FrontBehindObject = this.Tab_SelectedItem[0].FBtn_FrontBehindObject;
      this.VarS_IFU_PositionX = this.Tab_SelectedItem[0].FBtn_PositionX;
      this.VarS_IFU_PositionY = this.Tab_SelectedItem[0].FBtn_PositionY;
      this.VarS_IFU_PositionX_1 = this.Tab_SelectedItem[0].FBtn_PositionX_1;
      this.VarS_IFU_PositionY_1 = this.Tab_SelectedItem[0].FBtn_PositionY_1;
      console.log('Terminé - FilePosition - TS_GetData_From_FileSettings: Tab_SelectedItem', this.Tab_SelectedItem);
    }
  });

}


@Input() Input_VarS_IFU_Recherche: string | number | null = null;


private Var_DataSubscription: Subscription = new Subscription();
private Var_DataSubscription_2: Subscription = new Subscription();
TS_Get_Data_From_FileDatabase(){
  console.log('147')
  if (this.Input_VarS_IFU_Recherche !== null) {
    const dataObservable = this.S8o8o3SceCommunicationService.List_SendData_From_FileDatabase_To_OtherFile_ById(String(this.Input_VarS_IFU_Recherche));
    if (dataObservable) {
      this.Var_DataSubscription = dataObservable.subscribe((data: any)  => {
          if (data) {
          this.TS_UpdateComponentProperties(data);
          }
      });
    }
    const dataObservable_2 = this.S8o8o3SceCommunicationService.List_SendData_From_FileDatabase_To_OtherFile_ById_2(String(this.VarS_IFU_FrontBehindObject));
    if (dataObservable_2) {
      this.Var_DataSubscription_2 = dataObservable_2.subscribe((data: any)  => {
          if (data) {
          this.TS_UpdateComponentProperties_2(data);
          }
      });
    }     
  };
}
private TS_UpdateComponentProperties(data: any): void {
  this.VarS_IFU_FrontBehind = data.FrontBehind;
  this.VarS_IFU_FrontBehindObject = data.FrontBehindObject;
  this.VarS_IFU_PositionX = data.PositionX;
  this.VarS_IFU_PositionY = data.PositionY;
}
VarS_IFU_FrontBehind_2: string = '';
VarS_IFU_FrontBehindObject_2: string = '';
private TS_UpdateComponentProperties_2(data: any): void {
  this.VarS_IFU_FrontBehind_2 = data.FrontBehind_2;
  this.VarS_IFU_FrontBehindObject_2 = data.FrontBehindObject_2;
  /*
  this.VarS_IFU_PositionX_2 = data.PositionX_2;
  this.VarS_IFU_PositionY_2 = data.PositionY_2;
  */
}



@Output() Output_from_VarS_IFU_Position_Emit: EventEmitter<any[]> = new EventEmitter<any[]>();
TS_Actual_VarS_IFU_Position() {
  this.Output_from_VarS_IFU_Position_Emit.emit([
      this.Input_VarS_IFU_Recherche, 
      this.VarS_IFU_FrontBehind,
      this.VarS_IFU_FrontBehindObject,
      this.VarS_IFU_PositionX,
      this.VarS_IFU_PositionY
  ]);
  const buttonDetailsToSend = {
    Input_VarS_IFU_Recherche: this.Input_VarS_IFU_Recherche,
    VarS_IFU_FrontBehind: this.VarS_IFU_FrontBehind,
    VarS_IFU_FrontBehindObject: this.VarS_IFU_FrontBehindObject,
    VarS_IFU_PositionX: this.VarS_IFU_PositionX,
    VarS_IFU_PositionY: this.VarS_IFU_PositionY,
  }; 
  if (this.Input_VarS_IFU_Recherche !== null && typeof this.Input_VarS_IFU_Recherche === 'string') {
    this.S8o8o3SceCommunicationService.TS_Activate_Sce_SendData_From_FilePosition_To_OtherFile_4(this.Input_VarS_IFU_Recherche, buttonDetailsToSend);
  }
}

private subscriptions: Subscription[] = [];
public receivedData: any[] = [];

public Tab_ActualDataPosition: any[] = [];
VarS_IFU_PositionX_2: string = '';
VarS_IFU_PositionY_2: string = '';
TS_Activate_Sce_SendData_From_FileRessources() {
  const sub = this.S8o8o3SceCommunicationService.Activate_Sce_SendData_From_FileRessources$.subscribe((id_5: string | number) => {
    if (id_5 === 'Tab_ActualDataPosition') {
        const observable = this.S8o8o3SceCommunicationService.List_Activate_SendData_From_FileRessources_To_OtherFile_ById_5(String(id_5));
        if (observable) {
            const innerSub = observable.subscribe(data => {
                if (data) {
                    this.receivedData = data;
                    for (const item of this.receivedData) {
                        if (Number(item.Input_VarS_IFU_Recherche) === Number(this.Input_VarS_IFU_Recherche)) {
                            this.VarS_IFU_PositionX_1 = item.Positions_X1;
                            this.VarS_IFU_PositionY_1 = item.Positions_Y1;
                        }
                        try {
                          if (Number(item.Input_VarS_IFU_Recherche) === Number(this.VarS_IFU_FrontBehindObject)) {
                                console.log('Entered the condition!');
                                this.VarS_IFU_PositionX_2 = item.Positions_X1;
                                this.VarS_IFU_PositionY_2 = item.Positions_Y1;
                            } else {
                                console.log('Did not enter the condition.');
                            }
                        } catch (error) {
                            console.error('Error encountered:', error);
                        }                       
                    }
                }
            });
            this.subscriptions.push(innerSub); 
        }
    }
  });
}

TS_Activate_Sce_SendData_From_FileDraggable(): void {
  const sub = this.S8o8o3SceCommunicationService.Activate_Sce_SendData_From_FileDraggable$.subscribe((id_6: string | number) => {
      if (id_6 === this.Input_VarS_IFU_Recherche) {
          console.log("Input_VarS_IFU_Recherche value:", this.Input_VarS_IFU_Recherche);
          const observable = this.S8o8o3SceCommunicationService.List_Activate_SendData_From_FileDraggable_To_OtherFile_ById_6(String(id_6)); 
          if (observable) {
              const innerSub = observable.subscribe(data => {
                if (data) {
                  console.log(6)
                  console.log(data.Client_VarS_IFU_PositionX)
                  console.log(data.Client_VarS_IFU_PositionY)
                  this.VarS_IFU_PositionX = data.Client_VarS_IFU_PositionX;
                  this.VarS_IFU_PositionY = data.Client_VarS_IFU_PositionY;
                } else {
                  console.error("Data is null for ID:", id_6);
               }
              }, error => {
                  console.error("Erreur lors de la souscription:", error);
              });
              this.subscriptions.push(innerSub);
          } else {
              console.error("La méthode n'a pas renvoyé d'observable.");
          }
      }
  });
  this.subscriptions.push(sub);
}

/* 
Debut : From Front to DB - Traitement Output Variables 
Button Update
*/
Var_Recherche: string | number | null = null;
TS_Sce_Update_Ressources_T_Button2() {
  if (this.Input_VarS_IFU_Recherche !== null) {
      this.Var_Recherche = parseInt(this.Input_VarS_IFU_Recherche.toString(), 10);
  } else {
          this.Var_Recherche = null;
      }
  if (typeof this.Var_Recherche === 'number') 
      {
          const updatedButton = {
            FBtn_Id: this.Var_Recherche,
            FBtn_FrontBehind: this.VarS_IFU_FrontBehind,
            FBtn_FrontBehindObject: this.VarS_IFU_FrontBehindObject,
            FBtn_PositionX: this.VarS_IFU_PositionX, 
            FBtn_PositionY: this.VarS_IFU_PositionY,
              
          } as T_Button;
          this.S8o8o1RessourcesService.TS_Sce_UpdateButton_From_UI_To_DB(updatedButton).subscribe(response => {console.log(response);});
          this.S8o8o4NotifyResourceUpdatedService.TS_Sce_Notify_UpdateButton_From_UI_To_FileDB();
      }
}







 
























/* A supprimer */

@Input() Input_RT_VarXY_Position_X: any;
@Input() Input_RT_VarXY_Position_Y: any;

/*
s8o1o9o1-input.component.html
{{  Input_RT_VarXY_Position_X }}
{{  Input_RT_VarXY_Position_Y }}
*/

@NgModule({
  imports: [ FormsModule ],
})


@Input() Input_Tab_ActualDataPosition: any[] = [];
ngOnChanges(changes: SimpleChanges): void {
  if (changes['Input_Tab_ActualDataPosition'] && changes['Input_Tab_ActualDataPosition'].currentValue) {
    const newPositionData = changes['Input_Tab_ActualDataPosition'].currentValue;  
    const filteredData = newPositionData.filter((item: any) => item.Input_VarS_IFU_Recherche == this.Input_VarS_IFU_Recherche);        
    console.log('Données filtrées:', filteredData);
  if (filteredData.length > 0) {            
    console.log('Valeur de VarS_IFU_PositionX avant mise à jour:', this.VarS_IFU_PositionX_1);
    this.VarS_IFU_PositionX_1 = parseFloat(filteredData[0].VarS_IFU_PositionX_1).toString();
    this.VarS_IFU_PositionY_1 = parseFloat(filteredData[0].VarS_IFU_PositionY_1).toString();
    console.log('Valeur de VarS_IFU_PositionX après mise à jour:', this.VarS_IFU_PositionX_1);
    this.cdRef.detectChanges();
  }
  }
}

@Output() Output_from_VarS_IFU_FrontBehindObject = new EventEmitter<string>();
TS_Change_VarS_IFU_FrontBehindObject() {
  this.Output_from_VarS_IFU_FrontBehindObject.emit(this.VarS_IFU_FrontBehindObject);
  // Envoyez la valeur à travers le service:
  const buttonDetailsToSend = {
    VarS_IFU_FrontBehindObject: this.VarS_IFU_FrontBehindObject,
  }; 
  this.S8o8o3SceCommunicationService.TS_Sce_SendData_From_FilePosition_To_OtherFile_3(this.VarS_IFU_FrontBehindObject, buttonDetailsToSend);
}


}


