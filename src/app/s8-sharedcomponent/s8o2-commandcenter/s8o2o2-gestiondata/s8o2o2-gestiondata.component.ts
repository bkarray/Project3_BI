/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';

/* Importation: Command Center */
import { Interface_Tab_IFU_Recherche } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_CommunicationData } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Update } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { data } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';

/* Importation : Interface - Service */
import { Interface_CmdCToFileData } from '../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

/* Importation : Service */
import { S8o8o1RessourcesService } from '../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';
import { S8o8o2SceDatabaseService } from '../../s8o8-services/s8o8o2-sce-database/s8o8o2-sce-database.service';
import { S8o8o3SceCommunicationService } from '../../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service';
import { S8o8o4NotifyResourceUpdatedService } from '../../s8o8-services/s8o8o4-NotifyResourceUpdated/s8o8o4-notify-resource-updated.service';
import { S8o8o5ServicecenterService } from '../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';


@Component({
  selector: 'app-s8o2o2-gestiondata',
  templateUrl: './s8o2o2-gestiondata.component.html',
  styleUrls: ['./s8o2o2-gestiondata.component.css']
})
export class S8o2o2GestiondataComponent implements OnInit {

  constructor(
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    private S8o8o2SceDatabaseService: S8o8o2SceDatabaseService,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService,
    private S8o8o4NotifyResourceUpdatedService: S8o8o4NotifyResourceUpdatedService,
    private S8o8o5ServicecenterService: S8o8o5ServicecenterService,
  ) { }

/************************************************************     Initial    ************************************************************/

ngOnInit(): void {
  this.TS_GestionData_Active(); 
}

TS_GestionData_Active(): void { 
  this.TS_GetData_From_File_CommandCenter_Tab()
}

public id_1: string | number = ''
public id_2: string | number = ''
public id_3: string | number = ''
public Tab_IFU_Recherche: Interface_Tab_IFU_Recherche[] = []
public Tab_Object: Interface_Tab_BD_Button_Detail[] = []
public Tab_SelectedItem: Interface_Tab_BD_Button_Detail[] = []
public Tab_SelectedItem_Update: Interface_Tab_BD_Button_Update[] = []
TS_GetData_From_File_CommandCenter_Tab(): void { 

  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdC_To_Gestion().subscribe(data => {
    this.id_1 = data.id_1

    if (this.id_1 === '1_Post_Data_From_FileRessources_GetButton_4') {
      this.id_1 = '1_Post_Data_From_FileRessources_GetButton_5'
      console.log('1.4 - FileGestionData - From CmdC to Database - TS_Sce_Detect') 
      if (data.tab_1.List_VarS_IFU_Recherche !== undefined) {
        this.Tab_IFU_Recherche = data.tab_1.List_VarS_IFU_Recherche;
      }
      if (data.tab_2.Tab_Object !== undefined) {
        this.Tab_Object = data.tab_2.Tab_Object;
      }
      this.TS_Tab_Object_Recuperate_All_Id()
    }

    if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_6') {
      this.id_1 = '2_Post_Data_From_FileMenuContextuel_7'
      console.log('2.6 - FileGestionData - From CmdC to Database - TS_Sce_Detect') 
      if (data.tab_1.List_VarS_IFU_Recherche !== undefined) {
        this.Tab_IFU_Recherche = data.tab_1.List_VarS_IFU_Recherche;
      }
      if (data.tab_2.Tab_Object !== undefined) {
        this.Tab_Object = data.tab_2.Tab_Object;
      }
      this.TS_Tab_Object_Recuperate_All_Id()
    }

    if (this.id_1 === '5_Post_Data_From_FileUI_Update_6') {
      this.id_1 = '5_Post_Data_From_FileUI_Update_7'
      console.log('5.6 - FileGestionData - From CmdC to Database - TS_Sce_Detect') 
      if (data.tab_1.List_VarS_IFU_Recherche !== undefined) {
        this.Tab_IFU_Recherche = data.tab_1.List_VarS_IFU_Recherche;
      }
      if (data.tab_2.Tab_Object !== undefined) {
        this.Tab_Object = data.tab_2.Tab_Object;
      }
      this.TS_Tab_Object_Recuperate_All_Id()
    }

  })

}

TS_PostData_To_File_CmdC(): void {

  const TabToSend_Tab_Object: Partial<Interface_CommunicationData> = {
    Tab_Object: this.Tab_Object_Calculate
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

  console.log('End - FileGestionData - TS_PostData_To_File_CmdC', Data_Interface);
  this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_Gestion_To_CmdC(Data_Interface);
  
}

/************************************************************     Traitement    ************************************************************/

TS_Tab_Object_Recuperate_All_Id(): void {
  let foundNewValue: boolean;
  const existingIDs = new Set(this.Tab_IFU_Recherche.map(ifu => ifu.value));
  do {
    foundNewValue = false;
    const newValues: Interface_Tab_IFU_Recherche[] = [];
    this.Tab_IFU_Recherche.slice().forEach(IfuR_Value => {
      this.Tab_Object.forEach(Tab_Object_Line => {
        if (Tab_Object_Line.FBtn_FrontBehindObject === IfuR_Value.value) {
          const idValue = Tab_Object_Line.FBtn_Id != null ? String(Tab_Object_Line.FBtn_Id) : '';
          if (!existingIDs.has(idValue)) {
            existingIDs.add(idValue);
            newValues.push({ value: idValue });
            foundNewValue = true; 
          }
        }
      });
    });
    this.Tab_IFU_Recherche.push(...newValues);
  } while (foundNewValue); 
  this.TS_Tab_Object_Recuperate_Id_Detail()
}

public Tab_Object_Recuperate_Id: Interface_Tab_BD_Button_Detail[] = [];
TS_Tab_Object_Recuperate_Id_Detail(): void {
  this.Tab_Object_Recuperate_Id = []
  this.Tab_Object.forEach((BDBtn_Value) => {
    if (BDBtn_Value.FBtn_Id !== null) {
      this.Tab_IFU_Recherche.forEach((IfuR_Value) => {
        const BDBtn_ValueIdAsString = (BDBtn_Value.FBtn_Id ?? "").toString();
        if (BDBtn_ValueIdAsString === IfuR_Value.value) {
          const newObject: Interface_Tab_BD_Button_Detail = {
            ...BDBtn_Value,
          };
          this.Tab_Object_Recuperate_Id.push(newObject);
        }
      });
    }
  });
  this.TS_RemoveDuplicates()
}

//public Tab_Object_RemoveDuplicates: Interface_Tab_BD_Button_Detail[] = [];
TS_RemoveDuplicates(): void {
  const copiedArray: Interface_Tab_BD_Button_Detail[] = JSON.parse(JSON.stringify(this.Tab_Object_Recuperate_Id));
  const Tab_Object_RemoveDuplicates = copiedArray.map(obj => ({
    ...obj,
    FBtn_PositionX_1: obj.FBtn_PositionX,
    FBtn_PositionY_1: obj.FBtn_PositionY,
  }));
  this.Tab_Object_RemoveDuplicates = Tab_Object_RemoveDuplicates.filter((item, index, array) => {
    return array.findIndex(t => t.FBtn_Id === item.FBtn_Id) === index;
  })
  this.TS_Calculate()
}

public Tab_Object_Calculate: Interface_Tab_BD_Button_Detail[] = [];
public Tab_Object_RemoveDuplicates: Interface_Tab_BD_Button_Detail[] = [];
TS_Calculate(): void {
  const updatePositions = (item: Interface_Tab_BD_Button_Detail) => {
    let updated = false;
    const objFrontBehind = this.Tab_Object_RemoveDuplicates.find(obj => obj.FBtn_Id === Number(item.FBtn_FrontBehindObject));
    if (objFrontBehind) {
      if (!isNaN(Number(item.FBtn_PositionX)) && !isNaN(Number(objFrontBehind.FBtn_PositionX_1))) {
        const newPositionX = (Number(item.FBtn_PositionX) + Number(objFrontBehind.FBtn_PositionX_1)).toString();
        if (item.FBtn_PositionX_1 !== newPositionX) {
          item.FBtn_PositionX_1 = newPositionX;
          updated = true;
        }
      }
      if (!isNaN(Number(item.FBtn_PositionY)) && !isNaN(Number(objFrontBehind.FBtn_PositionY_1))) {
        const newPositionY = (Number(item.FBtn_PositionY) + Number(objFrontBehind.FBtn_PositionY_1)).toString();
        if (item.FBtn_PositionY_1 !== newPositionY) {
          item.FBtn_PositionY_1 = newPositionY;
          updated = true;
        }
      }
    }
    return updated;
  };
  const propagateUpdates = (id: number) => {
    this.Tab_Object_RemoveDuplicates.forEach(item => {
      if (item.FBtn_FrontBehindObject === id.toString()) {
        if (updatePositions(item)) {
          if (item.FBtn_Id !== null) {
            propagateUpdates(item.FBtn_Id);
          }
        }
      }
    });
  };
  this.Tab_Object_RemoveDuplicates.forEach(item => {
    if (updatePositions(item)) {
      if (item.FBtn_Id !== null) {
        propagateUpdates(item.FBtn_Id);
      }
    }
  });
  this.Tab_Object_Calculate = this.Tab_Object_RemoveDuplicates;
  this.TS_PostData_To_File_CmdC();
}



  
}
  