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

import { T_Button } from '../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';

@Component({
  selector: 'app-s8o2o1-database',
  templateUrl: './s8o2o1-database.component.html',
  styleUrls: ['./s8o2o1-database.component.css']
})
export class S8o2o1DatabaseComponent implements OnInit {

  constructor(
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    private S8o8o2SceDatabaseService: S8o8o2SceDatabaseService,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService,
    private S8o8o4NotifyResourceUpdatedService: S8o8o4NotifyResourceUpdatedService,
    private S8o8o5ServicecenterService: S8o8o5ServicecenterService,
  ) { }

/************************************************************     Initial    ************************************************************/

ngOnInit(): void {
 this.TS_Database_Active();
}

TS_Database_Active(): void {
  this.TS_GetData_From_File_CommandCenter()
}

public id_1: string | number = ''
public id_2: string | number = ''
public id_3: string | number = ''
public Tab_IFU_Recherche: Interface_Tab_IFU_Recherche[] = []
public Tab_Object: Interface_Tab_BD_Button_Detail[] = []
public Tab_SelectedItem: Interface_Tab_BD_Button_Detail[] = []
public Tab_SelectedItem_Update: Interface_Tab_BD_Button_Update[] = []
TS_GetData_From_File_CommandCenter(): void {

  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdC_To_Database().subscribe(data => {
    this.id_1 = data.id_1

    if (this.id_1 === '1_Post_Data_From_FileRessources_GetButton_2') {
      this.id_1 = '1_Post_Data_From_FileRessources_GetButton_3'
      console.log('1.2 - FileDatabase - From CmdC to Database - TS_Sce_Detect') 
      this.TS_GetData_From_DB()
    }

    if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_4') {
      this.id_1 = '2_Post_Data_From_FileMenuContextuel_5'
      console.log('2.4 - FileDatabase - From CmdC to Database - TS_Sce_Detect') 
      this.TS_GetData_From_DB()
    }

    if (this.id_1 === '5_Post_Data_From_FileUI_Update_4') {
      this.id_1 = '5_Post_Data_From_FileUI_Update_5'
      console.log('5.5 - From UI to CmdC - FileDatabase - TS_Sce_Detect')
      if (data.tab_4.Tab_SelectedItem_Update !== undefined) {
        this.Tab_SelectedItem_Update = data.tab_4.Tab_SelectedItem_Update;
      }
      this.TS_Update_DB()
    }

  })

}

TS_PostData_To_File_CmdC(): void {

  const TabToSend_Tab_Object: Partial<Interface_CommunicationData> = {
    Tab_Object: this.Tab_BD_Button
  }; 

  const Data_Interface: Interface_CmdCToFileData = {
    id_1: this.id_1,
    id_2: '',
    id_3: '',
    id_4: '',
    tab_1: {},
    tab_2: TabToSend_Tab_Object,
    tab_3: {},
    tab_4: {},
    tab_5: {},
    tab_6: {}
  }

  console.log('End - FileDatabase - TS_PostData_To_File_CmdC', Data_Interface)
  this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_Database_To_CmdC(Data_Interface)

  

}

/************************************************************     Traitement    ************************************************************/

TS_Update_DB(): void {

  const buttonToUpdate: T_Button = {
    ...this.Tab_SelectedItem_Update[0],
    FBtn_Id: Number(this.Tab_SelectedItem_Update[0].FBtn_Id),
  };
  this.S8o8o1RessourcesService.TS_Sce_UpdateButton_From_UI_To_DB(buttonToUpdate).subscribe(
    response => { console.log(response); },
    error => { console.error('Failed to update button1:', error); }
  )
  this.TS_GetData_From_DB()
  
}

public Tab_BD_Button: Interface_Tab_BD_Button_Detail[] = [];
TS_GetData_From_DB(): void { 
  this.S8o8o1RessourcesService.TS_Sce_GetAllButtonData().subscribe(Tab_BD_Button_Full => {   
    this.Tab_BD_Button = Tab_BD_Button_Full
    console.log('this.Tab_BD_Button', this.Tab_BD_Button)
    if (this.id_1 === '5_Post_Data_From_FileUI_Update_5') {
      setTimeout(() => { this.TS_PostData_To_File_CmdC() }, 200);
    } else {
      this.TS_PostData_To_File_CmdC()
    }
  })
}




}


/*setTimeout(() => { }, 1);*/