/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core'
import { NgModule, Input, Output, EventEmitter } from '@angular/core'
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { switchMap, tap, finalize, map } from 'rxjs/operators'
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs'

/* Importation : Service */
import { S8o8o1RessourcesService } from '../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service'
import { S8o8o2SceDatabaseService } from '../../s8o8-services/s8o8o2-sce-database/s8o8o2-sce-database.service'
import { S8o8o3SceCommunicationService } from '../../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service'
import { S8o8o4NotifyResourceUpdatedService } from '../../s8o8-services/s8o8o4-NotifyResourceUpdated/s8o8o4-notify-resource-updated.service'
import { S8o8o5ServicecenterService } from '../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service'

/* Importation: Command Center */
import { Interface_Tab_IFU_Recherche } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component'
import { Interface_CommunicationData } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component'
import { Interface_Tab_BD_Button_Detail } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component'
import { Interface_Tab_BD_Button_Update } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component'

/* Importation : Interface */
import { Interface_CmdCToFileData } from '../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

@Component({
  selector: 'app-s8o1o1-cmdcenter',
  templateUrl: './s8o1o1-cmdcenter.component.html',
  styleUrls: ['./s8o1o1-cmdcenter.component.css']
})
export class S8o1o1CmdcenterComponent implements OnInit {

  constructor
  (
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    private S8o8o2SceDatabaseService: S8o8o2SceDatabaseService,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService,
    private S8o8o4NotifyResourceUpdatedService: S8o8o4NotifyResourceUpdatedService,
    private S8o8o5ServicecenterService: S8o8o5ServicecenterService,
  ) 
  {}

  
  ngOnInit(): void {
    this.TS_Services_Active()
  }
  
  TS_Services_Active(): void {
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
    this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdC_To_CmdCenter().subscribe(data => {
      this.id_1 = data.id_1
      if (this.id_1 === '7_Post_Data_From_FileRessources_CmdCenter_4') {
        this.id_1 = '7_Post_Data_From_FileRessources_CmdCenter_5'
        console.log('7.4 - FileCmdCenter - From CmdC to CmdCenter - TS_Sce_Detect') 
      }
      if (this.id_1 === '9_Post_Data_From_CmdCenterDetail_Return_2') {
        this.id_1 = '9_Post_Data_From_CmdCenterDetail_Return_3'
        console.log('9.2 - FileCmdCenter - From CmdC to CmdCenter - TS_Sce_Detect') 
        this.TS_CmdCenter_True()
      }
    })
  }
  
  TS_PostData_To_File_CmdC(): void {
    
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
  
    console.log('End - FileCmdCenter - Data_Interface: ',Data_Interface) 
    this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_CmdCenter_To_CmdC(Data_Interface)
  
  }

  public VarB_FileCmdCenter: boolean = true
  public VarB_FileCmdCenterDetail: boolean = false
  TS_CmdCenterDetail_ButtonClick(): void {
    this.VarB_FileCmdCenter = false
    this.VarB_FileCmdCenterDetail = true
    this.id_1 = '8_Post_Data_From_CmdCenterDetail_1'
    this.TS_PostData_To_File_CmdC() 
  }
  TS_CmdCenter_True(): void {
    this.VarB_FileCmdCenter = true
    this.VarB_FileCmdCenterDetail = false
  }

  

}
