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
  selector: 'app-s8o1o8o3-popup',
  templateUrl: './s8o1o8o3-popup.component.html',
  styleUrls: ['./s8o1o8o3-popup.component.css']
})
export class S8o1o8o3PopupComponent implements OnInit {

  constructor(
    /* Importation : Composant Angular */
    private router: Router,
    /* Importation : s8o8o1-ressources */
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    /* Importation : Démasquer Menu en cliquant Bouton gauche ou dehors */
    private el: ElementRef,
    private renderer: Renderer2,
    ) 
    {}  


  ngOnInit(): void {
    
  }




  /* Input position for drag & drop */
  @Input() position: any;


  /* Debut : Get Data from Table Ressources_t_button & Put on Front end */

  /* Input FBtn from Table Ressources_t_button */
  @Input() FBtn_Id: number | null = null;
  @Input() FBtn_Name: string = '';
  @Input() Input_Get_FBtn_Id: string | number | null = null;
  @Input() Input_Get_FBtn_Name: string = '';
  @Input() Input_Get_FBtn_Label: string = '';
  @Input() Input_Get_FBtn_Style: string = ''; 
  @Input() Input_Get_FBtn_Size: string = '';  
  @Input() Input_Get_FBtn_Color: string = '';
  @Input() Input_Get_FBtn_BackgroundColor: string = '';
  @Input() Input_Get_FBtn_Border: string = '';
  @Input() Input_Get_FBtn_TreatmentButton: string = '';
  @Input() Input_Get_FBtn_TreatmentType: string = '';
  @Input() Input_Get_FBtn_InputButtonAction3: string = '';

  /* Variable String */
  VarS_InputButtonId: string | number | null = null;

  VarS_InputButtonName: string = '';
  VarS_InputButtonLabel: string = '';
  VarS_InputButtonStyle: string = '';
  VarS_InputButtonSize: string = '';
  VarS_InputButtonColor: string = '';
  VarS_InputButtonBgColor: string = '';
  VarS_InputButtonBorder: string = '';
  VarS_InputButtonAction1: string = '';
  VarS_InputButtonAction2: string = '';
  VarS_InputButtonAction3: string = '';

  
  ngOnChanges(changes: SimpleChanges): void {
    const changeMapping: { [key: string]: (val: any) => void } = {
        'FBtn_Id': (val: any) => console.log('FBtn_Id changed to:', val),
        'Input_Get_FBtn_Id': (val: any) => this.VarS_InputButtonId = val,
        'Input_Get_FBtn_Name': (val: any) => this.VarS_InputButtonName = val,
        'Input_Get_FBtn_Label': (val: any) => this.VarS_InputButtonLabel = val,
        'Input_Get_FBtn_Style': (val: any) => this.VarS_InputButtonStyle = val,
        'Input_Get_FBtn_Size': (val: any) => this.VarS_InputButtonSize = val,
        'Input_Get_FBtn_Color': (val: any) => this.VarS_InputButtonColor = val,
        'Input_Get_FBtn_BackgroundColor': (val: any) => this.VarS_InputButtonBgColor = val,
        'Input_Get_FBtn_Border': (val: any) => this.VarS_InputButtonBorder = val,
        'Input_Get_FBtn_TreatmentButton': (val: any) => this.VarS_InputButtonAction1 = val,
        'Input_Get_FBtn_TreatmentType': (val: any) => this.VarS_InputButtonAction2 = val,
        'Input_Get_FBtn_InputButtonAction3': (val: any) => this.VarS_InputButtonAction3 = val
    };

    for (let prop in changes) {
        if (changes.hasOwnProperty(prop) && changeMapping[prop]) {
            changeMapping[prop](changes[prop].currentValue);
        }
    }
}

  /* Fin : Get Data from Table Ressources_t_button & Put on Front end */
 

  // Variables d'état de la popup
  public VarXY_ShowPopup: boolean = true;
  public VarXY_Position: Interface_Position = { x: 0, y: 0 };
  public VarXY_StartPosition: Interface_Position = { x: 0, y: 0 };
  public VarXY_Size: Interface_Size = { width: 200, height: 200 };
  public VarXY_StartSize: Interface_Size = { width: 0, height: 0 };

  // Tailles maximales et minimales pour la popup
  public VarXY_MaxSize: Interface_Size = { width: 1000, height: 1000 };
  public VarXY_MinSize: Interface_Size = { width: 100, height: 100 };


  // Méthodes pour gérer la popup


  TS_ClosePopup() {
    this.VarXY_ShowPopup = false;
  }
  
  TS_OnResizeStart(event: DragEvent, direction: string) {
    this.VarXY_StartSize.width = this.VarXY_Size.width;
    this.VarXY_StartSize.height = this.VarXY_Size.height;
    this.VarXY_StartPosition.x = event.clientX;
    this.VarXY_StartPosition.y = event.clientY;
  }

  TS_OnResizeEnd(event: DragEvent, direction: string) {
    const dx = event.clientX - this.VarXY_StartPosition.x;
    const dy = event.clientY - this.VarXY_StartPosition.y;

    // Ajuste la taille en fonction de la direction du redimensionnement
    switch(direction) {
        case 'top':
            this.VarXY_Size.height = Math.max(this.VarXY_MinSize.height, this.VarXY_StartSize.height - dy);
            this.VarXY_Position.y += dy;
            break;
        case 'right':
            this.VarXY_Size.width = Math.min(this.VarXY_MaxSize.width, this.VarXY_StartSize.width + dx);
            break;
        case 'bottom':
            this.VarXY_Size.height = Math.min(this.VarXY_MaxSize.height, this.VarXY_StartSize.height + dy);
            break;
        case 'left':
            this.VarXY_Size.width = Math.max(this.VarXY_MinSize.width, this.VarXY_StartSize.width - dx);
            this.VarXY_Position.x += dx;
            break;
    }
  }

  /*

    // Variable pour ajuster la bordure arrondie
    public VarE_BorderRadius: number = 15;
    public VarE_StartBorderRadius: number = 0;

  */


  /*

    // Méthodes pour ajuster la bordure arrondie
    TS_OnRadiusStart(event: DragEvent) {
      this.VarE_StartBorderRadius = this.VarE_BorderRadius;
      this.VarXY_StartPosition.x = event.clientX;
    }

    TS_OnRadiusEnd(event: DragEvent) {
      const dx = event.clientX - this.VarXY_StartPosition.x;
      this.VarE_BorderRadius = Math.max(0, this.VarE_StartBorderRadius + dx);
    }

  */




/* Debut clique droite Menu */

  // Ajoutez ces propriétés au début de votre classe pour gérer l'affichage du menu contextuel et sa position
  VarB_ShowContextMenu = false;
  VarXY_ContextMenuPosition = { x: 0, y: 0 };
  VarN_ButtonHeight: number = 0;

  // Ajoutez cette méthode pour gérer le clic droit sur le bouton
  TS_OnRightClick(event: MouseEvent) {
    event.preventDefault();  // Pour éviter le menu contextuel par défaut du navigateur
    this.VarB_ShowContextMenu = true;
    
    const buttonElement = event.target as HTMLElement;
    this.VarN_ButtonHeight = buttonElement.offsetHeight;

    this.VarXY_ContextMenuPosition.x = event.clientX;
    this.VarXY_ContextMenuPosition.y = event.clientY;
}


/* Fin clique droite Menu */


/* Debut Contenu Menu */

// Ces méthodes seront appelées lorsque l'utilisateur clique sur "Éditer" ou "Supprimer" dans le menu contextuel
TS_EditItem() {
  console.log('Éditer l\'élément');
  this.VarB_ShowContextMenu = false; // Fermez le menu contextuel après avoir cliqué sur une option
}

TS_DeleteItem() {
    console.log('Supprimer l\'élément');
    this.VarB_ShowContextMenu = false; // Fermez le menu contextuel après avoir cliqué sur une option
}

/* Début Group By */
items: any[] = [];  // Ajouter ceci en haut de la classe de composant
TS_GenerateUniqueID(): string {
  return Math.random().toString(36).substr(2, 9);
}
TS_GroupItems(): void {
  const selectedItems = this.items.filter(item => item.isSelected);
  if (selectedItems.length > 1) {
    const group = {
      id: this.TS_GenerateUniqueID(),
      type: 'group',
      children: selectedItems
    };
    this.items = this.items.filter(item => !item.isSelected);
    this.items.push(group);
  } else {
    console.log('Sélectionnez au moins deux éléments pour grouper.');
  }
}
/* Fin Group By */

/* Fin Contenu Menu */






}


