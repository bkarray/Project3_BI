/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { CdkDragDrop, CdkDragStart, CdkDragEnd, CdkDragMove, CdkDragEnter, moveItemInArray, transferArrayItem,copyArrayItem, } from '@angular/cdk/drag-drop';


/* Importation : Interface */
import { Interface_DraggableItem } from '../s6-projet.component'
import { Interface_Type } from '../s6-projet.component'


@Component({
  selector: 'app-s6o1-ruban',
  templateUrl: './s6o1-ruban.component.html',
  styleUrls: ['./s6o1-ruban.component.css']
})
export class S6o1RubanComponent implements OnInit {

  TS_CreateTabObjectCategory(id: number, name: string): Interf_TabObjectCategory {
    return { Interf_TabObjCat_Id: id, Interf_TabObjCat_Name: name }
  }
  Tab_ObjectCategory_1: Interf_TabObjectCategory[] = [
    this.TS_CreateTabObjectCategory(1, 'Forms'),
    this.TS_CreateTabObjectCategory(2, 'DataBase'),
    this.TS_CreateTabObjectCategory(3, 'ListeDeroulante'),
    this.TS_CreateTabObjectCategory(4, 'UserInterface'),
  ]
  
  TS_CreateTabObjectCategory_2(Id: number, Name: string, IdParent: number, H: number, W: number, Img?: File): Interf_TabObjectCategory {
    return {
        Interf_TabObjCat_Id: Id,
        Interf_TabObjCat_Name: Name,
        Interf_TabObjCat_IdParent: IdParent,
        Interf_TabObjCat_SizeH: H,
        Interf_TabObjCat_SizeW: W,
        Interf_TabObjCat_Image: Img}}
  Tab_ObjectCategory_2: Interf_TabObjectCategory[] = [
    this.TS_CreateTabObjectCategory_2(100, 'Rectangle', 1, 500, 300),
        this.TS_CreateTabObjectCategory_2(101, 'Ellipse', 1, 500, 300),
        this.TS_CreateTabObjectCategory_2(102, 'Rectangle Arrondi', 1, 500, 300),
    this.TS_CreateTabObjectCategory_2(200, 'Category', 2, 500, 300),
        this.TS_CreateTabObjectCategory_2(201, 'AllTable', 2, 500, 300),
        this.TS_CreateTabObjectCategory_2(202, 'GestionBD', 2, 500, 300),
        this.TS_CreateTabObjectCategory_2(203, 'Table', 2, 500, 300),
    this.TS_CreateTabObjectCategory_2(300, 'LD_Standard', 3, 500, 300),
        this.TS_CreateTabObjectCategory_2(301, 'LD_Vertical', 3, 500, 300),
        this.TS_CreateTabObjectCategory_2(302, 'LD_Horizontal', 3, 500, 300),
        this.TS_CreateTabObjectCategory_2(303, 'LD_Vertical_Contenu', 3, 500, 300),
        this.TS_CreateTabObjectCategory_2(304, 'LD_Horizontal_Contenu', 3, 500, 300),
    this.TS_CreateTabObjectCategory_2(400, 'Bouton', 4, 500, 300),
        this.TS_CreateTabObjectCategory_2(401, 'Tableau', 4, 500, 300),
        this.TS_CreateTabObjectCategory_2(402, 'Zone_Texte', 4, 500, 300),
        this.TS_CreateTabObjectCategory_2(403, 'Image', 4, 500, 300),
        this.TS_CreateTabObjectCategory_2(404, 'Piece_Jointe', 4, 500, 300),
        this.TS_CreateTabObjectCategory_2(405, 'Input', 4, 500, 300),
        this.TS_CreateTabObjectCategory_2(406, 'Radio', 4, 500, 300),
        this.TS_CreateTabObjectCategory_2(407, 'Choix_Multiple', 4, 500, 300)
  ]
  
  Tab_FilteredObject: Interf_TabObjectCategory[] = []
  TS_CategoryObject_Clicked(value: number): void {
    this.Tab_FilteredObject = this.Tab_ObjectCategory_2.filter(obj => obj.Interf_TabObjCat_IdParent === value)
    console.log('this.Tab_FilteredObject',this.Tab_FilteredObject)
    if (this.Tab_FilteredObject.length === 0) {
      console.error("Catégorie non trouvée pour la valeur donnée");
    }
  }
  

  private nextId = 10
  @Output() Output_Tab_Object_clicked = new EventEmitter<Interf_TabObject>()
  /*@Output() Output_Tab_Object_clicked = new EventEmitter<[number, number, string, number, number, number]>()*/
  /*@Output() Output_Tab_ObjectSize = new EventEmitter<Array<[number, number, number]>>();*/
  TS_FilteredObject_Clicked(Tab_Object_clicked: Interf_TabObjectCategory): void {
    let Tab_Object_clicked_adj: Interf_TabObject = {
      Interf_TabObj_Id: this.nextId,
      Interf_TabObjCat_Id: Tab_Object_clicked.Interf_TabObjCat_Id, 
      Interf_TabObj_Name: Tab_Object_clicked.Interf_TabObjCat_Name,
      Interf_TabObj_SizeH: Tab_Object_clicked.Interf_TabObjCat_SizeH ?? 0,
      Interf_TabObj_SizeW: Tab_Object_clicked.Interf_TabObjCat_SizeW ?? 0,
      Interf_TabObj_DragEnabled: true // or some default value
    }
    this.nextId++;
    console.log('Tab_Object_clicked_adj',Tab_Object_clicked_adj)
    this.Output_Tab_Object_clicked.emit(Tab_Object_clicked_adj)
    /*this.Output_Tab_ObjectSize.emit(this.Tab_ObjectSize)*/
  }
  


                    
ngOnInit(): void {
}




}

export interface Interf_TabObjectCategory {
  Interf_TabObjCat_Id: number
  Interf_TabObjCat_Name: string
  Interf_TabObjCat_IdParent?: number
  Interf_TabObjCat_SizeH?: number
  Interf_TabObjCat_SizeW?: number
  Interf_TabObjCat_Image?: File
}

export interface Interf_TabObject {
  Interf_TabObj_Id: number
  Interf_TabObjCat_Id: number
  Interf_TabObj_Name?: string
  Interf_TabObj_SizeH?: number
  Interf_TabObj_SizeW?: number
  Interf_TabObj_Image?: File
  Interf_TabObj_DragEnabled?: boolean;
}

/*
  Tab_ObjectCategory: Array<[TabCatObj_Id: number, TabCatObj_Name: string]> = 
  [ 
    [1,'Forms'] , [2, 'DataBase'] , [3, 'ListeDeroulante'] , [4, 'UserInterface']
  ]

  Tab_Object: Array<[TabObj_Id: number, TabObj_Name: string, TabCatObj_Id: number, TabSize_Id1: number, TabSize_Id2: number]> = 
  [ 
    [100,'Rectangle', 1 ,1, 4],[101,'Ellipse', 1 ,1, 4],[102,'Rectangle Arrondi', 1 ,1, 4],
    [200,'Category', 2 ,1, 4],[201,'AllTable', 2 ,1, 4],[202,'Table', 2 ,1, 4],
    [300,'LD_Standard', 3 ,1, 4],[301,'LD_Vertical', 3 ,1, 4],[302,'LD_Horizontal', 3 ,1, 4],[303,'LD_Vertical_Contenu', 3 ,1, 4],[304,'LD_Horizontal_Contenu', 3 ,1, 4],
    [400,'Bouton', 4 ,1, 4],[401,'Tableau', 4 ,1, 4],[402,'Zone_Texte', 4 ,1, 4],[403,'Image', 4 ,1, 4],[404,'Piece_Jointe', 4 ,1, 4],
      [405,'Input', 4 ,1, 4],[406,'Radio', 4 ,1, 4],[407,'Choix_Multiple', 4 ,1, 4],
  ]

  Tab_ObjectSize: Array<[TabSize_Id: number, TabSize_H: number, TabSize_W: number]> = 
  [ 
    [ 1, 10, 10 ],
    [ 2, 10, 100 ],
    [ 3, 100, 10 ],
    [ 4, 100, 100 ]
  ]

  Tab_ObjectImage: Array<[TabSize_Id: number, TabSize_Image: File ]> = 
  [ 

  ]

  
Tab_RubanItems: Array<[string, number, number]> = 
  [ 
    ['Rectangle', 2, 0] , ['Ellipse', 2, 1] , ['Rectangle Arrondi', 2, 2] , ['Bouton', 3, 3] , ['Tableau', 2, 2] , 
    ['Zone_Texte', 2, 2] , ['Image', 2, 2] , ['Piece_Jointe', 2, 2] , ['Input', 2, 2] , ['Image', 2, 2] , ['LD', 2, 2] ,
    ['Radio', 2, 2] , ['Choix_Multiple', 2, 2] , ['LD_Vertical', 2, 2] , ['LD_Horizontal', 2, 2] , ['LD_Vertical_Contenu', 2, 2] , 
    ['LD_Horizontal_Contenu', 0, 2] , ['Gestion_BD', 2, 2] , ['Table', 2, 3] ,
    ['Gestion_BD', 2, 2] , ['Table', 2, 3] ,

  ]

*/







/*
@Input() Input_TabList_Type: Interface_Type[] = []
TS_GetRubanSize(typeId: number): {width: string, height: string} {
  const type = this.Input_TabList_Type.find(t => t.InterfT_Id === typeId);
  if (type) {
    return {
      width: type.InterfT_Ruban_Taille_Initial.W + 'px',
      height: type.InterfT_Ruban_Taille_Initial.H + 'px'
    };
  }
  return {width: 'auto', height: 'auto'}; // Retourne une valeur par défaut si non trouvé
}

@Output() Output_TabLine_ItemAdded = new EventEmitter<Interface_DraggableItem>()
TS_ItemClicked(itemName: string): void {
  const found_itemLine = this.Tab_RubanItems.find(itemLine => itemLine[0] === itemName)
  if (found_itemLine) {
    const typeValue = found_itemLine[2]
    const newItem: Interface_DraggableItem = { 
      InterfDI_Id: this.nextId++, 
      InterfDI_Name: itemName,
      InterfDI_Type:  [this.Input_TabList_Type[typeValue]]
      // InterfDI_Position // InterfDI_Taille // InterfDI_Image // InterfDI_DragEnabled      
    }
    this.Output_TabLine_ItemAdded.emit(newItem)
  } else {
    console.error("Element non trouvé dans Tab_RubanItems");
  }
}
*/
  /*
    this.TabList_DraggableItem.push(
      this.TS_CreateDraggableItem(
        this.nextId++, 'itemName', 
        [this.Input_TabList_Type[typeValue]], 
        { X: 0, Y: 0 }, { H: 0, W: 0 }, 
        true)
    )
    */
/* 
TS_CreateDraggableItem(id: number, name: string, type: Interface_Type[], position: { X: number, Y: number }, taille: { H: number, W: number }, dragEnabled: boolean, image?: File): Interface_DraggableItem {
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
*/

/*

Tab_ListItems: Interface_DraggableItem[] = []
@Output() tableauSelected = new EventEmitter<void>()
Tab_NewLine_DraggableItem: Interface_DraggableItem[] = []
TabList_DraggableItem: Interface_DraggableItem[] = []

  rubanItems: string[] = ['Rectangle', 'Ellipse', 'Rectangle Arrondi', 'Bouton', 'Tableau',
                          'Zone_Texte', 'Image', 'Piece_Jointe', 'Input', 'Image',
                          'LD', 'Radio', 'Choix_Multiple',
                          'LD_Vertical', 'LD_Horizontal', 'LD_Vertical_Contenu', 'LD_Horizontal_Contenu',
                          'Gestion_BD', 'Table']


  TS_ItemClicked(item: string): void {
  const newItem: Interface_DraggableItem = { 
    InterfDI_Id: this.nextId++, 
    InterfDI_Name: item, // en fonction de nom l'item on a le type dans RubanItems, Id, Name & Type
    InterfDI_Type: [], 
    InterfDI_Position: { X: 0, Y: 0 },
    InterfDI_Taille:  { H: 0, W: 0 }, 
    // InterfDI_Image
    InterfDI_DragEnabled: true
  }
  this.Tab_ListItems.push(newItem)
  this.Output_TabLine_ItemAdded.emit(newItem)
  if (item === 'Tableau' || item === 'Gestion_BD' || item === 'Table' ) {
    this.tableauSelected.emit()  // Émettre un événement lorsque Tableau est sélectionné
  }
}

*/