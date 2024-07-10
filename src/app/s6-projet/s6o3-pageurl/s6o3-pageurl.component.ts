/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { CdkDragDrop, CdkDragStart, CdkDragEnd, CdkDragMove, CdkDragEnter, moveItemInArray, transferArrayItem,copyArrayItem, DragDropModule } from '@angular/cdk/drag-drop';

/* Importation : Interface */
import { Interf_TabObjectCategory } from '../../s6-projet/s6o1-ruban/s6o1-ruban.component';
import { Interf_TabObject } from '../../s6-projet/s6o1-ruban/s6o1-ruban.component';

import { Interface_DraggableItem } from '../s6-projet.component'
import { Interface_Type } from '../s6-projet.component'


@Component({
  selector: 'app-s6o3-pageurl',
  templateUrl: './s6o3-pageurl.component.html',
  styleUrls: ['./s6o3-pageurl.component.css']
})
export class S6o3PageurlComponent implements OnInit, OnDestroy {

  constructor() { 
  }

  @Input() Input_Tab_Object_Added: Interf_TabObject[] = []
initialPosition: { x: number, y: number } | null = null
startPosition: { x: number, y: number } | null = null
TS_DragStart(event: CdkDragStart<Interface_DraggableItem>): void {
  const dragRef = event.source.getFreeDragPosition();
  let element = event.source.getRootElement() as HTMLElement;
  let x = dragRef.x;
  let y = dragRef.y;
  while(element) {
    x += element.offsetLeft - element.scrollLeft;
    y += element.offsetTop - element.scrollTop;
    if (!element.offsetParent) {
      break;
    }
    element = element.offsetParent as HTMLElement;
  }
  this.startPosition = { x, y };
  if (this.initialPosition === null) {
    this.initialPosition = { x, y };
  }
}
TS_DragEnd(event: CdkDragEnd<Interface_DraggableItem>): void {
  const dragRef = event.source.getFreeDragPosition();
  let element = event.source.getRootElement() as HTMLElement;
  let x = dragRef.x;
  let y = dragRef.y;
  while(element) {
    x += element.offsetLeft - element.scrollLeft;
    y += element.offsetTop - element.scrollTop;
    if (!element.offsetParent) {
      break;
    }
    element = element.offsetParent as HTMLElement;
  }
}

VarP_ContextMenuPosition = { x: 0, y: 0 }
VarB_ContextMenuVisible = false
VarS_SelectedItem: Interf_TabObject | null = null;
TS_OpenContextMenu(event: MouseEvent, item: Interf_TabObject): void {
  event.preventDefault();
  event.stopPropagation();
  this.VarP_ContextMenuPosition = { x: event.clientX, y: event.clientY };
  this.VarB_ContextMenuVisible = true;
  this.VarS_SelectedItem = item;
}

TS_BasculerItemDrag(item: Interf_TabObject): void {
  this.VarB_ContextMenuVisible = false
  if (item && item.Interf_TabObj_DragEnabled !== undefined) {
    item.Interf_TabObj_DragEnabled = !item.Interf_TabObj_DragEnabled
  }
}

@Output() Output_ItemDeleted = new EventEmitter<number>()
TS_DeleteItem(itemId: number | undefined): void {
  this.VarB_ContextMenuVisible = false;
  if (itemId === undefined) {
    console.log('No item selected for deletion');
    return;
  }
  this.Input_Tab_Object_Added = this.Input_Tab_Object_Added.filter(item => item.Interf_TabObj_Id !== itemId);
  this.VarB_ContextMenuVisible = false
  console.log('Item deleted:', itemId)
  this.Output_ItemDeleted.emit(itemId)
}



ngOnInit(): void {
  document.addEventListener('click', this.TS_ClickOutside.bind(this));
}
ngOnDestroy(): void {
  document.removeEventListener('click', this.TS_ClickOutside.bind(this));
}

TS_ClickOutside(event: MouseEvent): void {
  const targetElement = event.target as HTMLElement;
  // Vérifiez si le clic a été effectué en dehors du menu contextuel
  if (!targetElement.closest('.CSS_ContextMenu') && this.VarB_ContextMenuVisible) {
    this.VarB_ContextMenuVisible = false
  }
}

  
}


/*
@Input() Input_Tab_Object_Added: Array<[TabObjAdd_Id: number, TabObj_Id: number, 
  TabObj_Name: string, TabCatObj_Id: number, TabSize_Id1: number, TabSize_Id2: number, TabObjClick_DragEnabled?: boolean]> = []

@Input() Input_Tab_ObjectSize: Array<[TabSize_Id: number, TabSize_H: number, TabSize_W: number]> = []
TS_Size(TabSize_Id2: number): { width: number, height: number } {
  const size = this.Input_Tab_ObjectSize.find(size => size[0] === TabSize_Id2);
  return size ? { width: size[2], height: size[1] } : { width: 0, height: 0 }; // Remarquez l'inversion de height et width
}
*/


/*

@Input() Input_TabList_DraggableItem: Interface_DraggableItem[] = []
@Input() TabList_DraggableItem: Interface_DraggableItem[] = []


@Output() Output_TabLine_ItemAdded = new EventEmitter<Interface_DraggableItem>()
TS_ItemAdded(newItem: Interface_DraggableItem): void {
  this.Output_TabLine_ItemAdded.emit(newItem);
}

@ViewChild('pageContainer', { static: false }) pageContainer?: ElementRef;
  TS_DragEnd(event: CdkDragEnd<Interface_DraggableItem>, item: Interface_DraggableItem): void {
    if (this.pageContainer && item.InterfDI_Position) {
      const X = event.source.dropContainer.element.nativeElement.offsetLeft + event.source.getFreeDragPosition().x;
      const Y = event.source.dropContainer.element.nativeElement.offsetTop + event.source.getFreeDragPosition().y;
      const draggedItem = this.Input_TabList_DraggableItem.find(i => i.InterfDI_Id === item.InterfDI_Id);
      if (draggedItem) {
        draggedItem.InterfDI_Position = { X, Y };
        console.log('Item moved. New position:', draggedItem.InterfDI_Position);
      }
    }
  }

interface DraggableItem {
  id: number
  name: string
  position: { x: number, y: number }
  width: number
  height: number
  isOriginal: boolean
  dragEnabled: boolean
}


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['this.Tab2_ListItems']) {
      console.log('Tab2_ListItems2',this.Tab2_ListItems)
    }
  }

@Input() isTableauSelected: boolean = false   //  a effacer

  ClickDroite_FromFils: boolean = true
  TS_ClickDroite_FromFils(visible: boolean) {
    this.ClickDroite_FromFils = visible
    console.log('ClickDroite_FromFils',this.ClickDroite_FromFils)
  }

  ClickGauche_FromFils: boolean = true;
  TS_ClickGauche_FromFils(visible: boolean) {
    console.log('visible',visible)
    this.ClickGauche_FromFils = visible
  }
  FromGestionbd_VarIB_Nom: string = '';
  TS_ClickGauche_FromFils_VarIB_Nom(value: string) {
      this.FromGestionbd_VarIB_Nom = value;
  }

*/




/*




  @Input() Input_TabList_DraggableItem: Interface_DraggableItem[] = []
  TS_Drop(event: CdkDragDrop<Interface_DraggableItem[]>): void {
    console.log('3')
    // Vérifier si les données de conteneur sont définies
    if (!event.container.data || !event.previousContainer.data) {
      console.error('Erreur: les données du conteneur sont undefined')
      return;
    }
    // Vérifier si les indices sont valides
    if (event.previousIndex >= event.container.data.length || event.currentIndex >= event.container.data.length) {
      console.error('Erreur: indice hors limites')
      return;
    }
    if (event.previousContainer === event.container) {
      // Déplacer l'élément dans le même conteneur
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Transférer l'élément d'un conteneur à un autre
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
    // Affichage de la nouvelle commande des éléments pour le débogage
    console.log('Item déplacé. Nouvel ordre:', this.Input_TabList_DraggableItem.map(item => item.InterfDI_Name));
  }


  @ViewChild('pageContainer', { static: false }) pageContainer?: ElementRef;
  relativeCursorPos: { x: number, y: number } = { x: 0, y: 0 };
  currentDragPosition: { x: number, y: number } = { x: 0, y: 0 };
  TS_DragStart(event: CdkDragStart<Interface_DraggableItem>, item: Interface_DraggableItem): void {
    console.log('1')
    // Use the stored position
    if (this.pageContainer && item.InterfDI_Position) {
      const rect = this.pageContainer.nativeElement.getBoundingClientRect();
      this.relativeCursorPos.x = this.currentDragPosition.x - rect.left - item.InterfDI_Position.X;
      this.relativeCursorPos.y = this.currentDragPosition.y - rect.top - item.InterfDI_Position.Y;
    }
    console.log('Relative cursor position:', this.relativeCursorPos);
  }

  TS_DragEnd(event: CdkDragEnd<Interface_DraggableItem>, item: Interface_DraggableItem): void {
    console.log('2')
    // Utiliser la position stockée
    if (this.pageContainer && item.InterfDI_Position) {
      const rect = this.pageContainer.nativeElement.getBoundingClientRect();
      const X = event.source.dropContainer.element.nativeElement.offsetLeft + event.source.getFreeDragPosition().x;
      const Y = event.source.dropContainer.element.nativeElement.offsetTop + event.source.getFreeDragPosition().y;
      const draggedItem = this.Input_TabList_DraggableItem.find(i => i.InterfDI_Id === item.InterfDI_Id);
      if (draggedItem) {
        draggedItem.InterfDI_Position = { X, Y };
        console.log('L\'élément', draggedItem.InterfDI_Id, 'a été déplacé. Nouvelle position:', draggedItem.InterfDI_Position);
      }
    }
  }
  

*/