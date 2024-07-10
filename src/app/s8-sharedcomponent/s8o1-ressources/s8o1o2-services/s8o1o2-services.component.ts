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

interface TabGenerateData {
  id: string; 
  subject_id_Tab_From_CmdC_To_Test: string;
  TS_Sce_Detect_id_Tab_From_CmdC_To_Test: string;
  sendData_id_Tab_From_CmdC_To_Test: string;
  TS_Sce_SendData_id_Tab_From_CmdC_To_Test: string;
  subject_id_Tab_From_Test_To_CmdC: string;
  TS_Sce_Detect_id_Tab_From_Test_To_CmdC: string;
  sendData_id_Tab_From_Test_To_CmdC: string;
  TS_Sce_SendData_id_Tab_From_Test_To_CmdC: string;
}


@Injectable({providedIn:'root'})

@Component({
  selector: 'app-s8o1o2-services',
  templateUrl: './s8o1o2-services.component.html',
  styleUrls: ['./s8o1o2-services.component.css']
})
export class S8o1o2ServicesComponent implements OnInit {

  static readonly defaultCmdCToFileData: Interface_CmdCToFileData = {
    id_1: '', id_2: '', id_3: '',id_4: '', tab_1: {}, tab_2: {}, tab_3: {}, tab_4: {}, tab_5: {}, tab_6: {}
  };
  private transformData(data: Interface_CmdCToFileData): Interface_CmdCToFileData {
    const { id_1 = '', id_2 = '', id_3 = '',id_4 = '', tab_1, tab_2, tab_3, tab_4, tab_5, tab_6 } = data;
    return { id_1, id_2, id_3, id_4, tab_1, tab_2, tab_3, tab_4, tab_5, tab_6 };
  }

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
    this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdC_To_Services().subscribe(data => {
      this.id_1 = data.id_1
      if (this.id_1 === '6_Post_Data_From_FileRessources_Services_2') {
        this.id_1 = '6_Post_Data_From_FileRessources_Services_3'
        console.log('6.3 - FileServices - From CmdC to Services - TS_Sce_Detect') 
        this.id_2 = data.id_2.toString()
        if (data.tab_2.Tab_Object !== undefined) {
          this.Tab_Object = data.tab_2.Tab_Object;
        }
        this.TS_GetData_From_DB()
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
  
    console.log('End - FileServices - Data_Interface: ',Data_Interface) 
    /*this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_Services_To_CmdC(Data_Interface)*/
  
  }

  
  public Tab_BD_Button: Interface_Tab_BD_Button_Detail[] = []
  TS_GetData_From_DB(): void { 
    this.S8o8o1RessourcesService.TS_Sce_GetAllButtonData().subscribe(Tab_BD_Button_Full => {   
      this.Tab_BD_Button = Tab_BD_Button_Full
      console.log('this.Tab_BD_Button', this.Tab_BD_Button)
    })
    setTimeout(() => { 
      this.TS_Tab_Generate()
      console.log('End2')
    }, 100);
    
  }

  public Tab_Generate: TabGenerateData[] = []

  private transformToTabGenerateData(buttonDetail: Interface_Tab_BD_Button_Detail): TabGenerateData {
    const id = buttonDetail.FBtn_Id != null ? buttonDetail.FBtn_Id.toString() : 'defaultId';
    return {
      id: id,
      subject_id_Tab_From_CmdC_To_Test: `private subject_id_Tab_From_CmdC_To_${id} = new BehaviorSubject<Interface_CmdCToFileData>(S8o1o2ServicesComponent.defaultCmdCToFileData)`,
      TS_Sce_Detect_id_Tab_From_CmdC_To_Test: `TS_Sce_Detect_id_Tab_From_CmdC_To_${id}(): Observable<Interface_CmdCToFileData> { return this.subject_id_Tab_From_CmdC_To_${id}.asObservable().pipe(map(data => this.transformData(data))) }`,
      sendData_id_Tab_From_CmdC_To_Test: `sendData_id_Tab_From_CmdC_To_${id}(data: Interface_CmdCToFileData): void { this.subject_id_Tab_From_CmdC_To_${id}.next(data) }`,
      TS_Sce_SendData_id_Tab_From_CmdC_To_Test: `TS_Sce_SendData_id_Tab_From_CmdC_To_${id}(data: Interface_CmdCToFileData): void { this.sendData_id_Tab_From_CmdC_To_${id}(data) }`,
      subject_id_Tab_From_Test_To_CmdC: `private subject_id_Tab_From_Test_To_${id} = new BehaviorSubject<Interface_CmdCToFileData>(S8o1o2ServicesComponent.defaultCmdCToFileData)`,
      TS_Sce_Detect_id_Tab_From_Test_To_CmdC: `TS_Sce_Detect_id_Tab_From_Test_To_${id}(): Observable<Interface_CmdCToFileData> { return this.subject_id_Tab_From_Test_To_${id}.asObservable().pipe(map(data => this.transformData(data))) }`,
      sendData_id_Tab_From_Test_To_CmdC: `sendData_id_Tab_From_Test_To_${id}(data: Interface_CmdCToFileData): void { this.subject_id_Tab_From_Test_To_${id}.next(data) }`,
      TS_Sce_SendData_id_Tab_From_Test_To_CmdC: `TS_Sce_SendData_id_Tab_From_Test_To_${id}(data: Interface_CmdCToFileData): void { this.sendData_id_Tab_From_Test_To_${id}(data) }`
    };
  }
  

  public TS_Tab_Generate(): void {
    this.Tab_Generate = this.Tab_BD_Button.map(buttonDetail => 
      this.transformToTabGenerateData(buttonDetail)
    )
    console.log('this.Tab_Generate',this.Tab_Generate)
    console.log('End1')
  }



/*From_CmdC_To_Test
private subject_id_Tab_From_CmdC_To_Test = new BehaviorSubject<Interface_CmdCToFileData>(S8o1o2ServicesComponent.defaultCmdCToFileData)
TS_Sce_Detect_id_Tab_From_CmdC_To_Test(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdC_To_Test.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_Test(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_Test.next(data)
}
TS_Sce_SendData_id_Tab_From_CmdC_To_Test(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_Test(data)
}
From_Test_To_CmdC
private subject_id_Tab_From_Test_To_CmdC = new BehaviorSubject<Interface_CmdCToFileData>(S8o1o2ServicesComponent.defaultCmdCToFileData)
TS_Sce_Detect_id_Tab_From_Test_To_CmdC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_Test_To_CmdC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_Test_To_CmdC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_Test_To_CmdC.next(data)
}
TS_Sce_SendData_id_Tab_From_Test_To_CmdC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_Test_To_CmdC(data)
}
*/

}
