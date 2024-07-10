
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
import { data } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';

/* Importation : Service */
import { S8o8o1RessourcesService } from '../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';
import { S8o8o2SceDatabaseService } from '../../s8o8-services/s8o8o2-sce-database/s8o8o2-sce-database.service';
import { S8o8o3SceCommunicationService } from '../../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service';
import { S8o8o4NotifyResourceUpdatedService } from '../../s8o8-services/s8o8o4-NotifyResourceUpdated/s8o8o4-notify-resource-updated.service';
import { S8o8o5ServicecenterService } from '../../s8o8-services/s8o8o5-servicecenter/s8o8o5-servicecenter.service';

@Component({
  selector: 'app-s8o1o7-draggable',
  templateUrl: './s8o1o7-draggable.component.html',
  styleUrls: ['./s8o1o7-draggable.component.css']
})
export class S8o1o7DraggableComponent implements OnInit {

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
  


private subscriptions: Subscription[] = [];
ngOnDestroy() {
  this.subscriptions.forEach(sub => sub.unsubscribe()); // Se désabonner pour éviter les fuites de mémoire
}


ngOnInit(): void {
  this.TS_Draggable_Active(); 
}

TS_Draggable_Active(): void { 
  this.TS_GetData_From_File_CommandCenter_Tab()
}
  
TS_GetData_From_File_CommandCenter_Tab(): void {
  this.S8o8o5ServicecenterService.TS_Sce_Detect_Tab_From_CmdC_To_Settings().subscribe(data => {
    if (data.Tab_Object && Array.isArray(data.Tab_Object)) {
      this.Tab_Object = data.Tab_Object;
    }    
    console.log('Start - FileDraggable - TS_GetData_From_File_CommandCenter_Tab: Tab_Object', this.Tab_Object );
  })
}





  private Var_Subscription?: Subscription;
  id: string = '';
  TS_GetData_Active(): void {



    
    this.Var_Subscription = this.S8o8o3SceCommunicationService.getElementById()
      .subscribe(data => {
        if (data && data.id) {
          this.id = data.id.toString(); 
          if (this.id === '3') {
            console.log('Terminé - FileDraggable - TS_GetData_Active: id', this.id);
            this.TS_GetData_From_FileRessources();
          }
        }
      });
  }
  
  public Tab_Object: Interface_Tab_BD_Button_Detail[] = [];
  TS_GetData_From_FileRessources(): void {
    this.Var_Subscription = this.S8o8o3SceCommunicationService.TS_Sce_Detect_From_FileRessources_To_FileDraggable$.subscribe(data => {
      if (data) {
        this.id = data.id;
        this.Tab_Object = data.Tab_Object;
        if (this.id === '3') {
          console.log('Terminé - FileDraggable - TS_GetData_From_FileRessources: Tab_IFU_Recherche', this.Tab_Object);
          console.log('sssssssssssssssssssssssssssssssssssssssss')
        }
      }
    });
  }









@Input() Input_VarS_IFU_Recherche: string = '';
  public receivedData: any[] = [];
  VarS_IFU_PositionX_1: string = '';
  VarS_IFU_PositionY_1: string = ''; 
  public Tab_ActualDataPosition: any[] = [];
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
                              this.VarXY_Position[1].x =  parseFloat(this.VarS_IFU_PositionX_1);
                              this.VarXY_Position[1].y =  parseFloat(this.VarS_IFU_PositionY_1)
                              console.log('11111')
                              console.log(this.VarXY_Position[1].x )
                          }                      
                      }
                  }
              });
              this.subscriptions.push(innerSub); 
          }
      }
    });
  }
  
  /* Debut Drag and Drop 1 */
  private _VarXY_Position = [
    { x: 10, y:10 },
    { x: 50, y: 50 },
    { x: 150, y: 150 },
  ];

  get VarXY_Position(): { x: number, y: number }[] {
      return this._VarXY_Position;
  }

  set VarXY_Position(value: { x: number, y: number }[]) {
      this._VarXY_Position = value;
      this.emitPositionChanges();
  }

  @Output() Output_VarN_CurrentPositionXChange = new EventEmitter<string>();
  VarN_CurrentPositionX: string = '';
  @Output() Output_VarN_CurrentPositionYChange = new EventEmitter<string>();
  VarN_CurrentPositionY: string = '';  
  emitPositionChanges(): void {
    this.Output_VarN_CurrentPositionXChange.emit(this._VarXY_Position[1].x.toString());
    this.Output_VarN_CurrentPositionYChange.emit(this._VarXY_Position[1].y.toString());
  }
  
  VarXY_StartPosition = { x: 0, y: 0 };

  // Quand un objet est en train de glisser au-dessus du bouton (drag over)
  TS_OnDragOver(event: Event) {
    // Pour éviter le comportement par défaut du navigateur
    event.preventDefault();
  }

  currentDraggingIndex: number = -1;  // -1 signifie qu'aucun élément n'est actuellement en train d'être déplacé

  // Quand le glissement (drag) commence
  TS_OnDragStart(event: DragEvent, index: number) {
    console.log("Début du glissement à:", event.clientX, event.clientY);
    
    // Mémorisation de l'index de l'élément en train d'être déplacé
    this.currentDraggingIndex = index;
    
    // Mémorisation de la position de départ
    this.VarXY_StartPosition.x = event.clientX
    this.VarXY_StartPosition.y = event.clientY 

  }

  // Quand le glissement (drag) se termine
  TS_OnDragEnd(event: DragEvent) {
    console.log("Position de départ mémorisée:", this.VarXY_StartPosition.x, this.VarXY_StartPosition.y);
    console.log("Fin du glissement à:", event.clientX, event.clientY);
    
    // Calcul du déplacement du bouton en x et y
    const dx = event.clientX - this.VarXY_StartPosition.x;
    const dy = event.clientY - this.VarXY_StartPosition.y;

    // Mise à jour de la position de l'élément en utilisant l'index
    this.VarXY_Position[this.currentDraggingIndex].x += dx;
    this.VarXY_Position[this.currentDraggingIndex].y += dy;
    
    const buttonDetailsToSend = {
      Client_Input_VarS_IFU_Recherche: this.Input_VarS_IFU_Recherche,
      Client_VarS_IFU_Position_X1: this.VarXY_Position[this.currentDraggingIndex].x,
      Client_VarS_IFU_Position_Y1: this.VarXY_Position[this.currentDraggingIndex].y
    };
    if (this.Input_VarS_IFU_Recherche !== null && typeof this.Input_VarS_IFU_Recherche === 'string' && this.currentDraggingIndex === 1) {
      this.S8o8o3SceCommunicationService.TS_Activate_Sce_SendData_From_FileDraggable_To_OtherFile_6(this.Input_VarS_IFU_Recherche, buttonDetailsToSend);
    }
    // Réinitialisation de l'index
    this.currentDraggingIndex = -1;

    //this.Output_VarN_CurrentPositionXChange.emit(this.VarXY_Position[this.currentDraggingIndex].x.toString());
    //this.Output_VarN_CurrentPositionYChange.emit(this.VarXY_Position[this.currentDraggingIndex].y.toString());
  }
/* Fin Drag and Drop 1 */





/*
  A supprimer
*/
@Input() Input_Get_DB_FBtn_Object: string = '';

VarS_IFU_Object: string = '';
TS_VarS_IFU_Object(newValue: string): void {
  this.VarS_IFU_Object = newValue;
}
@Output() Output_from_VarS_IFU_FrontBehindObject = new EventEmitter<string>();
  TS_UpdateOutputValue(value: string) {
      this.Output_from_VarS_IFU_FrontBehindObject.emit(value);
  }

@Input() Input_Get_DB_FBtn_PositionX: string = '';
@Input() Input_Get_DB_FBtn_PositionY: string = '';
@Input() Input_Get_DB_FBtn_PositionX_2: string = '';
@Input() Input_Get_DB_FBtn_PositionY_2: string = '';


@Input() Input_Tab_ActualDataPosition: any[] = [];


}



/*

ngOnInit(): void {
    // A supprimer
    this.TS_Input_VarXY_Position()
  }

  ngOnChanges(changes: SimpleChanges): void {
  console.log(this.Input_Tab_ActualDataPosition);
  if (changes['Input_Tab_ActualDataPosition'] && changes['Input_Tab_ActualDataPosition'].currentValue) {

      const newPositionData = changes['Input_Tab_ActualDataPosition'].currentValue;      
      
      const filteredData = newPositionData.filter((item: any) => item.Input_VarS_IFU_Recherche == this.Input_VarS_IFU_Recherche);        
      console.log('Données filtrées:', filteredData);
      if (filteredData.length > 0) {            
        if (this.currentDraggingIndex === -1) {
          console.log('Valeur de VarS_IFU_PositionX avant mise à jour:', this.VarXY_Position[1].x);
          this.VarXY_Position[1].x = parseFloat(filteredData[0].Positions_X1); 
          this.VarXY_Position[1].y = parseFloat(filteredData[0].Positions_Y1);
          console.log('Valeur de VarS_IFU_PositionX après mise à jour:', this.VarXY_Position[1].x);              
      }}
  }
    
  if (changes['Input_Get_DB_FBtn_PositionX'] || changes['Input_Get_DB_FBtn_PositionY']) {
      this.updatePositionsFromInputs();
  }
}

private setInitialPosition(): void {
    this.VarXY_StartPosition.x += parseInt(this.Input_Get_DB_FBtn_PositionX_2, 10);
    this.VarXY_StartPosition.y += parseInt(this.Input_Get_DB_FBtn_PositionY_2, 10);
}

private updatePositionsFromInputs(): void {
  if (this.Input_Get_DB_FBtn_PositionX) {
    this.VarXY_Position[1].x = parseInt(this.Input_Get_DB_FBtn_PositionX, 10);
  }
  if (this.Input_Get_DB_FBtn_PositionY) {
    this.VarXY_Position[1].y = parseInt(this.Input_Get_DB_FBtn_PositionY, 10);
  }
}

TS_Input_VarXY_Position() {
    
  console.log(this.Input_VarS_IFU_Recherche)
  
  this.S8o8o3SceCommunicationService.getData().subscribe(data => {
    this.Tab_ActualDataPosition = data;
      let Var1 = parseInt(this.Input_VarS_IFU_Recherche, 10);
      console.log(Var1)
      let objectFound = this.Tab_ActualDataPosition.find(item => item.Input_VarS_IFU_Recherche === Var1);
      if (objectFound) {            
          this.VarXY_Position[1].x = objectFound.Positions_X1;
          this.VarXY_Position[1].y = objectFound.Positions_Y1;
          this.cdRef.detectChanges();  

          // Si la position a changé
          if (this.lastKnownPositionX !== objectFound.Positions_X1 ||
            this.lastKnownPositionY !== objectFound.Positions_Y1) {

            this.VarXY_Position[1].x = objectFound.Positions_X1;
            this.VarXY_Position[1].y = objectFound.Positions_Y1;

            // Mettez à jour les valeurs connues
            this.lastKnownPositionX = objectFound.Positions_X1;
            this.lastKnownPositionY = objectFound.Positions_Y1;

            this.cdRef.detectChanges();
        }
          
      } else {
          console.log("Aucun objet trouvé avec cette valeur de recherche.");
      }
      
  });
}

public Tab_ActualDataPosition: any[] = [];
private lastKnownPositionX: number | null = null;
private lastKnownPositionY: number | null = null;






*/