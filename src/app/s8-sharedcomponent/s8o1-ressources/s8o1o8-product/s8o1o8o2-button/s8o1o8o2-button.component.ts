/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize } from 'rxjs/operators';
import { Observable, Observer, Subscription } from 'rxjs';
/* Importation : Command Center */

/* Importation : Service */
import { S8o8o1RessourcesService } from '../../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';
import { S8o8o2SceDatabaseService } from '../../../s8o8-services/s8o8o2-sce-database/s8o8o2-sce-database.service';
import { S8o8o3SceCommunicationService } from '../../../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service';
import { S8o8o4NotifyResourceUpdatedService } from '../../../s8o8-services/s8o8o4-NotifyResourceUpdated/s8o8o4-notify-resource-updated.service';

/* Importation: Command Center */
import { Interface_Tab_IFU_Recherche } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Tab_BD_Button_Detail } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { data } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Position } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { Interface_Size } from '../../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';

@Component({
  selector: 'app-s8o1o8o2-button',
  templateUrl: './s8o1o8o2-button.component.html',
  styleUrls: ['./s8o1o8o2-button.component.css']
})
export class S8o1o8o2ButtonComponent implements OnInit, OnDestroy {
  
  constructor(
    /* Importation : Composant Angular */
    private router: Router,
    /* Importation : s8o8o1-ressources */
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    /* Importation : s8o8o1-ressources */
    private S8o8o2SceDatabaseService: S8o8o2SceDatabaseService,
    /* Importation : Démasquer Menu en cliquant Bouton gauche ou dehors */
    private el: ElementRef,
    private renderer: Renderer2,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService,
    private S8o8o4NotifyResourceUpdatedService: S8o8o4NotifyResourceUpdatedService,
    
    ) 
    {}   


@Input() Input_VarN_FBtn_Id: string | number | null = '';
ngOnInit(): void {
}

VarB_ShowContextMenu = false;
TS_OnRightClick(event: MouseEvent) {
  event.preventDefault();  
  this.VarB_ShowContextMenu = !this.VarB_ShowContextMenu;
  
  const buttonElement = event.target as HTMLElement;
  this.VarN_ButtonHeight = buttonElement.offsetHeight;

  this.VarXY_ContextMenuPosition.x = event.clientX;
  this.VarXY_ContextMenuPosition.y = event.clientY;
}

TS_Output_MenuC_Close(value: string) {
  if (value === '1') {
    this.VarB_ShowContextMenu =false
  }
}














  

  /* Valeur initial Recherche */
  @Input() Input_VarS_IFU_Recherche: string | number | null = null;

  private Var_DataSubscription: Subscription = new Subscription();


  
  VarN_IFU_Name: string = '';
  VarS_IFU_Label: string = ''; 
  VarS_IFU_Style: string = '';
  VarS_IFU_Size: string = '';
  VarS_IFU_Color: string = '';
  VarS_IFU_BgColor: string = '';
  VarS_IFU_Border: string = '';
  VarS_IFU_FrontBehind: string = '';
  VarS_IFU_FrontBehindObject: string = '';
  VarS_IFU_PositionX: string = '';
  VarS_IFU_PositionY: string = '';

  private TS_UpdateComponentProperties(data: any): void {
      console.log("Updating component properties for ID2:", data.id);
      console.log("Updating component properties for ID22:", data.object);
      this.VarN_IFU_Name = data.name;
      this.VarS_IFU_Label = data.label;
      this.VarS_IFU_Style = data.style;
      this.VarS_IFU_Size = data.size;
      this.VarS_IFU_Color = data.color;
      this.VarS_IFU_BgColor = data.backgroundColor;
      this.VarS_IFU_Border = data.border;
      this.VarS_IFU_FrontBehind= data.FrontBehind;
      this.VarS_IFU_FrontBehindObject= data.FrontBehindObject;
      this.VarS_IFU_PositionX= data.PositionX;
      this.VarS_IFU_PositionY= data.PositionY;
      this.VarXY_Position.x = parseFloat(this.VarS_IFU_PositionX);
      this.VarXY_Position.y = parseFloat(this.VarS_IFU_PositionY);
  }
    
  ngOnDestroy(): void {
      this.Var_DataSubscription.unsubscribe();
  }
    
    

  VarXY_ContextMenuPosition = { x: 0, y: 0 };
  VarN_ButtonHeight: number = 0;
  
 


  @Input() Input_VarS_InputButtonColor: string = '';
  @Input() Input_VarS_InputButtonBgColor: string = '';
  @Input() Input_VarS_InputButtonBorder: string = '';


  public VarXY_Position: Interface_Position = { x: 0, y: 0 };
  



  public VarXY_Size: Interface_Size = { width: 200, height: 200 };

  @Input() Input_VarS_InputButtonLabel: string = '';


  


  
}


/*
  if (this.Input_VarS_IFU_Recherche !== null) {
        const dataObservable = this.S8o8o3SceCommunicationService.List_SendData_From_FileDatabase_To_OtherFile_ById(String(this.Input_VarS_IFU_Recherche));
        console.log("Updating22")
        console.log(dataObservable)
        console.log(String(this.Input_VarS_IFU_Recherche))
        if (dataObservable) {
          console.log("Updating23")
        this.Var_DataSubscription = dataObservable.subscribe((data: any)  => {
          console.log("Updating24")
            if (data) {
              console.log("Updating25")
            this.TS_UpdateComponentProperties(data);
            }
        });
        }
    }
*/