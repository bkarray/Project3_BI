
/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';

/* Importation: Command Center */
import { Interface_Tab_IFU_Recherche } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Update } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail_UI } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_CommunicationData } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { data } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';

/* Importation : Interface */
import { Interface_CmdCToFileData } from '../../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

/* Importation : Service */
import { S8o8o1RessourcesService } from '../../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';
import { S8o8o2SceDatabaseService } from '../../../s8o8-services/s8o8o2-sce-database/s8o8o2-sce-database.service';
import { S8o8o3SceCommunicationService } from '../../../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service';
import { S8o8o4NotifyResourceUpdatedService } from '../../../s8o8-services/s8o8o4-NotifyResourceUpdated/s8o8o4-notify-resource-updated.service';
import { S8o8o5ServicecenterService } from '../../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

@Component({
  selector: 'app-s8o1o9o1-Object',
  templateUrl: './s8o1o9o1-Object.component.html',
  styleUrls: ['./s8o1o9o1-Object.component.css']
})
export class S8o1o9o1ObjectComponent implements OnInit {

  constructor(
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    private S8o8o2SceDatabaseService: S8o8o2SceDatabaseService,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService,
    private S8o8o4NotifyResourceUpdatedService: S8o8o4NotifyResourceUpdatedService,
    private S8o8o5ServicecenterService: S8o8o5ServicecenterService,
    /* Importation : Composant Angular */
    private router: Router,
    /* Importation : Démasquer Menu en cliquant Bouton gauche ou dehors */
    private el: ElementRef,
    private renderer: Renderer2,
    ) 
    {}  

ngOnInit(): void {
    this.TS_Object_Active();
}

TS_Object_Active(): void {
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
  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdC_To_UI().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '.....') {
      console.log('2.11 - FileUI - From CmdC to UI - TS_Sce_Detect') 
      if (data.tab_3.Tab_SelectedItem !== undefined) {
        this.Tab_SelectedItem = data.tab_3.Tab_SelectedItem;
      }
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

  console.log('Start - FileObject', Data_Interface)
  this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_Object_To_CmdC(Data_Interface)

}
  


public Var_Selected: string | number = ''

/* Button 'UI' */
TS_ShowUIOptions() {
  this.Var_Selected = 1
  this.id_1 = '3_Post_Data_From_FileObject_1'
  this.TS_PostData_To_File_CmdC()
}
/* Button 'Position' */
TS_ShowPositionOptions() {
  this.Var_Selected = 2
  this.id_1 = '3_Post_Data_From_FileObject_1'
  this.TS_PostData_To_File_CmdC()
}

/* Button 'Size' */
TS_ShowSizeOptions() {
  this.Var_Selected = 3
  this.id_1 = '3_Post_Data_From_FileObject_1'
  this.TS_PostData_To_File_CmdC()
}

  /* Communication HTML */
  @Input() Input_VarS_IFU_Recherche: string | number | null = null;
  @Input() InputVarN_Selected: string | number = ''
  @Input() Input_RT_VarXY_Position_X: any;  
  @Input() Input_RT_VarXY_Position_Y: any
  @Output() Output_from_VarS_IFU_FrontBehindObject = new EventEmitter<string>();
  TS_UpdateOutputValue(value: string) {
      this.Output_from_VarS_IFU_FrontBehindObject.emit(value);
  }
  @Input() Input_Tab_ActualDataPosition: any[] = [];

}


/*
Supprimer : 
  
@Output() Output_VarS_ObjectButtonName = new EventEmitter<string>();
VarS_ObjectButtonName: string = '';
TS_ReceiveValue_ObjectButtonName(newName: string) {
  this.VarS_ObjectButtonName = newName;
  this.Output_VarS_ObjectButtonName.emit(this.VarS_ObjectButtonName);
}

@Output() Output_VarN_CurrentPositionXChange = new EventEmitter<string>();
VarN_CurrentPositionX: string = '';
TS_UpdateNewPositionX(newPositionX: string) {
  this.VarN_CurrentPositionX = newPositionX;
  this.Output_VarN_CurrentPositionXChange.emit(this.VarN_CurrentPositionX);
}

@Output() Output_VarN_CurrentPositionYChange = new EventEmitter<string>();
VarN_CurrentPositionY: string = '';
TS_UpdateNewPositionY(newPositionY: string) {
  this.VarN_CurrentPositionY = newPositionY;
  this.Output_VarN_CurrentPositionYChange.emit(this.VarN_CurrentPositionY);
}
*/