/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

/* Importation: Command Center */
import { Interface_Tab_IFU_Recherche } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_CommunicationData } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { data } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';


export interface Interface_CmdCToFileData {
  id_1: string | number;
  id_2: string | number;
  id_3: string | number;
  id_4: string | number;
  tab_1: Partial<Interface_CommunicationData>;
  tab_2: Partial<Interface_CommunicationData>;
  tab_3: Partial<Interface_CommunicationData>;
  tab_4: Partial<Interface_CommunicationData>;
  tab_5: Partial<Interface_CommunicationData>;
  tab_6: Partial<Interface_CommunicationData>;
}

@Injectable({providedIn:'root'})

export class S8o8o5ServicecenterService {

  static readonly defaultCmdCToFileData: Interface_CmdCToFileData = {
    id_1: '', id_2: '', id_3: '',id_4: '', tab_1: {}, tab_2: {}, tab_3: {}, tab_4: {}, tab_5: {}, tab_6: {}
  };
  private transformData(data: Interface_CmdCToFileData): Interface_CmdCToFileData {
    const { id_1 = '', id_2 = '', id_3 = '',id_4 = '', tab_1, tab_2, tab_3, tab_4, tab_5, tab_6 } = data;
    return { id_1, id_2, id_3, id_4, tab_1, tab_2, tab_3, tab_4, tab_5, tab_6 };
  }

  constructor() { }

private subject_id_Tab_From_CmdC_To_File = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdC_To_File(): Observable<Interface_CmdCToFileData> {return this.subject_id_Tab_From_CmdC_To_File.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_File(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_File.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdC_To_File(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_File(data);
}


/********************************************************    Début Ressources    ********************************************************/
/*From_CmdC_To_R*/
private subject_id_Tab_From_CmdC_To_R = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdC_To_R(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdC_To_R.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_R(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_R.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdC_To_R(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_R(data);
}
/*From_R_To_CmdC*/
private subject_id_Tab_From_R_To_CmdC = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_R_To_CmdC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_R_To_CmdC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_R_To_CmdC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_R_To_CmdC.next(data);
}
TS_Sce_SendData_id_Tab_From_R_To_CmdC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_R_To_CmdC(data);
}
/********************************************************    Fin Ressources    ********************************************************/


/********************************************************    Début Database    ********************************************************/
/*From_CmdC_To_Database*/
private subject_id_Tab_From_CmdC_To_Database = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdC_To_Database(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdC_To_Database.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_Database(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_Database.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdC_To_Database(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_Database(data);
}
/*From_Database_To_CmdC*/
private subject_id_Tab_From_Database_To_CmdC = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_Database_To_CmdC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_Database_To_CmdC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_Database_To_CmdC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_Database_To_CmdC.next(data);
}
TS_Sce_SendData_id_Tab_From_Database_To_CmdC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_Database_To_CmdC(data);
}
/********************************************************    Fin Database    ********************************************************/


/********************************************************    Début Gestion    ********************************************************/
/*From_CmdC_To_Gestion*/
private subject_id_Tab_From_CmdC_To_Gestion = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdC_To_Gestion(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdC_To_Gestion.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_Gestion(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_Gestion.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdC_To_Gestion(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_Gestion(data);
}
/*From_Gestion_To_CmdC*/
private subject_id_Tab_From_Gestion_To_CmdC = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_Gestion_To_CmdC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_Gestion_To_CmdC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_Gestion_To_CmdC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_Gestion_To_CmdC.next(data);
}
TS_Sce_SendData_id_Tab_From_Gestion_To_CmdC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_Gestion_To_CmdC(data);
}
/********************************************************    Fin Gestion    ********************************************************/



/********************************************************    Début Draggable    ********************************************************/
/*From_CmdC_To_Draggable*/
private subject_id_Tab_From_CmdC_To_Draggable = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdC_To_Draggable(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdC_To_Draggable.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_Draggable(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_Draggable.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdC_To_Draggable(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_Draggable(data);
}
/*From_Draggable_To_CmdC*/
private subject_id_Tab_From_Draggable_To_CmdC = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_Draggable_To_CmdC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_Draggable_To_CmdC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_Draggable_To_CmdC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_Draggable_To_CmdC.next(data);
}
TS_Sce_SendData_id_Tab_From_Draggable_To_CmdC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_Draggable_To_CmdC(data);
}
/********************************************************    Fin Draggable    ********************************************************/


/********************************************************    Début Settings    ********************************************************/
/*From_CmdC_To_Settings*/
private subject_id_Tab_From_CmdC_To_Settings = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdC_To_Settings(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdC_To_Settings.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_Settings(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_Settings.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdC_To_Settings(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_Settings(data);
}
/*From_Settings_To_CmdC*/
private subject_id_Tab_From_Settings_To_CmdC = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_Settings_To_CmdC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_Settings_To_CmdC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_Settings_To_CmdC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_Settings_To_CmdC.next(data);
}
TS_Sce_SendData_id_Tab_From_Settings_To_CmdC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_Settings_To_CmdC(data);
}
/********************************************************    Fin Settings    ********************************************************/


/********************************************************    Début Object    ********************************************************/
/*From_CmdC_To_Object*/
private subject_id_Tab_From_CmdC_To_Object = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdC_To_Object(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdC_To_Object.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_Object(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_Object.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdC_To_Object(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_Object(data);
}
/*From_Object_To_CmdC*/
private subject_id_Tab_From_Object_To_CmdC = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_Object_To_CmdC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_Object_To_CmdC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_Object_To_CmdC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_Object_To_CmdC.next(data);
}
TS_Sce_SendData_id_Tab_From_Object_To_CmdC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_Object_To_CmdC(data);
}
/********************************************************    Fin Object    ********************************************************/




/********************************************************    Début UI    ********************************************************/
/*From_CmdC_To_UI*/
private subject_id_Tab_From_CmdC_To_UI = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdC_To_UI(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdC_To_UI.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_UI(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_UI.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdC_To_UI(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_UI(data);
}
/*From_UI_To_CmdC*/
private subject_id_Tab_From_UI_To_CmdC = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_UI_To_CmdC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_UI_To_CmdC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_UI_To_CmdC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_UI_To_CmdC.next(data);
}
TS_Sce_SendData_id_Tab_From_UI_To_CmdC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_UI_To_CmdC(data);
}
/********************************************************    Fin UI    ********************************************************/



/********************************************************    Début Position    ********************************************************/
/*From_CmdC_To_Position*/
private subject_id_Tab_From_CmdC_To_Position = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdC_To_Position(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdC_To_Position.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_Position(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_Position.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdC_To_Position(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_Position(data);
}
/*From_Position_To_CmdC*/
private subject_id_Tab_From_Position_To_CmdC = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_Position_To_CmdC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_Position_To_CmdC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_Position_To_CmdC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_Position_To_CmdC.next(data);
}
TS_Sce_SendData_id_Tab_From_Position_To_CmdC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_Position_To_CmdC(data);
}
/********************************************************    Fin Position    ********************************************************/


/********************************************************    Début MenuC    ********************************************************/
/*From_CmdC_To_MenuC*/
private subject_id_Tab_From_CmdC_To_MenuC= new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdC_To_MenuC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdC_To_MenuC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_MenuC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_MenuC.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdC_To_MenuC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_MenuC(data);
}
/*From_MenuC_To_CmdC*/
private subject_id_Tab_From_MenuC_To_CmdC = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_MenuC_To_CmdC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_MenuC_To_CmdC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_MenuC_To_CmdC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_MenuC_To_CmdC.next(data);
}
TS_Sce_SendData_id_Tab_From_MenuC_To_CmdC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_MenuC_To_CmdC(data);
}
/********************************************************    Fin MenuC   ********************************************************/



/********************************************************    Début Services    ********************************************************/
/*From_CmdC_To_Services*/
private subject_id_Tab_From_CmdC_To_Services= new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdC_To_Services(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdC_To_Services.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_Services(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_Services.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdC_To_Services(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_Services(data);
}
/*From_Services_To_CmdC*/
private subject_id_Tab_From_Services_To_CmdC = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_Services_To_CmdC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_Services_To_CmdC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_Services_To_CmdC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_Services_To_CmdC.next(data);
}
TS_Sce_SendData_id_Tab_From_Services_To_CmdC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_Services_To_CmdC(data);
}
/********************************************************    Fin Services   ********************************************************/



/********************************************************    Début CmdCenter    ********************************************************/
/*From_CmdC_To_CmdCenter*/
private subject_id_Tab_From_CmdC_To_CmdCenter= new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdC_To_CmdCenter(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdC_To_CmdCenter.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_CmdCenter(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_CmdCenter.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdC_To_CmdCenter(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_CmdCenter(data);
}
/*From_CmdCenter_To_CmdC*/
private subject_id_Tab_From_CmdCenter_To_CmdC = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdCenter_To_CmdC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdCenter_To_CmdC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdCenter_To_CmdC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdCenter_To_CmdC.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdCenter_To_CmdC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdCenter_To_CmdC(data);
}
/********************************************************    Fin CmdCenter   ********************************************************/



/********************************************************    Début CmdCenterDetail    ********************************************************/
/*From_CmdC_To_CmdCenterDetail*/
private subject_id_Tab_From_CmdC_To_CmdCenterDetail= new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdC_To_CmdCenterDetail(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdC_To_CmdCenterDetail.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_CmdCenterDetail(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_CmdCenterDetail.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdC_To_CmdCenterDetail(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_CmdCenterDetail(data);
}
/*From_CmdCenterDetail_To_CmdC*/
private subject_id_Tab_From_CmdCenterDetail_To_CmdC = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdCenterDetail_To_CmdC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdCenterDetail_To_CmdC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdCenterDetail_To_CmdC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdCenterDetail_To_CmdC.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdCenterDetail_To_CmdC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdCenterDetail_To_CmdC(data);
}
/********************************************************    Fin CmdCenterDetail   ********************************************************/




/********************************************************    Début CmdCenter3    ********************************************************/
/*From_CmdC_To_CmdCenter3*/
private subject_id_Tab_From_CmdC_To_CmdCenter3= new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdC_To_CmdCenter3(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdC_To_CmdCenter3.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_CmdCenter3(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_CmdCenter3.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdC_To_CmdCenter3(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_CmdCenter3(data);
}
/*From_CmdCenter3_To_CmdC*/
private subject_id_Tab_From_CmdCenter3_To_CmdC = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdCenter3_To_CmdC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdCenter3_To_CmdC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdCenter3_To_CmdC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdCenter3_To_CmdC.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdCenter3_To_CmdC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdCenter3_To_CmdC(data);
}
/********************************************************    Fin CmdCenter3   ********************************************************/




/********************************************************    Début Variable    ********************************************************/
/*From_CmdC_To_Variable*/
private subject_id_Tab_From_CmdC_To_Variable= new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_CmdC_To_Variable(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_CmdC_To_Variable.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_CmdC_To_Variable(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_CmdC_To_Variable.next(data);
}
TS_Sce_SendData_id_Tab_From_CmdC_To_Variable(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_CmdC_To_Variable(data);
}
/*From_Variable_To_CmdC*/
private subject_id_Tab_From_Variable_To_CmdC = new BehaviorSubject<Interface_CmdCToFileData>(S8o8o5ServicecenterService.defaultCmdCToFileData);
TS_Sce_Detect_id_Tab_From_Variable_To_CmdC(): Observable<Interface_CmdCToFileData> {
  return this.subject_id_Tab_From_Variable_To_CmdC.asObservable().pipe(map(data => this.transformData(data)))
}
sendData_id_Tab_From_Variable_To_CmdC(data: Interface_CmdCToFileData): void {
  this.subject_id_Tab_From_Variable_To_CmdC.next(data);
}
TS_Sce_SendData_id_Tab_From_Variable_To_CmdC(data: Interface_CmdCToFileData): void {
  this.sendData_id_Tab_From_Variable_To_CmdC(data);
}
/********************************************************    Fin Variable   ********************************************************/

































private subject_id_Tab_From_CmdC_To_Ressources = new BehaviorSubject<{
  id_1: string | number,
  id_2: string | number,
  id_3: string | number,
  tab_1: Partial<Interface_CommunicationData>,
  tab_2: Partial<Interface_CommunicationData>,
  tab_3: Partial<Interface_CommunicationData>
}>({ id_1: '', id_2: '', id_3: '', tab_1: {}, tab_2: {}, tab_3: {} });

TS_Sce_Detect_id_Tab_From_CmdC_To_Ressources(): Observable<{
  id_1: string | number,
  id_2: string | number,
  id_3: string | number,
  tab_1: Partial<Interface_CommunicationData>,
  tab_2: Partial<Interface_CommunicationData>,
  tab_3: Partial<Interface_CommunicationData>
}> {
  return this.subject_id_Tab_From_CmdC_To_Ressources.asObservable().pipe(
    map(data => ({ 
      id_1: data.id_1 ?? '', 
      id_2: data.id_2 ?? '', 
      id_3: data.id_3 ?? '', 
      tab_1: data.tab_1,
      tab_2: data.tab_2,
      tab_3: data.tab_3
    }))
  );
}
sendData_id_Tab_From_CmdC_To_Ressources(
  id_1: string | number, 
  id_2: string | number, 
  id_3: string | number, 
  tab_1: Partial<Interface_CommunicationData>,
  tab_2: Partial<Interface_CommunicationData>,
  tab_3: Partial<Interface_CommunicationData>
): void {
  this.subject_id_Tab_From_CmdC_To_Ressources.next({ id_1, id_2, id_3, tab_1, tab_2, tab_3 });
}
TS_Sce_SendData_id_Tab_From_CmdC_To_Ressources(
  id_1: string | number, 
  id_2: string | number, 
  id_3: string | number, 
  tab_1: Partial<Interface_CommunicationData>,
  tab_2: Partial<Interface_CommunicationData>,
  tab_3: Partial<Interface_CommunicationData>
): void {
  this.sendData_id_Tab_From_CmdC_To_Ressources(id_1, id_2, id_3, tab_1, tab_2, tab_3);
}





private logData(methodName: string, id: string, data: any): void {
  console.log('Terminé -x- FileServiceCenter - logData - ${methodName}:', id, data);
}
//    ********************* Partie 1 - Id *********************

TS_Sce_Detect_id(): Observable<{ id: string }> {
  return this.subject_id.asObservable().pipe(
    map(data => ({ id: data.id ?? '' })),
    tap(({ id }) => console.log('Terminé -x- FileServiceCenter - TS_Sce_Detect_id: id', id))
  );
}
private subject_id = new BehaviorSubject<{ id: string }>({
  id: ''
});
sendData_id(id: string): void {
  const currentData = this.subject_id.getValue();
  this.subject_id.next({ ...currentData, id });
  console.log('Terminé -x- FileServiceCenter - sendData_id', id)
}
id: string = '';
TS_Sce_SendData_id(id: string): void {
  console.log('Terminé -x- FileServiceCenter - TS_Sce_SendData_id:', id);
  this.id = id
  this.sendData_id(id);
}

//    ********************* Partie 2 - Tab *********************

TS_Sce_Detect_Tab(): Observable<Partial<Interface_CommunicationData>> {
  return this.subject_Tab.asObservable().pipe(
    map(tab => ({ ...tab })),
    tap(tab => this.logData('TS_Sce_Detect_Tab', '', tab))
  );
}
private subject_Tab = new BehaviorSubject<Partial<Interface_CommunicationData>>({
  List_VarS_IFU_Recherche: [],
  Tab_Object: []
});
sendData_Tab(tab: Partial<Interface_CommunicationData>): void {
  console.log('Terminé -x- FileServiceCenter - TS_Sce_SendData_id:', tab);
  this.subject_Tab.next(tab);
}
TS_Sce_SendData_Tab(tab: Partial<Interface_CommunicationData>): void {
  console.log('Terminé -x- FileServiceCenter - TS_Sce_SendData_id:', tab);
  this.sendData_Tab(tab);
}

//    ********************* Send From Ressources to CmdCenter *********************


//    ********************* Send From Ressources to CmdCenter *********************

// ******************************************************************************************************************************************************************************** Id
// ********************************************************************************************************************************** subject_id
// **** To CmdC
private subject_id_From_R_To_CmdC = new BehaviorSubject<{ id: string }>({id: ''});
private subject_id_From_Settings_To_CmdC = new BehaviorSubject<{ id: string }>({id: ''});
private subject_id_From_UI_To_CmdC = new BehaviorSubject<{ id: string }>({id: ''});
private subject_id_From_MenuC_To_CmdC = new BehaviorSubject<{ id_1: string, id_2: string }>({id_1: '',id_2: ''});
private subject_id_From_Database_To_CmdC = new BehaviorSubject<{ id: string }>({id: ''});
// **** From CmdC
private subject_id_From_CmdC_To_Database = new BehaviorSubject<{ id: string }>({id: ''});
private subject_id_From_CmdC_To_Draggable = new BehaviorSubject<{ id: string }>({id: ''});
private subject_id_From_CmdC_To_Settings = new BehaviorSubject<{ id: string }>({id: ''});
private subject_id_From_CmdC_To_Settings_2 = new BehaviorSubject<{ id_2: string }>({id_2: ''});
// ********************************************************************************************************************************** TS_Sce_Detect
// **** To CmdC
TS_Sce_Detect_id_From_R_To_CmdC(): Observable<{ id: string }> {
  return this.subject_id_From_R_To_CmdC.asObservable().pipe(map(data => ({ id: data.id ?? '' })));
}
TS_Sce_Detect_id_From_Settings_To_CmdC(): Observable<{ id: string }> {
  return this.subject_id_From_Settings_To_CmdC.asObservable().pipe(map(data => ({ id: data.id ?? '' })));
}
TS_Sce_Detect_id_From_UI_To_CmdC(): Observable<{ id: string }> {
  return this.subject_id_From_UI_To_CmdC.asObservable().pipe(map(data => ({ id: data.id ?? '' })));
}
TS_Sce_Detect_id_From_MenuC_To_CmdC(): Observable<{ id_1: string, id_2: string }> {
  return this.subject_id_From_MenuC_To_CmdC.asObservable().pipe(map(data => ({ id_1: data.id_1 ?? '', id_2: data.id_2 ?? '' })));
}
TS_Sce_Detect_id_From_Database_To_CmdC(): Observable<{ id: string }> {
  return this.subject_id_From_Database_To_CmdC.asObservable().pipe(map(data => ({ id: data.id ?? '' })));
}
// **** From CmdC
TS_Sce_Detect_id_From_CmdC_To_Database(): Observable<{ id: string }> {
  return this.subject_id_From_CmdC_To_Database.asObservable().pipe(map(data => ({ id: data.id ?? '' })));
}
TS_Sce_Detect_id_From_CmdC_To_Draggable(): Observable<{ id: string }> {
  return this.subject_id_From_CmdC_To_Draggable.asObservable().pipe(map(data => ({ id: data.id ?? '' })));
}
TS_Sce_Detect_id_From_CmdC_To_Settings(): Observable<{ id: string }> {
  return this.subject_id_From_CmdC_To_Settings.asObservable().pipe(map(data => ({ id: data.id ?? '' })));
}
// ********************************************************************************************************************************** sendData
// **** To CmdC
sendData_id_From_R_To_CmdC(id: string): void {
  this.subject_id_From_R_To_CmdC.next({ id });
}
sendData_id_From_Settings_To_CmdC(id: string): void {
  this.subject_id_From_Settings_To_CmdC.next({ id });
}
sendData_id_From_UI_To_CmdC(id: string): void {
  this.subject_id_From_UI_To_CmdC.next({ id });
}
sendData_id_From_MenuC_To_CmdC(id_1: string, id_2: string): void {
  this.subject_id_From_MenuC_To_CmdC.next({ id_1, id_2 });
}
sendData_id_From_Database_To_CmdC(id: string): void {
  this.subject_id_From_Database_To_CmdC.next({ id });
}
// **** From CmdC
sendData_id_From_CmdC_To_Database(id: string): void {
  const currentData = this.subject_id_From_CmdC_To_Database.getValue();
  this.subject_id_From_CmdC_To_Database.next({ ...currentData, id });
}
sendData_id_From_CmdC_To_Draggable(id: string): void {
  const currentData = this.subject_id_From_CmdC_To_Draggable.getValue();
  this.subject_id_From_CmdC_To_Draggable.next({ ...currentData, id });
}
sendData_id_From_CmdC_To_Settings(id: string): void {
  const currentData = this.subject_id_From_CmdC_To_Settings.getValue();
  this.subject_id_From_CmdC_To_Settings.next({ ...currentData, id });
}
sendData_id_From_CmdC_To_Settings_2(id_2: string): void {
  const currentData = this.subject_id_From_CmdC_To_Settings_2.getValue();
  this.subject_id_From_CmdC_To_Settings_2.next({ ...currentData, id_2 });
}
// ********************************************************************************************************************************** TS_Sce_SendData
// **** To CmdC
TS_Sce_SendData_id_From_R_To_CmdC(id: string): void {
  this.sendData_id_From_R_To_CmdC(id);
}
TS_Sce_SendData_id_From_Settings_To_CmdC(id: string): void {
  this.sendData_id_From_Settings_To_CmdC(id);
}
TS_Sce_SendData_id_From_UI_To_CmdC(id: string): void {
  this.sendData_id_From_UI_To_CmdC(id);
}
TS_Sce_SendData_id_From_MenuC_To_CmdC(id_1: string, id_2: string): void {
  this.sendData_id_From_MenuC_To_CmdC(id_1, id_2);
}
TS_Sce_SendData_id_From_Database_To_CmdC(id: string): void {
  this.sendData_id_From_Database_To_CmdC(id);
}
// **** From CmdC
TS_Sce_SendData_id_From_CmdC_To_Database(id: string): void {
  this.sendData_id_From_CmdC_To_Database(id);
}
TS_Sce_SendData_id_From_CmdC_To_Draggable(id: string): void {
  this.sendData_id_From_CmdC_To_Draggable(id);
}
TS_Sce_SendData_id_From_CmdC_To_Settings(id: string): void {
  this.sendData_id_From_CmdC_To_Settings(id);
}
TS_Sce_SendData_id_From_CmdC_To_Settings_2(id_2: string): void {
  this.sendData_id_From_CmdC_To_Settings_2(id_2);
}

// ******************************************************************************************************************************************************************************** Tab
// ********************************************************************************************************************************** subject_Tab
// **** To CmdC
private subject_Tab_From_R_To_CmdC = new BehaviorSubject<Partial<Interface_CommunicationData>>({
  List_VarS_IFU_Recherche: [],
  Tab_Object: []
});
private subject_Tab_From_Database_To_CmdC = new BehaviorSubject<Partial<Interface_CommunicationData>>({
  List_VarS_IFU_Recherche: [],
  Tab_Object: []
});
private subject_Tab_From_GestionData_To_CmdC = new BehaviorSubject<Partial<Interface_CommunicationData>>({
  List_VarS_IFU_Recherche: [],
  Tab_Object: []
});
private subject_Tab_From_Settings_To_CmdC = new BehaviorSubject<Partial<Interface_CommunicationData>>({
  List_VarS_IFU_Recherche: [],
  Tab_Object: []
});
private subject_Tab_From_UI_To_CmdC = new BehaviorSubject<Partial<Interface_CommunicationData>>({
  List_VarS_IFU_Recherche: [],
  Tab_Object: []
});
// **** From CmdC
private subject_Tab_From_CmdC_To_Database = new BehaviorSubject<Partial<Interface_CommunicationData>>({
  List_VarS_IFU_Recherche: [],
  Tab_Object: []
});
private subject_Tab1_Tab2_From_CmdC_To_GestionData = new BehaviorSubject<Partial<Interface_CommunicationData>>({
  List_VarS_IFU_Recherche: [],
  Tab_Object: []
});
private subject_Tab_From_CmdC_To_Draggable = new BehaviorSubject<Partial<Interface_CommunicationData>>({
  List_VarS_IFU_Recherche: [],
  Tab_Object: []
});
private subject_Tab_From_CmdC_To_Settings = new BehaviorSubject<Partial<Interface_CommunicationData>>({
  List_VarS_IFU_Recherche: [],
  Tab_Object: []
});
private subject_Tab_From_CmdC_To_Position = new BehaviorSubject<Partial<Interface_CommunicationData>>({
  List_VarS_IFU_Recherche: [],
  Tab_Object: []
});
private subject_Tab_From_CmdC_To_UI = new BehaviorSubject<Partial<Interface_CommunicationData>>({
  List_VarS_IFU_Recherche: [],
  Tab_Object: []
});
// ********************************************************************************************************************************** TS_Sce_Detect
// **** To Cmd
TS_Sce_Detect_Tab_From_R_To_CmdC(): Observable<Partial<Interface_CommunicationData>> {
  return this.subject_Tab_From_R_To_CmdC.asObservable().pipe(map(tab => ({ ...tab })));
}
TS_Sce_Detect_Tab_From_Database_To_CmdC(): Observable<Partial<Interface_CommunicationData>> {
  return this.subject_Tab_From_Database_To_CmdC.asObservable().pipe(map(tab => ({ ...tab })));
}
TS_Sce_Detect_Tab_From_GestionData_To_CmdC(): Observable<Partial<Interface_CommunicationData>> {
  return this.subject_Tab_From_GestionData_To_CmdC.asObservable().pipe(map(tab => ({ ...tab })));
}
TS_Sce_Detect_Tab_From_Settings_To_CmdC(): Observable<Partial<Interface_CommunicationData>> {
  return this.subject_Tab_From_Settings_To_CmdC.asObservable().pipe(map(tab => ({ ...tab })));
}
TS_Sce_Detect_Tab_From_UI_To_CmdC(): Observable<Partial<Interface_CommunicationData>> {
  return this.subject_Tab_From_UI_To_CmdC.asObservable().pipe(map(tab => ({ ...tab })));
}
// **** From CmdC
TS_Sce_Detect_Tab1_Tab2_From_CmdC_To_GestionData: Observable<{ Tab1: Interface_Tab_IFU_Recherche[], Tab2: Interface_Tab_BD_Button_Detail[] }> = this.subject_Tab1_Tab2_From_CmdC_To_GestionData.asObservable().pipe(
  map(data => {
    const Tab1 = data.List_VarS_IFU_Recherche || [];
    const Tab2 = data.Tab_Object || [];
    return { Tab1, Tab2 };
  }),
);
TS_Sce_Detect_Tab_From_CmdC_To_Settings(): Observable<Partial<Interface_CommunicationData>> {
  return this.subject_Tab_From_CmdC_To_Settings.asObservable().pipe(map(tab => ({ ...tab })));
}
TS_Sce_Detect_Tab_From_CmdC_To_Draggable(): Observable<Partial<Interface_CommunicationData>> {
  return this.subject_Tab_From_CmdC_To_Draggable.asObservable().pipe(map(tab => ({ ...tab })));
}
TS_Sce_Detect_Tab_From_CmdC_To_UI(): Observable<Partial<Interface_CommunicationData>> {
  return this.subject_Tab_From_CmdC_To_UI.asObservable().pipe(map(tab => ({ ...tab })));
}
TS_Sce_Detect_Tab_From_CmdC_To_Position(): Observable<Partial<Interface_CommunicationData>> {
  return this.subject_Tab_From_CmdC_To_Position.asObservable().pipe(map(tab => ({ ...tab })));
}
TS_Sce_Detect_Tab_From_CmdC_To_Database(): Observable<Partial<Interface_CommunicationData>> {
  return this.subject_Tab_From_CmdC_To_Database.asObservable().pipe(map(tab => ({ ...tab })));
}
// ********************************************************************************************************************************** sendData
// **** To CmdC
sendData_Tab_From_GestionData_To_CmdC(tab: Partial<Interface_CommunicationData>): void {
  this.subject_Tab_From_GestionData_To_CmdC.next(tab);
}
sendData_Tab_From_CmdC_To_Draggable(tab: Partial<Interface_CommunicationData>): void {
  this.subject_Tab_From_CmdC_To_Draggable.next(tab);
}
sendData_Tab_From_CmdC_To_Settings(tab: Partial<Interface_CommunicationData>): void {
  this.subject_Tab_From_CmdC_To_Settings.next(tab);
}
sendData_Tab_From_Settings_To_CmdC(tab: Partial<Interface_CommunicationData>): void {
  this.subject_Tab_From_Settings_To_CmdC.next(tab);
}
sendData_Tab_From_CmdC_To_UI(tab: Partial<Interface_CommunicationData>): void {
  this.subject_Tab_From_CmdC_To_UI.next(tab);
}
sendData_Tab_From_CmdC_To_Position(tab: Partial<Interface_CommunicationData>): void {
  this.subject_Tab_From_CmdC_To_Position.next(tab);
}
sendData_Tab_From_UI_To_CmdC(tab: Partial<Interface_CommunicationData>): void {
  this.subject_Tab_From_UI_To_CmdC.next(tab);
}
// **** From CmdC
sendData_Tab_From_R_To_CmdC(tab: Partial<Interface_CommunicationData>): void {
  this.subject_Tab_From_R_To_CmdC.next(tab);
}
sendData_Tab_From_CmdC_To_Database(tab: Partial<Interface_CommunicationData>): void {
  this.subject_Tab_From_CmdC_To_Database.next(tab);
}
sendData_Tab_From_Database_To_CmdC(tab: Partial<Interface_CommunicationData>): void {
  this.subject_Tab_From_Database_To_CmdC.next(tab);
}
sendData_Tab1_Tab2_From_CmdC_To_GestionData(Tab1: Interface_Tab_IFU_Recherche[], Tab2: Interface_Tab_BD_Button_Detail[]): void {
  this.subject_Tab1_Tab2_From_CmdC_To_GestionData.next({ List_VarS_IFU_Recherche: Tab1, Tab_Object: Tab2 });
}
// ********************************************************************************************************************************** TS_Sce_SendData
// **** To CmdC
TS_Sce_SendData_Tab_From_R_To_CmdC(tab: Partial<Interface_CommunicationData>): void {
  this.sendData_Tab_From_R_To_CmdC(tab);
}
TS_Sce_SendData_Tab_From_Database_To_CmdC(tab: Partial<Interface_CommunicationData>): void {
  this.sendData_Tab_From_Database_To_CmdC(tab);
}
TS_Sce_SendData_Tab_From_GestionData_To_CmdC(tab: Partial<Interface_CommunicationData>): void {
  this.sendData_Tab_From_GestionData_To_CmdC(tab);
}
TS_Sce_SendData_Tab_From_Settings_To_CmdC(tab: Partial<Interface_CommunicationData>): void {
  this.sendData_Tab_From_Settings_To_CmdC(tab);
}
TS_Sce_SendData_Tab_From_UI_To_CmdC(tab: Partial<Interface_CommunicationData>): void {
  this.sendData_Tab_From_UI_To_CmdC(tab);
}
// **** From CmdC
TS_Sce_SendData_Tab_From_CmdC_To_Database(tab: Partial<Interface_CommunicationData>): void {
  this.sendData_Tab_From_CmdC_To_Database(tab);
}
TS_Sce_SendData_Tab1_Tab2_From_CmdC_To_GestionData(Tab1: Interface_Tab_IFU_Recherche[], Tab2: Interface_Tab_BD_Button_Detail[]): void {
  this.sendData_Tab1_Tab2_From_CmdC_To_GestionData(Tab1, Tab2);
}
TS_Sce_SendData_Tab_From_CmdC_To_Draggable(tab: Partial<Interface_CommunicationData>): void {
  this.sendData_Tab_From_CmdC_To_Draggable(tab);
}
TS_Sce_SendData_Tab_From_CmdC_To_Settings(tab: Partial<Interface_CommunicationData>): void {
  this.sendData_Tab_From_CmdC_To_Settings(tab);
}
TS_Sce_SendData_Tab_From_CmdC_To_UI(tab: Partial<Interface_CommunicationData>): void {
  this.sendData_Tab_From_CmdC_To_UI(tab);
}
TS_Sce_SendData_Tab_From_CmdC_To_Position(tab: Partial<Interface_CommunicationData>): void {
  this.sendData_Tab_From_CmdC_To_Position(tab);
}




/*
private subject_id_Tab_From_CmdC_To_Settings = new BehaviorSubject<{ id: string, tab: Partial<Interface_CommunicationData> }>({ id: '', tab: {} });
TS_Sce_Detect_id_Tab_From_CmdC_To_Settings(): Observable<{ id: string, tab: Partial<Interface_CommunicationData> }> {
  return this.subject_id_Tab_From_CmdC_To_Settings.asObservable().pipe(
    map(data => ({ id: data.id ?? '', tab: { ...data.tab } }))
  );
}
sendData_id_Tab_From_CmdC_To_Settings(id: string, tab: Partial<Interface_CommunicationData>): void {
  this.subject_id_Tab_From_CmdC_To_Settings.next({ id, tab });
}
TS_Sce_SendData_id_Tab_From_CmdC_To_Settings(id: string, tab: Partial<Interface_CommunicationData>): void {
  this.sendData_id_Tab_From_CmdC_To_Settings(id, tab);
}
*/

/*
private subject_id_Tab_From_CmdC_To_Draggable = new BehaviorSubject<{ id: string, tab: Partial<Interface_CommunicationData> }>({ id: '', tab: {} });
TS_Sce_Detect_id_Tab_From_CmdC_To_Draggable(): Observable<{ id: string, tab: Partial<Interface_CommunicationData> }> {
  return this.subject_id_Tab_From_CmdC_To_Draggable.asObservable().pipe(
    map(data => ({ id: data.id ?? '', tab: { ...data.tab } }))
  );
}
sendData_id_Tab_From_CmdC_To_Draggable(id: string, tab: Partial<Interface_CommunicationData>): void {
  this.subject_id_Tab_From_CmdC_To_Draggable.next({ id, tab });
}
TS_Sce_SendData_id_Tab_From_CmdC_To_Draggable(id: string, tab: Partial<Interface_CommunicationData>): void {
  this.sendData_id_Tab_From_CmdC_To_Draggable(id, tab);
}


private subject_id_From_CmdC_To_Settings = new BehaviorSubject<{ id: string }>({id: ''});
private subject_Tab_From_CmdC_To_Settings = new BehaviorSubject<Partial<Interface_CommunicationData>>({
  List_VarS_IFU_Recherche: [],
  Tab_Object: []
});
TS_Sce_Detect_id_From_CmdC_To_Settings(): Observable<{ id: string }> {
  return this.subject_id_From_CmdC_To_Settings.asObservable().pipe(map(data => ({ id: data.id ?? '' })));
}
TS_Sce_Detect_Tab_From_CmdC_To_Settings(): Observable<Partial<Interface_CommunicationData>> {
  return this.subject_Tab_From_CmdC_To_Settings.asObservable().pipe(map(tab => ({ ...tab })));
}
*/




}
