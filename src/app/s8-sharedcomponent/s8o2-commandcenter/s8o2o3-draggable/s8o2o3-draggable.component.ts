
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

@Component({
  selector: 'app-s8o2o3-draggable',
  templateUrl: './s8o2o3-draggable.component.html',
  styleUrls: ['./s8o2o3-draggable.component.css']
})
export class S8o2o3DraggableComponent implements OnInit {

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
  ) { }

/************************************************************     Initial    ************************************************************/

ngOnInit(): void {
  this.TS_Draggable_Active(); 
}

TS_Draggable_Active(): void { 
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

  this.S8o8o5ServicecenterService.TS_Sce_Detect_id_Tab_From_CmdC_To_Draggable().subscribe(data => {
    this.id_1 = data.id_1
    if (this.id_1 === '1_Post_Data_From_FileRessources_GetButton_6') {
      this.id_1 = '1_Post_Data_From_FileRessources_GetButton_7'
      console.log('1.6 - FileDraggable - From CmdC to Draggable - TS_Sce_Detect') 
      if (data.tab_2.Tab_Object !== undefined) {
        this.Tab_Object = data.tab_2.Tab_Object;
      }
      this.TS_Position_Initial()
    }
    if (this.id_1 === '2_Post_Data_From_FileMenuContextuel_8') {
      this.id_1 = '2_Post_Data_From_FileMenuContextuel_9'
      console.log('2.8 - FileDraggable - From CmdC to Draggable - TS_Sce_Detect') 
      this.VarB_ShowSettings = true
      this.TS_PostData_To_File_CmdC() 
    }
    if (this.id_1 === '7_Post_Data_From_FileRessources_CmdCenter_2') {
      this.id_1 = '7_Post_Data_From_FileRessources_CmdCenter_3'
      console.log('7.2 - FileDraggable - From CmdC to Draggable - TS_Sce_Detect') 
      this.VarB_ShowCmdCenter = true
      this.TS_Position_Initial()
    }
    if (this.id_1 === '11_Post_Data_From_TS_Variable_ButtonClick_2') {
      this.id_1 = '11_Post_Data_From_TS_Variable_ButtonClick_3'
      console.log('11.2 - FileDraggable - From CmdC to Draggable - TS_Sce_Detect') 
      this.VarB_ShowVarTransfert = true
      this.TS_Position_Initial()
    }
    if (this.id_1 === '12_Post_Data_From_TS_Variable_ButtonClick_2') {
      this.id_1 = '12_Post_Data_From_TS_Variable_ButtonClick_3'
      console.log('12.2 - FileDraggable - From CmdC to Draggable - TS_Sce_Detect') 
      this.VarB_ShowFonction = true
      this.TS_Position_Initial()
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

  console.log('End - FileDraggable', Data_Interface); 
  this.S8o8o5ServicecenterService.TS_Sce_SendData_id_Tab_From_Draggable_To_CmdC(Data_Interface)

}


/************************************************************     Traitement    ************************************************************/

id1: string = '';
id2: string = '';

VarS_IFU_PositionX_1: string = '';
VarS_IFU_PositionY_1: string = ''; 
VarB_ShowSettings = false
VarB_ShowCmdCenter = false
VarB_ShowVarTransfert = false
VarB_ShowFonction = false
get VarXY_Position(): { [key: number]: Interface_Position } {
  return this._VarXY_Position;
}

TS_Position_Initial() {
  if (!this._VarXY_Position[0]) {
    this._VarXY_Position[0] = { x: 400, y: 25 }
  }
  this._VarXY_Position[0].x = 400
  this._VarXY_Position[0].y = 25
  if (!this._VarXY_Position[1]) {
    this._VarXY_Position[1] = { x: 400, y: 25 }
  }
  this._VarXY_Position[1].x = 400
  this._VarXY_Position[1].y = 25
  if (!this._VarXY_Position[2]) {
    this._VarXY_Position[2] = { x: 400, y: 25 }
  }
  this._VarXY_Position[2].x = 400
  this._VarXY_Position[2].y = 25
  if (!this._VarXY_Position[3]) {
    this._VarXY_Position[3] = { x: 400, y: 25 }
  }
  this._VarXY_Position[3].x = 400
  this._VarXY_Position[3].y = 25
  for (const item of this.Tab_Object) {
    if (typeof item.FBtn_Id === 'number' && item.FBtn_Id !== null) {
      this._VarXY_Position[item.FBtn_Id] = this._VarXY_Position[item.FBtn_Id] || { x: 0, y: 0 };
      if (item['FBtn_PositionX_1'] !== undefined && item['FBtn_PositionY_1'] !== undefined) {
        this._VarXY_Position[item.FBtn_Id].x = parseFloat(item['FBtn_PositionX_1']);
        this._VarXY_Position[item.FBtn_Id].y = parseFloat(item['FBtn_PositionY_1']);
      } else {
        console.error(`Positions_X1 or Positions_Y1 are undefined for item with FBtn_Id: ${item.FBtn_Id}`);
      }
    } else {
      console.error(`Invalid FBtn_Id: ${item.FBtn_Id}`);
    }
  } 
  this.TS_PostData_To_File_CmdC() 
}

private _VarXY_Position: { [key: number]: Interface_Position } = {}; 
VarXY_StartPosition = { x: 0, y: 0 };
currentDraggingIndex: number = -1;  // -1 signifie qu'aucun élément n'est actuellement en train d'être déplacé
TS_OnDragStart(index: number ) {
  if (index === null) {
    console.error('Drag started without a valid index.');
    return;
  }
  if (this._VarXY_Position[index]) {
    //console.log("Début du glissement depuis la position initial:", this._VarXY_Position[index].x, this._VarXY_Position[index].y);
    this.currentDraggingIndex = index;
    // Mémorisation de la position de départ à partir des données initialisées
    this.VarXY_StartPosition.x = this._VarXY_Position[index].x;
    this.VarXY_StartPosition.y = this._VarXY_Position[index].y;
  } else {
    if (!this._VarXY_Position[0]) {
      this._VarXY_Position[0] = { x: 400, y: 25 }
    }
    this._VarXY_Position[0].x = 400
    this._VarXY_Position[0].y = 25
    if (!this._VarXY_Position[1]) {
      this._VarXY_Position[1] = { x: 400, y: 25 }
    }
    this._VarXY_Position[1].x = 400
    this._VarXY_Position[1].y = 25
    if (!this._VarXY_Position[2]) {
      this._VarXY_Position[2] = { x: 400, y: 25 }
    }
    this._VarXY_Position[2].x = 400
    this._VarXY_Position[2].y = 25
    if (!this._VarXY_Position[3]) {
      this._VarXY_Position[3] = { x: 400, y: 25 }
    }
    this._VarXY_Position[3].x = 400
    this._VarXY_Position[3].y = 25
  }
}

// Quand un objet est en train de glisser au-dessus du bouton (drag over)
TS_OnDragOver(event: Event) {
  // Pour éviter le comportement par défaut du navigateur
  event.preventDefault();
}

// Quand le glissement (drag) se termine
TS_OnDragEnd(event: DragEvent, index: number ) {
  //console.log("Position de départ mémorisée:", this.VarXY_StartPosition.x, this.VarXY_StartPosition.y);
  //console.log("Fin du glissement à:", event.clientX, event.clientY);
  
  // Calcul du déplacement du bouton en x et y
  const dx = event.clientX - this.VarXY_StartPosition.x - this.clickOffsetX;
  const dy = event.clientY - this.VarXY_StartPosition.y - this.clickOffsetY;

  // Mise à jour de la position de l'élément en utilisant l'index
  this.VarXY_Position[this.currentDraggingIndex].x += dx;
  this.VarXY_Position[this.currentDraggingIndex].y += dy;
  this.currentDraggingIndex = -1;
/*
  const ObjectEndPositionToSend = {
    Client_FBtn_Id: index,
    Client_FBtn_PositionX_1_End: this.VarXY_Position[this.currentDraggingIndex].x,
    Client_FBtn_PositionY_1_End: this.VarXY_Position[this.currentDraggingIndex].y
  };
  console.log('ObjectEndPositionToSend',ObjectEndPositionToSend)
*/

}

clickOffsetX: number= 0;
clickOffsetY: number= 0;
TS_OnMouseDown(event: MouseEvent) {
  // Obtenez la position de l'élément draggable
  const elementRect = (event.target as HTMLElement).getBoundingClientRect();

  // Calculez la position du clic de la souris par rapport au coin supérieur gauche de l'élément
  this.clickOffsetX = event.clientX - elementRect.left;
  this.clickOffsetY = event.clientY - elementRect.top;
  //console.log(`Position du clic dans l'élément: x: ${this.clickOffsetX}, y: ${this.clickOffsetY}`);
}

TS_Output_Settings_Close(value: string) {
  if (value === '1') {
    this.VarB_ShowSettings = false
  }
}

TS_Output_CmdCenter_Close(value: string) {
  if (value === '1') {
    this.VarB_ShowCmdCenter = false
  }
}


/************************************************************     Fin Traitement    ************************************************************/



}
