

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


@Component({
  selector: 'app-s8o1o8o1o3-rightclick',
  templateUrl: './s8o1o8o1o3-rightclick.component.html',
  styleUrls: ['./s8o1o8o1o3-rightclick.component.css']
})
export class S8o1o8o1o3RightclickComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

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


}
