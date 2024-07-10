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
import { data } from '../../../s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';

/* Importation : Service */
import { S8o8o1RessourcesService } from '../../s8o8-services/s8o8o1-ressources/s8o8o1-ressources.service';
import { S8o8o2SceDatabaseService } from '../../s8o8-services/s8o8o2-sce-database/s8o8o2-sce-database.service';
import { S8o8o3SceCommunicationService } from '../../s8o8-services/s8o8o3-sce-communication/s8o8o3-sce-communication.service';
import { S8o8o4NotifyResourceUpdatedService } from '../../s8o8-services/s8o8o4-NotifyResourceUpdated/s8o8o4-notify-resource-updated.service';

@Component({
  selector: 'app-s8o1o8-product',
  templateUrl: './s8o1o8-product.component.html',
  styleUrls: ['./s8o1o8-product.component.css']
})
export class S8o1o8ProductComponent implements OnInit {

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


VarB_ShowContextMenu = false;
ngOnInit(): void {
  this.VarB_ShowContextMenu = !this.VarB_ShowContextMenu;
}

/*
TS_SettingsItem() {
  this.VarB_ShowContextMenu = !this.VarB_ShowContextMenu;
  
}

TS_DeleteItem() {
    console.log('Supprimer l\'élément');
    this.VarB_ShowContextMenu = false; // Fermez le menu contextuel après avoir cliqué sur une option
}

items: any[] = [];
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
TS_GenerateUniqueID(): string {
  return Math.random().toString(36).substr(2, 9);
}


*/

  /* 
  VarXY_ContextMenuPosition = { x: 0, y: 0 };
  */
  
 

}


