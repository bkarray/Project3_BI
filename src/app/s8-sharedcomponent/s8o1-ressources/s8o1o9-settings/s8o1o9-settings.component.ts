/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';

/* Importation: Interface - Command Center */
import { Interface_Tab_IFU_Recherche } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_CommunicationData } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Update } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Position } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { data } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';

/* Importation : Interface - Service */
import { Interface_CmdCToFileData } from '../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

/* Importation : Service */
import { S8o8o1RessourcesService } from '../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';
import { S8o8o2SceDatabaseService } from '../../s8o8-services/s8o8o2-sce-database/s8o8o2-sce-database.service';
import { S8o8o3SceCommunicationService } from '../../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service';
import { S8o8o4NotifyResourceUpdatedService } from '../../s8o8-services/s8o8o4-NotifyResourceUpdated/s8o8o4-notify-resource-updated.service';
import { S8o8o5ServicecenterService } from '../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

/* Importation : Table T_Button */
import { T_Button } from '../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';

@Component({
  selector: 'app-s8o1o9-settings',
  templateUrl: './s8o1o9-settings.component.html',
  styleUrls: ['./s8o1o9-settings.component.css']
})
export class S8o1o9SettingsComponent implements OnInit {

  constructor(
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    private S8o8o2SceDatabaseService: S8o8o2SceDatabaseService,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService,
    private S8o8o4NotifyResourceUpdatedService: S8o8o4NotifyResourceUpdatedService,
    private S8o8o5ServicecenterService: S8o8o5ServicecenterService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef
  ){}  
  
/************************************************************     Initial    ************************************************************/

ngOnInit(): void {
  this.TS_Settings_Active()
}

TS_Settings_Active(): void {
  this.TS_GetData_From_File_CommandCenter_Tab()
}

public id_1: string | number = ''
public id_2: string | number = ''
public id_3: string | number = ''
public id_4: string | number = ''
public Tab_IFU_Recherche: Interface_Tab_IFU_Recherche[] = []
public Tab_Object: Interface_Tab_BD_Button_Detail[] = []
public Tab_SelectedItem: Interface_Tab_BD_Button_Detail[] = []
public Tab_SelectedItem_Update: Interface_Tab_BD_Button_Update[] = []

TS_GetData_From_File_CommandCenter_Tab(): void {  
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdC_To_Settings().subscribe(data => {
    this.id_1 = data.id_1

    if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_10') {
      this.id_1 = '2_Post_Data_From_FileMenuContextuel_11'
      console.log('2.10 - FileSettings - From CmdC to Settings - TS_Sce_Detect') 
      this.id_2 = data.id_2.toString()
      if (data.tab_2.Tab_Object !== undefined) {
        this.Tab_Object = data.tab_2.Tab_Object;
      }
      this.TS_Show_Item_Tab_SelectedItem()
    }

    if (this.id_1 === '3_Post_Data_From_FileObject_2') {
      this.id_1 = '3_Post_Data_From_FileObject_3'
      console.log('3.3 - FileSettings - From CmdC to Settings - TS_Sce_Detect') 
      this.id_2 = data.id_2.toString()
      if (data.tab_2.Tab_Object !== undefined) {
        this.Tab_Object = data.tab_2.Tab_Object;
      }
      this.TS_Show_Item_Tab_SelectedItem()
    }

    if (this.id_1 === '5_Post_Data_From_FileUI_Update_8') {
      this.id_1 = '5_Post_Data_From_FileUI_Update_9'
      console.log('5.8 - FileSettings - From CmdC to Settings - TS_Sce_Detect') 
      this.id_2 = data.id_2.toString()
      if (data.tab_2.Tab_Object !== undefined) {
        this.Tab_Object = data.tab_2.Tab_Object;
      }
      this.TS_Show_Item_Tab_SelectedItem()
    }
    
  })

}

TS_PostData_To_File_CmdC(): void {

  if (this.Tab_SelectedItem[0].FBtn_Id !== null) {
    this.id_3 = this.Tab_SelectedItem[0].FBtn_Id
  }
  this.id_4 = this.VarS_IFU_Object
  const TabToSend_Tab_Object: Partial<Interface_CommunicationData> = {
    Tab_Object: this.Tab_Object
  }
  const TabToSend_Tab_SelectedItem: Partial<Interface_CommunicationData> = {
    Tab_SelectedItem: this.Tab_SelectedItem
  } 
  const Data_Interface: Interface_CmdCToFileData = {
    id_1: this.id_1,
    id_2: this.id_2,
    id_3: this.id_3,
    id_4: this.id_4,
    tab_1: {},
    tab_2: TabToSend_Tab_Object,
    tab_3: TabToSend_Tab_SelectedItem,
    tab_4: {},
    tab_5: {},
    tab_6: {}
  }

  console.log('End - FileSettings - Data_Interface: ',Data_Interface) 
  this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_Settings_To_CmdC(Data_Interface)

}

/************************************************************     Traitement    ************************************************************/

VarS_IFU_Object: string = '';
TS_Show_Item_Tab_SelectedItem(): void {
  const selectedItem = this.Tab_Object.find(item => item.FBtn_Id === Number(this.id_2));
  if (selectedItem !== undefined) {
    this.Tab_SelectedItem = [selectedItem]
    this.VarS_IFU_Object = this.Tab_SelectedItem[0].FBtn_Object
  }
  this.TS_PostData_To_File_CmdC()
}

TS_Show_Item_Tab_Object(item: Interface_Tab_BD_Button_Detail): void {
  this.Tab_SelectedItem[0] = item
  this.VarS_IFU_Object = item.FBtn_Object
  this.id_1 = '4_Post_Data_From_FileSettings_SelectedItem_1'
  this.id_2 = this.Tab_SelectedItem[0].FBtn_Id !== null ? this.Tab_SelectedItem[0].FBtn_Id : 0;
  console.log('this.Tab_SelectedItem',this.Tab_SelectedItem)
  this.TS_PostData_To_File_CmdC()
}

VarB_ObjectSelected: boolean = false;
VarB_DataSelected: boolean = false;
public VarN_Selected: string | number = ''
TS_ShowObjectOptions() {
  this.VarN_Selected = 1
}
TS_ShowDataOptions() {
  this.VarN_Selected = 2
}
TS_ShowCmdCenterOptions() {
  this.VarN_Selected = 3
}


@Output() Output_Settings_Close = new EventEmitter<string>();
TS_Close_Settings(): void {
  this.Output_Settings_Close.emit('1');
}

/************************************************************     Fin Traitement    ************************************************************/



public VarB_Settings: boolean = true
TS_VarB_Settings_ButtonClick(): void {
  this.VarB_Settings = true
}


@Input() Input_Get_DB_FBtn_Object: string = '';
ngOnChanges(changes: SimpleChanges) {
  if (changes['Input_Get_DB_FBtn_Object'] && changes['Input_Get_DB_FBtn_Object'].currentValue) {
    this.VarS_IFU_Object = this.Input_Get_DB_FBtn_Object;
  }
}

@Output() Output_VarS_IFU_Object = new EventEmitter<string>();
TS_Change_VarS_IFU_Object(newName: string): void {
  this.Output_VarS_IFU_Object.emit(newName);
}

/* Debut : From Front to DB - Traitement Output Variables */
Var_Recherche: string | number | null = null;
TS_Sce_Update_Ressources_T_Button() { 
  this.Tab_Object.forEach((item, index) => {
    console.log(`Index ${index} - FBtn_FrontBehindObject:`, item.FBtn_FrontBehindObject);
  });
  if (this.Input_VarS_IFU_Recherche !== null) {
      this.Var_Recherche = parseInt(this.Input_VarS_IFU_Recherche.toString(), 10);
      } else {
      this.Var_Recherche = null;
      }
    if (typeof this.Var_Recherche === 'number') 
      {
        const updatedButton = {
            FBtn_Id: this.Var_Recherche,
            FBtn_Object: this.VarS_IFU_Object     
        } as T_Button;
        
        this.S8o8o1RessourcesService.TS_Sce_UpdateButton_From_UI_To_DB(updatedButton).subscribe(response => {console.log(response);});
        this.S8o8o4NotifyResourceUpdatedService.TS_Sce_Notify_UpdateButton_From_UI_To_FileDB();
      }
}

/* Fin : From Front to DB - Traitement Output Variables */




@Output() Output_from_VarS_IFU_FrontBehindObject = new EventEmitter<string>();
TS_UpdateOutputValue(value: string) {
    this.Output_from_VarS_IFU_FrontBehindObject.emit(value);
}

/* Get Data from FileDB - VarS_IFU_Object */
@Input() Input_VarS_IFU_Recherche: string | number | null = null;





/*
 this.S8o8o5ServicecenterService.TS_Sce_Detect_Tab_From_CmdC_To_Settings().subscribe(data => {
    if (data.Tab_Object && Array.isArray(data.Tab_Object)) {
      this.Tab_Object = data.Tab_Object;
    }
    console.log('End1 - Tab_Object', this.Tab_Object); 
    console.log('End - FileSettings - TS_GetData_From_File_CommandCenter_Tab: Tab_Object', this.Tab_Object); 
  });

  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_From_CmdC_To_Settings().subscribe(data => {

    console.log('End2 - Tab_Object', this.Tab_Object); 
    console.log('End3 - ', data.id); 

    const selectedItem = this.Tab_Object.find(item => item.FBtn_Id === Number(data.id));
    if (selectedItem !== undefined) {
      this.Tab_SelectedItem = selectedItem; 
      this.VarS_IFU_Object = this.Tab_SelectedItem.FBtn_Object;  
      const partialData: Partial<Interface_CommunicationData> = { Tab_SelectedItem: [selectedItem] }; 
      this.S8o8o5ServicecenterService.TS_Sce_SendData_Tab_From_Settings_To_CmdC(partialData);
    } else {
      this.Tab_SelectedItem = null;
    }
    console.log('End - FileSettings - TS_GetData_From_File_CommandCenter_Tab: Tab_SelectedItem', this.Tab_SelectedItem); 
  });
  */


/*
TS_PostData_To_File_CmdC1(): void {
  const dataToSend: Partial<Interface_CommunicationData> = {
    Tab_SelectedItem: this.Tab_SelectedItem ? [this.Tab_SelectedItem] : []
  };
  console.log('Start - FileSettings - TS_PostData_To_File_CmdC: Tab_BD_Button', this.Tab_SelectedItem); 
  this.id = '2_Post_Data_From_FileSettings_SelectedItem_1'
  this.S8o8o5ServicecenterService.TS_Sce_SendData_id_From_Settings_To_CmdC(this.id);
  this.S8o8o5ServicecenterService.TS_Sce_SendData_Tab_From_Settings_To_CmdC(dataToSend);  
}
*/














/*
TS_GetData_Active(): void {
  //TS_Sce_Detect_Tab_From_CmdC_To_Settings
    this.S8o8o3SceCommunicationService.getElementById().subscribe(data => {
        if (data && data.id) {
          this.id = data.id.toString(); 
          if (this.id === '3') {
            console.log('Terminé - FileSetting - TS_GetData_Active: id', this.id);
            this.TS_GetData_From_FileRessources();
          }
        }
      });
  }
*/

/*
  TS_GetData_From_FileRessources(): void {

    this.S8o8o3SceCommunicationService.TS_Sce_Detect_From_FileRessources_To_FileSettings$.subscribe(data => {
      if (data) {
        this.id = data.id;
        this.Tab_Object = data.Tab_Object;
        if (this.id === '3') {
          console.log('Terminé - FileSetting - TS_GetData_From_FileRessources: Tab_IFU_Recherche', this.Tab_Object);
          this.Tab_Object.forEach((object) => {
            console.log('aaaa',object.FBtn_Object,object.FBtn_Name,object.FBtn_Label);
          });
          console.log('sssssssssssssssssssssssssssssssssssssssss')
        }
      }
    });
  
  }
*/

/*
  TS_Sce_List_SendData_From_FileDatabase_To_OtherFile_ById() {
    if (this.Input_VarS_IFU_Recherche !== null) {
      const dataObservable = this.S8o8o3SceCommunicationService.List_SendData_From_FileDatabase_To_OtherFile_ById(String(this.Input_VarS_IFU_Recherche));
        if (dataObservable) {
          this.Var_DataSubscription = dataObservable.subscribe((data: any)  => {
              if (data) {
                this.VarS_IFU_Object = data.object;
              }
          });
        }
    }
  }
*/

}

