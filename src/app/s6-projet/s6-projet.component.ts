/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';


import { Interf_TabObjectCategory } from '../s6-projet/s6o1-ruban/s6o1-ruban.component';
import { Interf_TabObject } from '../s6-projet/s6o1-ruban/s6o1-ruban.component';

@Component({
  selector: 'app-s6-projet',
  templateUrl: './s6-projet.component.html',
  styleUrls: ['./s6-projet.component.css']
})
export class S6ProjetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Tab_Object_Added: Interf_TabObject[] = []
  TS_ObjectAdded(Tab_Object_clicked: Interf_TabObject): void {
    this.Tab_Object_Added.push(Tab_Object_clicked)
    console.log('After Add : Tab_Object_Added', this.Tab_Object_Added);
  }

  TS_ObjectDeleted(value: number): void {
    this.Tab_Object_Added = this.Tab_Object_Added.filter(item => item.Interf_TabObj_Id !== value)
    console.log('After Delete : Tab_Object_Added',this.Tab_Object_Added)
  }
  
  Tab_ObjectSize: Array<[TabSize_Id: number, TabSize_H: number, TabSize_W: number]> = []
  TS_ObjectSize(Tab_ObjectSize: Array<[TabSize_Id: number, TabSize_H: number, TabSize_W: number]>): void {
    this.Tab_ObjectSize = Tab_ObjectSize
  }
/*
 TS_DeleteItem(itemId: number): void {
    this.TabList_DraggableItem = this.TabList_DraggableItem.filter(item => item.InterfDI_Id !== itemId)
    console.log('Updated TabList_DraggableItem after deletion:', this.TabList_DraggableItem)
}

*/ 






  TabList_DraggableItem: Interface_DraggableItem[] = []
  TS_ItemAdded(newItem: Interface_DraggableItem): void {
    this.TabList_DraggableItem.push(newItem)
    console.log('newItem',newItem)
    console.log('this.TabList_DraggableItem',this.TabList_DraggableItem)
  }

  selectedUrl: string = '';
  TS_ClickURL(url: string): void {
    this.selectedUrl = url; // Mettez à jour l'URL sélectionnée
  }



 


  

  
  isTableauSelected: boolean = false;
  onTableauSelected(): void {
    this.isTableauSelected = true;
  }






TS_CreateDraggableItem(id: number, name: string, type: Interface_Type[], position: { X: number, Y: number }, taille: { H: number, W: number },  dragEnabled: boolean, image?: File): Interface_DraggableItem {
  return {
    InterfDI_Id: id,
    InterfDI_Name: name,
    InterfDI_Type: type,
    InterfDI_Position: position,
    InterfDI_Taille: taille,
    InterfDI_DragEnabled: dragEnabled,
    InterfDI_Image: image
  }
}


  
  TabList_Type: Interface_Type[] = [
    this.TS_CreateType(1, 'T1 - XS', { H: 10, W: 10 }, { H: 150, W: 100 }),
    this.TS_CreateType(2, 'T2 - S', { H: 10, W: 10 }, { H: 300, W: 150 }),
    this.TS_CreateType(3, 'T3 - M', { H: 10, W: 10 }, {  H: 400, W: 200  }),
    this.TS_CreateType(4, 'T4 - L', { H: 10, W: 10 }, { H: 400, W: 200 }),
    this.TS_CreateType(5, 'T5 - XL', { H: 10, W: 10 }, { H: 1000, W: 60 })
  ]

  TS_CreateType( id: number, type: string, rubanTaille: { H: number, W: number }, pageURLTaille: { H: number, W: number },  image1?: File, image2?: File ) {
    return {
      InterfT_Id: id,
      InterfT_Type: type,
      InterfT_Ruban_Taille_Initial: rubanTaille,
      InterfT_PageURL_Taille_Initial: pageURLTaille,
      InterfT_Ruban_Image: image1,
      InterfT_PageURL_Image: image2,
    }
  }

}



/* Importation : Interface */
/*
import { Interface_DraggableItem } from '../s6-projet.component'
*/

export interface Interface_DraggableItem{
  InterfDI_Id: number
  InterfDI_Name: string
  InterfDI_Content?: string
  InterfDI_Type: Interface_Type[]
  InterfDI_Position?: { X: number, Y: number }
  InterfDI_Taille?:  { H: number, W: number }
  InterfDI_Image?: File
  InterfDI_DragEnabled?: boolean
}

export interface Interface_Type{
  InterfT_Id: number
  InterfT_Type: string
  InterfT_Ruban_Taille_Initial: { H: number, W: number }
  InterfT_Ruban_Image?: File
  InterfT_PageURL_Taille_Initial: { H: number, W: number }
  InterfT_PageURL_Image?: File
}

/*

interface DraggableItem {
  id: number;
  name: string;
  position: { x: number, y: number };
  width: number;
  height: number;
  isOriginal: boolean;
  dragEnabled: boolean; 
}

*/



/*

TabList_Type: Interface_Type[] = []
private TS_Init_Type(): void {  
  this.TabList_Type.push(
    this.TS_CreateType(1, 'T1', { H: 100, W: 200 }, { H: 300, W: 500 }),
    this.TS_CreateType(2, 'T2', { H: 1020, W: 2010 }, { H: 3300, W: 5010 }),
    this.TS_CreateType(3, 'T3', { H: 80, W: 120 }, { H: 320, W: 5020 })
  )
}
*/