/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { CdkDragDrop, CdkDragStart, CdkDragEnd, CdkDragMove, CdkDragEnter, moveItemInArray, transferArrayItem,copyArrayItem,  } from '@angular/cdk/drag-drop';


/* Importation : Interface */
import { Interf_TabObjectCategory } from '../../s6-projet/s6o1-ruban/s6o1-ruban.component';
import { Interf_TabObject } from '../../s6-projet/s6o1-ruban/s6o1-ruban.component';

import { Interface_DraggableItem } from '../s6-projet.component'
import { Interface_Type } from '../s6-projet.component'

@Component({
  selector: 'app-s6o5-items',
  templateUrl: './s6o5-items.component.html',
  styleUrls: ['./s6o5-items.component.css']
})
export class S6o5ItemsComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  @Input() Input_Tab_Object_Added: Interf_TabObject[] = []
  

  @Input() Input_TabList_Type: Interface_DraggableItem[] = []
  @Input() TabList_DraggableItem: Interface_DraggableItem[] = []
  @Output() Output_TabLine_ItemAdded = new EventEmitter<Interface_DraggableItem>()
  TS_ItemAdded(newItem: Interface_DraggableItem): void {
    this.Output_TabLine_ItemAdded.emit(newItem);
  }
  
  @ViewChild('pageContainer', { static: false }) pageContainer?: ElementRef

  @Input() Input_TabLine_DraggableItem: Interface_DraggableItem[] = []
  ngOnInit(): void {
    if (this.Input_TabLine_DraggableItem && this.Input_TabLine_DraggableItem.length > 0) {
      // Affiche le nom du premier élément dans la console
      console.log('Nom du premier élément:', this.Input_TabLine_DraggableItem[0].InterfDI_Name);
    } else {
      console.log('Input_TabLine_DraggableItem est vide ou non défini');
    }
    
    this.renderer.listen('window', 'click', (event: Event) => {
      // Appeler la méthode pour fermer le menu contextuel si le clic se produit en dehors du menu
      this.TS_CloseContextMenuOnOutsideClick(event)
    })
  }
  


  TS_OpenContextMenu(event: MouseEvent, item: Interface_DraggableItem): void {
    event.preventDefault();
    const isSpecialButton = event.target instanceof HTMLElement && 
                          (event.target.className.includes('CSS_ButtonBasculer') || 
                           event.target.className.includes('CSS_Button') ||
                           event.target.className.includes('CSS_TableBD'));
    if (isSpecialButton) {
      return; // Ne pas ouvrir le menu contextuel par défaut pour ces boutons
    }
    const isOptionClick = event.target instanceof HTMLElement && event.target.closest('.CSS_Button');
    if (isOptionClick) {
      return; // Ne pas ouvrir le menu contextuel si le clic provient d'un bouton d'options
    }
    const targetElement = event.target as HTMLElement;
    const closestResizable = targetElement.closest('.CSS_Item_Resizable') as HTMLElement;
    if (closestResizable) {
      const contextMenu = closestResizable.querySelector('.context-menu') as HTMLElement;
      // Position X - à l'endroit du clic
      let menuX = event.clientX;
      // Vérification des limites de l'écran
      const screenWidth = window.innerWidth;
      if (menuX + contextMenu.offsetWidth > screenWidth) {
        menuX = screenWidth - contextMenu.offsetWidth; // Ajuster pour rester dans l'écran
      }
      contextMenu.style.left = `${menuX}px`
      contextMenu.style.top = `${event.clientY}px`
      contextMenu.style.display = 'block'
    } else {
      console.error('Élément .CSS_Item_Resizable le plus proche introuvable.');
    }
  }

  @Output() itemDeleted = new EventEmitter<number>();
  TS_DeleteItem(itemId: number): void {
    this.TabList_DraggableItem = this.TabList_DraggableItem.filter(item => item.InterfDI_Id !== itemId);
    this.itemDeleted.emit(itemId); // Émettre l'ID de l'élément supprimé
    console.log('Item deleted:', itemId);
    console.log('this.TabList_DraggableItem', this.TabList_DraggableItem);
  }

  TS_BasculerItemDrag(item: Interface_DraggableItem, event: MouseEvent): void {
    item.InterfDI_DragEnabled = !item.InterfDI_DragEnabled;
    this.TS_CloseContextMenu() // Ajout pour masquer le menu contextuel
    event.stopPropagation()// Empêcher l'événement de se propager
  }
 
  TS_CloseContextMenu(): void {
    if (this.pageContainer) {
      const contextMenus = this.pageContainer.nativeElement.querySelectorAll('.context-menu')
      contextMenus.forEach((menu: HTMLElement) => menu.style.display = 'none')
    }
  }

  TS_CloseContextMenuOnOutsideClick(event: Event): void {
    const clickTarget = event.target as HTMLElement
    if (!clickTarget.closest('.CSS_Item_Resizable')) {
      this.TS_CloseContextMenu()
    }
  }


}


interface TabObject {
  TabObjAdd_Id: number;
  TabObj_Id: number;
  TabObj_Name: string;
  TabCatObj_Id: number;
  TabSize_Id1: number;
  TabSize_Id2: number;
  TabObjClick_DragEnabled?: boolean;
}

/*
  @Input() Input_Tab_Object_Added: Array<[TabObjAdd_Id: number, TabObj_Id: number, 
  TabObj_Name: string, TabCatObj_Id: number, TabSize_Id1: number, TabSize_Id2: number, TabObjClick_DragEnabled?: boolean]> = []

  @Input() Input_Tab_Object_Added: TabObject[] = [];
*/