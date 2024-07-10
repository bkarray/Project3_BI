

import { Component, OnInit, SimpleChanges } from '@angular/core';

/* Importation : Composant Angular */
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

/* Importation : s8o8o1-ressources */
import { S8o8o1RessourcesService } from '../../../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';

/* Importation : s8o8o3-sce-communication */
import { S8o8o3SceCommunicationService } from '../../../../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service';



/* Importation : Table T_Button */
import { T_Button } from '../../../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';

/* Importation : Démasquer Menu en cliquant Bouton gauche ou dehors */
import { Renderer2, ElementRef } from '@angular/core';  

import { Subscription } from 'rxjs';


// Interfaces pour les types personnalisés
interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

@Component({
  selector: 'app-s8o1o8o1o2-resize',
  templateUrl: './s8o1o8o1o2-resize.component.html',
  styleUrls: ['./s8o1o8o1o2-resize.component.css']
})
export class S8o1o8o1o2ResizeComponent implements OnInit {

 
  data: any;
  
  constructor(
    /* Importation : Composant Angular */
    private router: Router,
    /* Importation : s8o8o1-ressources */
    private S8o8o1RessourcesService: S8o8o1RessourcesService,
    /* Importation : Démasquer Menu en cliquant Bouton gauche ou dehors */
    private el: ElementRef,
    private renderer: Renderer2,
    private S8o8o3SceCommunicationService: S8o8o3SceCommunicationService
    ) 
    {} 
    
  ngOnInit(): void {
  }




  
  public VarXY_StartPosition: Position = { x: 0, y: 0 };
  public VarXY_Size: Size = { width: 200, height: 200 };
  public VarXY_StartSize: Size = { width: 0, height: 0 };

  // Tailles maximales et minimales pour la popup
  public VarXY_MaxSize: Size = { width: 1000, height: 1000 };
  public VarXY_MinSize: Size = { width: 100, height: 100 };

  // Variables d'état de la popup
  public VarXY_Position: Position = { x: 0, y: 0 };



  // Méthodes pour gérer la popup
  
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


}


