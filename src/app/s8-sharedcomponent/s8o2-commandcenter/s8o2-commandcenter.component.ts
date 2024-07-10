/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';

/* Importation : Service */
import { S8o8o1RessourcesService } from '../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';
import { S8o8o2SceDatabaseService } from '../s8o8-services/s8o8o2-sce-database/s8o8o2-sce-database.service';
import { S8o8o3SceCommunicationService } from '../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service';
import { S8o8o4NotifyResourceUpdatedService } from '../s8o8-services/s8o8o4-NotifyResourceUpdated/s8o8o4-notify-resource-updated.service';
import { S8o8o5ServicecenterService } from '../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

/* Importation : Interface */
import { Interface_CmdCToFileData } from '../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

@Component({
  selector: 'app-s8o2-commandcenter',
  templateUrl: './s8o2-commandcenter.component.html',
  styleUrls: ['./s8o2-commandcenter.component.css']
})

export class S8o2CommandcenterComponent implements OnInit {

  constructor(
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    private S8o8o2SceDatabaseService: S8o8o2SceDatabaseService,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService,
    private S8o8o4NotifyResourceUpdatedService: S8o8o4NotifyResourceUpdatedService,
    private S8o8o5ServicecenterService: S8o8o5ServicecenterService,
  ) { }

ngOnInit(): void {
    this.TS_CommmandCenter_Active();
}

public id_1: string | number = ''
public id_2: string | number = ''
public id_3: string | number = ''
public id_4: string | number = ''
public Tab_IFU_Recherche: Interface_Tab_IFU_Recherche[] = []
public Tab_Object: Interface_Tab_BD_Button_Detail[] = []
public Tab_SelectedItem: Interface_Tab_BD_Button_Detail[] = []
public Tab_SelectedItem_Update: Interface_Tab_BD_Button_Update[] = []

TS_Data_Interface(): Interface_CmdCToFileData {
  const TabToSend_Tab_IFU_Recherche: Partial<Interface_CommunicationData> = {
    List_VarS_IFU_Recherche: this.Tab_IFU_Recherche
  }
  const TabToSend_Tab_Object: Partial<Interface_CommunicationData> = {
    Tab_Object: this.Tab_Object
  }
  const TabToSend_Tab_SelectedItem: Partial<Interface_CommunicationData> = {
    Tab_SelectedItem: this.Tab_SelectedItem
  }
  const TabToSend_Tab_SelectedItem_Update: Partial<Interface_CommunicationData> = {
    Tab_SelectedItem_Update: this.Tab_SelectedItem_Update
  }
  const Data_Interface: Interface_CmdCToFileData = {
    id_1: this.id_1,
    id_2: this.id_2,
    id_3: this.id_3,
    id_4: this.id_4,
    tab_1: TabToSend_Tab_IFU_Recherche,
    tab_2: TabToSend_Tab_Object,
    tab_3: TabToSend_Tab_SelectedItem,
    tab_4: TabToSend_Tab_SelectedItem_Update,
    tab_5: {},
    tab_6: {}}

  return Data_Interface
}

TS_CommmandCenter_Active(): void {
  this.TS_GetData_1()
  this.TS_GetData_2()
  this.TS_GetData_3()
  this.TS_GetData_4()
  this.TS_GetData_5()
  this.TS_GetData_6()
  this.TS_GetData_7()
  this.TS_GetData_8()
  this.TS_GetData_9()
  this.TS_GetData_10()
  this.TS_GetData_11()
  this.TS_GetData_12()

}


//...........................................................................1_From_FileRessources_GetButton
//TS_GetData_1 
TS_GetData_1(): void {
  this.TS_GetData_1_From_File_Ressources()
  this.TS_GetData_1_From_File_Database()
  this.TS_GetData_1_From_File_GestionData()
  this.TS_GetData_1_From_File_Draggable()
}
TS_GetData_1_From_File_Ressources(): void {
    this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_R_To_CmdC().subscribe(data => {
      this.id_1 = data.id_1
      if (this.id_1 === '1_Post_Data_From_FileRessources_GetButton_1') {
        this.id_1 = '1_Post_Data_From_FileRessources_GetButton_2'
        console.log('1.1 - FileCmdC - From Ressources to CmdC - GetData')
        if (data.tab_1.List_VarS_IFU_Recherche !== undefined) {
          this.Tab_IFU_Recherche = data.tab_1.List_VarS_IFU_Recherche
        }
        const Data_Interface = this.TS_Data_Interface()
        this.TS_PostData_1_To_File_Database(Data_Interface)
      }
    }) 
}
TS_GetData_1_From_File_Database(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Database_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '1_Post_Data_From_FileRessources_GetButton_3') {
      this.id_1 = '1_Post_Data_From_FileRessources_GetButton_4'
      console.log('1.3 - FileCmdC - From Database to CmdC - GetData')
      if (data.tab_2.Tab_Object !== undefined) {
        this.Tab_Object = data.tab_2.Tab_Object;
      }
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_1_To_File_GestionData(Data_Interface)
    }
  })
}
TS_GetData_1_From_File_GestionData(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Gestion_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '1_Post_Data_From_FileRessources_GetButton_5') {
      this.id_1 = '1_Post_Data_From_FileRessources_GetButton_6'
      console.log('1.5 - FileCmdC - From GestionData to CmdC - GetData')
      if (data.tab_2.Tab_Object !== undefined) {
        this.Tab_Object = data.tab_2.Tab_Object;
      }
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_1_To_File_Draggable(Data_Interface)
    }
  })
}
TS_GetData_1_From_File_Draggable(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Draggable_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '1_Post_Data_From_FileRessources_GetButton_7') {
      console.log('End - FileCmdC - Data_Interface',this.id_1,this.Tab_IFU_Recherche,this.Tab_Object)
    }
  })
}
//TS_PostData_1
TS_PostData_1_To_File_Database(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '1_Post_Data_From_FileRessources_GetButton_2') {
    console.log('1.2 - FileCmdC - From CmdC to Database - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Database(Data_Interface); 
  }
}
TS_PostData_1_To_File_GestionData(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '1_Post_Data_From_FileRessources_GetButton_4') {
    console.log('1.4 - FileCmdC - From CmdC to GestionData - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Gestion(Data_Interface);
  }
}
TS_PostData_1_To_File_Draggable(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '1_Post_Data_From_FileRessources_GetButton_6') {
    console.log('1.6 - FileCmdC - From CmdC to Draggable - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Draggable(Data_Interface);
  }
}


//...........................................................................2_Post_Data_From_FileMenuContextuel_Settings
//TS_GetData_2
TS_GetData_2(): void {
  this.TS_GetData_2_From_File_MenuC()
  this.TS_GetData_2_From_File_Ressources()
  this.TS_GetData_2_From_File_Database()
  this.TS_GetData_2_From_File_GestionData()
  this.TS_GetData_2_From_File_Draggable()
  this.TS_GetData_2_From_File_Settings()
  this.TS_GetData_2_From_File_UI()
  this.TS_GetData_2_From_File_Position()
}
TS_GetData_2_From_File_MenuC(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_MenuC_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_1') {
      this.id_1 = '2_Post_Data_From_FileMenuContextuel_2'
      console.log('2.1 - FileCmdC - From MenuC to CmdC - GetData')
      this.id_2 = data.id_2
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_2_To_File_Ressources(Data_Interface)
    }
  })
}
TS_GetData_2_From_File_Ressources(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_R_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_3') {
      this.id_1 = '2_Post_Data_From_FileMenuContextuel_4'
      console.log('2.3 - FileCmdC - From Ressources to CmdC - GetData')
      if (data.tab_1.List_VarS_IFU_Recherche !== undefined) {
        this.Tab_IFU_Recherche = data.tab_1.List_VarS_IFU_Recherche
      }
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_2_To_File_Database(Data_Interface)
    }
  }) 
}
TS_GetData_2_From_File_Database(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Database_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_5') {
      this.id_1 = '2_Post_Data_From_FileMenuContextuel_6'
      console.log('2.5 - FileCmdC - From Database to CmdC - GetData')
      if (data.tab_2.Tab_Object !== undefined) {
        this.Tab_Object = data.tab_2.Tab_Object;
      }
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_2_To_GestionData(Data_Interface)
    }
  })
}
TS_GetData_2_From_File_GestionData(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Gestion_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_7') {
      this.id_1 = '2_Post_Data_From_FileMenuContextuel_8'
      console.log('2.7 - FileCmdC - From GestionData to CmdC - GetData')
      if (data.tab_2.Tab_Object !== undefined) {
        this.Tab_Object = data.tab_2.Tab_Object;
      }
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_2_To_File_Draggable(Data_Interface)
    }
  })
}
TS_GetData_2_From_File_Draggable(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Draggable_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_9') {
      this.id_1 = '2_Post_Data_From_FileMenuContextuel_10'
      console.log('2.9 - FileCmdC - From Draggable to CmdC - GetData')  
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_2_To_File_Settings(Data_Interface) 
    }
  })
}
TS_GetData_2_From_File_Settings(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Settings_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_11') {
      this.id_1 = '2_Post_Data_From_FileMenuContextuel_12'
      console.log('2.11 - FileCmdC - From Settings to CmdC - GetData')
      if (data.tab_3.Tab_SelectedItem !== undefined) {
        this.Tab_SelectedItem = data.tab_3.Tab_SelectedItem;
      }
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_2_To_File_UI(Data_Interface)
    }
  })
}
TS_GetData_2_From_File_UI(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_UI_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_13') {
      this.id_1 = '2_Post_Data_From_FileMenuContextuel_14'
      console.log('2.13 - FileCmdC - From Settings to CmdC - GetData')
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_2_To_File_Position(Data_Interface) 
    }
  })
}
TS_GetData_2_From_File_Position(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Position_To_CmdC().subscribe(data => {
    if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_15') {
      console.log('End - FileCmdC - Data_Interface')
    }
  })
}
//TS_PostData_2
TS_PostData_2_To_File_Ressources(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_2') {
    console.log('2.2 - FileCmdC - From CmdC to Ressources - PostData')
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_R(Data_Interface)
  }
}
TS_PostData_2_To_File_Database(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_4') {
    console.log('2.4 - FileCmdC - From CmdC to Database - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Database(Data_Interface); 
  }
}
TS_PostData_2_To_GestionData(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_6') {
    console.log('2.6 - FileCmdC - From CmdC to GestionData - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Gestion(Data_Interface);
  }
}
TS_PostData_2_To_File_Draggable(Data_Interface: Interface_CmdCToFileData): void { //VarB_ShowSettings = true
  if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_8') {
    console.log('2.8 - FileCmdC - From CmdC to Draggable - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Draggable(Data_Interface)

  }
}
TS_PostData_2_To_File_Settings(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_10') {
    console.log('2.10 - FileCmdC - From CmdC to Settings - PostData',Data_Interface) 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Settings(Data_Interface)
  }
}
TS_PostData_2_To_File_UI(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_12') {
    console.log('2.12 - FileCmdC - From CmdC to UI - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_UI(Data_Interface)
  }
}
TS_PostData_2_To_File_Position(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_14') {
    console.log('2.14 - FileCmdC - From CmdC to Position - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Position(Data_Interface)
  }
}


//...........................................................................3_From_FileObject
//TS_GetData_3 
TS_GetData_3(): void {
  this.TS_GetData_3_From_File_Object()
  this.TS_GetData_3_From_File_Settings()
  this.TS_GetData_3_From_File_UI()
  this.TS_GetData_3_From_File_Position()
}
TS_GetData_3_From_File_Object(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Object_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '3_Post_Data_From_FileObject_1') {
      this.id_1 = '3_Post_Data_From_FileObject_2'
      console.log('3.2 - FileCmdC - From Object to CmdC - GetData')
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_3_To_File_Settings(Data_Interface)
    }
  })
}
TS_GetData_3_From_File_Settings(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Settings_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '3_Post_Data_From_FileObject_3') {
      this.id_1 = '3_Post_Data_From_FileObject_4'
      console.log('3.3 - FileCmdC - From Object to CmdC - GetData')
      this.id_2 = data.id_2
      this.id_3 = data.id_3
      this.id_4 = data.id_4
      if (data.tab_2.Tab_Object !== undefined) {
        this.Tab_Object = data.tab_2.Tab_Object;
      }
      if (data.tab_3.Tab_SelectedItem !== undefined) {
        this.Tab_SelectedItem = data.tab_3.Tab_SelectedItem;
      }
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_3_To_File_UI(Data_Interface)
    }
  })
}
TS_GetData_3_From_File_UI(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_UI_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '3_Post_Data_From_FileObject_5') {
      this.id_1 = '3_Post_Data_From_FileObject_6'
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_3_To_File_Position(Data_Interface) 
    }
  })
}
TS_GetData_3_From_File_Position(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Position_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '3_Post_Data_From_FileObject_7') {
      console.log('Final - FileCmdC - Data_Interface',this.id_1,this.id_2)
    }
  })
}

//TS_PostData_3 
TS_PostData_3_To_File_Settings(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '3_Post_Data_From_FileObject_2') {
    console.log('3.2 - FileCmdC - From CmdC to Settings - PostData',Data_Interface) 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Settings(Data_Interface)
  }
}
TS_PostData_3_To_File_UI(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '3_Post_Data_From_FileObject_4') {
    console.log('3.4 - FileCmdC - From CmdC to UI - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_UI(Data_Interface)
  }
}
TS_PostData_3_To_File_Position(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '3_Post_Data_From_FileObject_6') {
    console.log('3.4 - FileCmdC - From CmdC to Position - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Position(Data_Interface)
  }
}

//...........................................................................4_From_FileSettings_SelectedItem
//TS_GetData_4 
TS_GetData_4(): void {
  this.TS_GetData_4_From_File_Settings()
  this.TS_GetData_4_From_File_UI()
  this.TS_GetData_4_From_File_Position()
}
TS_GetData_4_From_File_Settings(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Settings_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '4_Post_Data_From_FileSettings_SelectedItem_1') {
      this.id_1 = '4_Post_Data_From_FileSettings_SelectedItem_2'
      console.log('4.1 - FileCmdC - From Settings to CmdC - GetData')
      this.id_2 = data.id_2
      if (data.tab_3.Tab_SelectedItem !== undefined) {
        this.Tab_SelectedItem = data.tab_3.Tab_SelectedItem;
      }
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_4_To_File_UI(Data_Interface) 
    }
  })
}
TS_GetData_4_From_File_UI(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_UI_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '4_Post_Data_From_FileSettings_SelectedItem_3') {
      this.id_1 = '4_Post_Data_From_FileSettings_SelectedItem_4'
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_4_To_File_Position(Data_Interface) 
    }
  })
}
TS_GetData_4_From_File_Position(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Position_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '4_Post_Data_From_FileSettings_SelectedItem_5') {
      console.log('Final - FileCmdC - Data_Interface',this.id_1,this.id_2)
    }
  })
}

//TS_PostData_4
TS_PostData_4_To_File_UI(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '4_Post_Data_From_FileSettings_SelectedItem_2') {
    console.log('4.2 - FileCmdC - From CmdC to UI - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_UI(Data_Interface)
  }
}
TS_PostData_4_To_File_Position(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '4_Post_Data_From_FileSettings_SelectedItem_4') {
    console.log('4.4 - FileCmdC - From CmdC to Position - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Position(Data_Interface)
  }
}


//...........................................................................5_Post_Data_From_FileUI_Update
//TS_GetData_5 
TS_GetData_5(): void {
  this.TS_GetData_5_From_File_UI()
  this.TS_GetData_5_From_File_Ressources()
  this.TS_GetData_5_From_File_Database()
  this.TS_GetData_5_From_File_GestionData()
}
TS_GetData_5_From_File_UI(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_UI_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '5_Post_Data_From_FileUI_Update_1') {
      this.id_1 = '5_Post_Data_From_FileUI_Update_2'
      console.log('5 - From UI to CmdC - GetData')
      if (data.tab_4.Tab_SelectedItem_Update !== undefined) {
        this.Tab_SelectedItem_Update = data.tab_4.Tab_SelectedItem_Update;
      }
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_5_To_File_Ressources(Data_Interface)
    }
  })
}
TS_GetData_5_From_File_Ressources(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_R_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '5_Post_Data_From_FileUI_Update_3') {
      this.id_1 = '5_Post_Data_From_FileUI_Update_4'
      console.log('5.3 - FileCmdC - From Ressources to CmdC - GetData')
      if (data.tab_1.List_VarS_IFU_Recherche !== undefined) {
        this.Tab_IFU_Recherche = data.tab_1.List_VarS_IFU_Recherche
      }
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_5_To_File_Database(Data_Interface)
    }
  }) 
}
TS_GetData_5_From_File_Database(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Database_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '5_Post_Data_From_FileUI_Update_5') {
      this.id_1 = '5_Post_Data_From_FileUI_Update_6'
      console.log('5.5 - FileCmdC - From Database to CmdC - GetData')
      if (data.tab_2.Tab_Object !== undefined) {
        this.Tab_Object = data.tab_2.Tab_Object;
      }
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_5_To_File_GestionData(Data_Interface)
    }
  })
}
TS_GetData_5_From_File_GestionData(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Gestion_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '5_Post_Data_From_FileUI_Update_7') {
      this.id_1 = '5_Post_Data_From_FileUI_Update_8'
      console.log('5.7 - FileCmdC - From GestionData to CmdC - GetData')
      if (data.tab_2.Tab_Object !== undefined) {
        this.Tab_Object = data.tab_2.Tab_Object;
      }
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_5_To_File_Settings(Data_Interface)
    }
  })
}
TS_GetData_5_From_File_Settings(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Settings_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '5_Post_Data_From_FileUI_Update_9') {
      this.id_1 = '5_Post_Data_From_FileUI_Update_10'
      console.log('5.9 - FileCmdC - From Settings to CmdC - GetData')
      if (data.tab_3.Tab_SelectedItem !== undefined) {
        this.Tab_SelectedItem = data.tab_3.Tab_SelectedItem;
      }
      const Data_Interface = this.TS_Data_Interface()
      console.log('Final - 5_Post_Data_From_FileUI_Update - FileCmdC - Data_Interface',Data_Interface)
    }
  })
}

//TS_PostData_5
TS_PostData_5_To_File_Ressources(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '5_Post_Data_From_FileUI_Update_2') {
    console.log('5.2 - FileCmdC - From CmdC to Ressources - PostData')
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_R(Data_Interface)
  }
}
TS_PostData_5_To_File_Database(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '5_Post_Data_From_FileUI_Update_4') {
    console.log('5.4 - From CmdC to Database - PostData')
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Database(Data_Interface); 
  }
}
TS_PostData_5_To_File_GestionData(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '5_Post_Data_From_FileUI_Update_6') {
    console.log('5.6 - From CmdC to GestionData - PostData')
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Gestion(Data_Interface); 
  }
}
TS_PostData_5_To_File_Settings(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '5_Post_Data_From_FileUI_Update_8') {
    console.log('5.7 - From CmdC to Settings - PostData')
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Settings(Data_Interface)
  }
}



//...........................................................................6_Post_Data_From_FileRessources_Services_1
TS_GetData_6(): void {
  this.TS_GetData_6_From_File_Ressources()
}
TS_GetData_6_From_File_Ressources(): void {
    this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_R_To_CmdC().subscribe(data => {
      this.id_1 = data.id_1

      if (this.id_1 === '6_Post_Data_From_FileRessources_Services_1') {
        this.id_1 = '6_Post_Data_From_FileRessources_Services_2'
        console.log('6.1 - FileCmdC - From Ressources to CmdC - Services')
        const Data_Interface = this.TS_Data_Interface()
        this.TS_PostData_6_To_File_Services(Data_Interface)
      }
    }) 
}
TS_PostData_6_To_File_Services(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '6_Post_Data_From_FileRessources_Services_2') {
    console.log('6.2 - FileCmdC - From CmdC to Services - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Services(Data_Interface); 
  }
}



//...........................................................................7_Post_Data_From_FileRessources_CmdCenter_1
TS_GetData_7(): void {
  this.TS_GetData_7_From_File_Ressources()
  this.TS_GetData_7_From_File_Draggable()
  this.TS_GetData_7_From_File_CmdCenter()
}
TS_GetData_7_From_File_Ressources(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_R_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1

    if (this.id_1 === '7_Post_Data_From_FileRessources_CmdCenter_1') {
      this.id_1 = '7_Post_Data_From_FileRessources_CmdCenter_2'
      console.log('7.1 - FileCmdC - From Ressources to CmdC - GetData')
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_7_To_File_Draggable(Data_Interface)
    }
  }) 
}
TS_GetData_7_From_File_Draggable(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Draggable_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '7_Post_Data_From_FileRessources_CmdCenter_3') {
      this.id_1 = '7_Post_Data_From_FileRessources_CmdCenter_4'
      console.log('7.3 - FileCmdC - From Draggable to CmdC - GetData')  
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_7_To_File_CmdCenter(Data_Interface) 
    }
  })
}
TS_GetData_7_From_File_CmdCenter(): void {
    this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdCenter_To_CmdC().subscribe(data => {
      this.id_1 = data.id_1

      if (this.id_1 === '7_Post_Data_From_FileRessources_CmdCenter_5') {
        this.id_1 = '7_Post_Data_From_FileRessources_CmdCenter_6'
        console.log('7.5 - Final - FileCmdC - From CmdCenter to CmdCenter - GetData')
      }
    }) 
}


TS_PostData_7_To_File_Draggable(Data_Interface: Interface_CmdCToFileData): void { //VarB_ShowSettings = true
  if (this.id_1 === '7_Post_Data_From_FileRessources_CmdCenter_2') {
    console.log('7.2 - FileCmdC - From CmdC to Draggable - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Draggable(Data_Interface)

  }
}
TS_PostData_7_To_File_CmdCenter(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '7_Post_Data_From_FileRessources_CmdCenter_4') {
    console.log('7.4 - FileCmdC - From CmdCenter to CmdCenter - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_CmdCenter(Data_Interface); 
  }
}



//...........................................................................8_Post_Data_From_CmdCenterDetail_1
TS_GetData_8(): void {
  this.TS_GetData_8_From_File_CmdCenter()
  this.TS_GetData_8_From_File_CmdCenterDetail()
}

TS_GetData_8_From_File_CmdCenter(): void {
    this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdCenter_To_CmdC().subscribe(data => {
      this.id_1 = data.id_1
      if (this.id_1 === '8_Post_Data_From_CmdCenterDetail_1') {
        this.id_1 = '8_Post_Data_From_CmdCenterDetail_2'
        console.log('8.1 - FileCmdC - From CmdCenterDetail to CmdCenter - GetData')
        const Data_Interface = this.TS_Data_Interface()
        this.TS_PostData_8_To_File_CmdCenterDetail(Data_Interface) 
        }
    }) 
}
TS_GetData_8_From_File_CmdCenterDetail(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdCenterDetail_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '8_Post_Data_From_CmdCenterDetail_3') {
      this.id_1 = '8_Post_Data_From_CmdCenterDetail_4'
      console.log('8.3 - FileCmdC - From CmdCenterDetail to CmdCenter - GetData')
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_8_To_File_CmdCenter(Data_Interface) 
      }
  }) 
}


TS_PostData_8_To_File_CmdCenterDetail(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '8_Post_Data_From_CmdCenterDetail_2') {
    console.log('8.2 - FileCmdC - From CmdCenter to CmdCenterDetail - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_CmdCenterDetail(Data_Interface); 
  }
}
TS_PostData_8_To_File_CmdCenter(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '8_Post_Data_From_CmdCenterDetail_4') {
    console.log('8.4 - FileCmdC - From CmdCenter to CmdCenterDetail - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_CmdCenter(Data_Interface); 
  }
}


//...........................................................................9_Post_Data_From_CmdCenterDetail_Return_1
TS_GetData_9(): void {
  this.TS_GetData_9_From_File_CmdCenterDetail()
}
TS_GetData_9_From_File_CmdCenterDetail(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdCenterDetail_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '9_Post_Data_From_CmdCenterDetail_Return_1') {
      this.id_1 = '9_Post_Data_From_CmdCenterDetail_Return_2'
      console.log('9.1 - FileCmdC - From CmdCenterDetail to CmdCenter - GetData')
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_9_To_File_CmdCenter(Data_Interface) 
      }
  }) 
}
TS_PostData_9_To_File_CmdCenter(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '9_Post_Data_From_CmdCenterDetail_Return_2') {
    console.log('9.2 - FileCmdC - From CmdCenter to CmdCenterDetail - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_CmdCenter(Data_Interface); 
  }
}


//...........................................................................10_Post_Data_From_CmdCenter
TS_GetData_10(): void {
  this.TS_GetData_10_From_File_CmdCenter3()
}
TS_GetData_10_From_File_CmdCenter3(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdCenter3_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '10_Post_Data_From_CmdCenter_1') {
      this.id_1 = '10_Post_Data_From_CmdCenter_2'
      console.log('10.1 - FileCmdC - From CmdCenterDetail to CmdCenter - GetData')
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_10_From_File_CmdCenter3(Data_Interface) 
      }
  }) 
}
TS_PostData_10_From_File_CmdCenter3(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '10_Post_Data_From_CmdCenter_2') {
    console.log('10.2 - FileCmdC - From CmdCenter to CmdCenterDetail - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_CmdCenter3(Data_Interface); 
  }
}


//...........................................................................11_Post_Data_From_TS_Variable_ButtonClick_1
TS_GetData_11(): void {
  this.TS_GetData_11_From_File_Ressources()
  this.TS_GetData_11_From_File_Draggable()
}
TS_GetData_11_From_File_Ressources(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_R_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '11_Post_Data_From_TS_Variable_ButtonClick_1') {
      this.id_1 = '11_Post_Data_From_TS_Variable_ButtonClick_2'
      console.log('11.1 - FileCmdC - From Ressources - GetData')
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_11_To_File_Draggable(Data_Interface) 
      }
  }) 
}
TS_GetData_11_From_File_Draggable(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Draggable_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '11_Post_Data_From_TS_Variable_ButtonClick_3') {
      this.id_1 = '11_Post_Data_From_TS_Variable_ButtonClick_4'
      console.log('11.3 - FileCmdC - From Draggable - GetData')  
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_11_From_File_VarTransfert(Data_Interface) 
    }
  })
}

TS_PostData_11_To_File_Draggable(Data_Interface: Interface_CmdCToFileData): void { //VarB_ShowSettings = true
  if (this.id_1 === '11_Post_Data_From_TS_Variable_ButtonClick_2') {
    console.log('11.2 - FileCmdC - to Draggable - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Draggable(Data_Interface)

  }
}
TS_PostData_11_From_File_VarTransfert(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '11_Post_Data_From_TS_Variable_ButtonClick_4') {
    console.log('11.4 - FileCmdC - to VarTransfert - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Variable(Data_Interface); 
  }
}



//...........................................................................12_Post_Data_From_TS_Variable_ButtonClick_1
TS_GetData_12(): void {
  this.TS_GetData_12_From_File_Ressources()
  this.TS_GetData_12_From_File_Draggable()
}
TS_GetData_12_From_File_Ressources(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_R_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '12_Post_Data_From_TS_Variable_ButtonClick_1') {
      this.id_1 = '12_Post_Data_From_TS_Variable_ButtonClick_2'
      console.log('12.1 - FileCmdC - From Ressources - GetData')
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_12_To_File_Draggable(Data_Interface) 
      }
  }) 
}
TS_GetData_12_From_File_Draggable(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_Draggable_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '12_Post_Data_From_TS_Variable_ButtonClick_3') {
      this.id_1 = '12_Post_Data_From_TS_Variable_ButtonClick_4'
      console.log('12.3 - FileCmdC - From Draggable - GetData')  
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_12_From_File_VarTransfert(Data_Interface) 
    }
  })
}

TS_PostData_12_To_File_Draggable(Data_Interface: Interface_CmdCToFileData): void { //VarB_ShowSettings = true
  if (this.id_1 === '12_Post_Data_From_TS_Variable_ButtonClick_2') {
    console.log('12.2 - FileCmdC - to Draggable - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Draggable(Data_Interface)

  }
}
TS_PostData_12_From_File_VarTransfert(Data_Interface: Interface_CmdCToFileData): void {
  if (this.id_1 === '12_Post_Data_From_TS_Variable_ButtonClick_4') {
    console.log('12.4 - FileCmdC - to VarTransfert - PostData') 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdC_To_Variable(Data_Interface); 
  }
}



//...........................................................................12_Post_Data_From_TS_Variable_ButtonClick_1
TS_GetData_13(): void {
  this.TS_GetData_12_From_File_CmdCenter3()
}

TS_GetData_12_From_File_CmdCenter3(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdCenter3_To_CmdC().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '12_Post_Data_From_TS_Variable_ButtonClick_1') {
      this.id_1 = '12_Post_Data_From_TS_Variable_ButtonClick_2'
      console.log('12.1 - FileCmdC - From Ressources - GetData')
      const Data_Interface = this.TS_Data_Interface()
      this.TS_PostData_12_To_File_Draggable(Data_Interface) 
      }
  }) 
}













}


/*
setTimeout(() => { this.VarB_FileGestionData = false }, 1);
*/

export interface Interface_Tab_BD_Button_Update {
  FBtn_Id: number | null;
  FBtn_FrontBehindObject: string;
  FBtn_PositionX: string;
  FBtn_PositionY: string;
  FBtn_Object: string;
  FBtn_Name: string;
  FBtn_Label: string;
  FBtn_Style: string; 
  FBtn_Size: string;  
  FBtn_Color: string;
  FBtn_BackgroundColor: string;
  FBtn_Border: string;
  FBtn_FrontBehind: string;
  FBtn_TreatmentButton: string;
  FBtn_TreatmentType: string;
  FBtn_InputButtonAction3: string;
}

export interface Interface_CommunicationData {
  id: string;
  id_2: string;
  List_VarS_IFU_Recherche: Interface_Tab_IFU_Recherche[];
  Tab_Object_Recuperate_Id_2?: Interface_Tab_BD_Button_Detail[]; 
  Tab_Object: Interface_Tab_BD_Button_Detail[];
  Tab_SelectedItem: Interface_Tab_BD_Button_Detail[];
  Tab_UpdateItemUI: Interface_Tab_BD_Button_Detail_UI[];
  Tab_SelectedItem_Update: Interface_Tab_BD_Button_Update[];
}

export interface Interface_Tab_BD_Button_Detail {
  [key: string]: any;
  FBtn_Id: number | null;
  FBtn_FrontBehindObject: string;
  FBtn_PositionX: string;
  FBtn_PositionY: string;
  FBtn_PositionX_1: string;
  FBtn_PositionY_1: string;
  FBtn_Object: string;
  FBtn_Name: string;
  FBtn_Label: string;
  FBtn_Style: string; 
  FBtn_Size: string;  
  FBtn_Color: string;
  FBtn_BackgroundColor: string;
  FBtn_Border: string;
  FBtn_FrontBehind: string;
  FBtn_TreatmentButton: string;
  FBtn_TreatmentType: string;
  FBtn_InputButtonAction3: string;
}

export interface Interface_Tab_BD_Button_Detail_UI {
  FBtn_Id: number | null;
  FBtn_Name: string;
  FBtn_Label: string;
  FBtn_Style: string; 
  FBtn_Size: string;  
  FBtn_Color: string;
  FBtn_BackgroundColor: string;
  FBtn_Border: string;
}

export interface Interface_Tab_BD_Button_Detail_Position {
  FBtn_Id: number | null;
  FBtn_PositionX: string;
  FBtn_PositionY: string;
  FBtn_PositionX_1: string;
  FBtn_PositionY_1: string;
}

export interface Interface_Tab_IFU_Recherche {
  value: string;
}

export interface Interface_Position {
  x: number;
  y: number;
}

export interface Interface_Size {
  width: number;
  height: number;
}

export interface data {
  id: number | null;
  FrontBehindObject: string;
  PositionX: string;
  PositionY: string;
}

export interface DataRow {
  Input_VarS_IFU_Recherche: string;
  VarS_IFU_FrontBehindObject?: string;
  VarS_IFU_PositionX: string;
  VarS_IFU_PositionY: string;
  Positions_X1?: number;
  Positions_Y1?: number;
}

export interface Tab_Buttons_Detail {
  FBtn_Id: number | null;
  FBtn_FrontBehindObject: string;
  FBtn_PositionX: string;
  FBtn_PositionY: string;
}
