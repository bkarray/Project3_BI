
/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { CdkDragDrop, CdkDragStart, CdkDragEnd, CdkDragMove, CdkDragEnter, moveItemInArray, transferArrayItem,copyArrayItem,  } from '@angular/cdk/drag-drop';


import { S6o9ServiceService } from '../../../../s6-projet/s6o9-service/s6o9-service.service';

/* Importation : Interface */
import { Interface_DraggableItem } from '../../../s6-projet.component'
import { Interface_Type } from '../../../s6-projet.component'



@Component({
  selector: 'app-s6o5o5o1-gestionbd',
  templateUrl: './s6o5o5o1-gestionbd.component.html',
  styleUrls: ['./s6o5o5o1-gestionbd.component.css']
})
export class S6o5o5o1GestionbdComponent implements OnInit {

 
  constructor(private s6o9Service: S6o9ServiceService) { }

  listIds: string[] = [];
  ngOnInit(): void {
  }

  Tab_Bouton_1: Interface_Bouton[] = []

TS_AjouterBouton(TabIB_Parent_Line?: Interface_Bouton, VarIB_Type: 'Sous_Bouton' | 'Table_BD' = 'Sous_Bouton') {
    // Déterminer le VarIB_Nom du bouton en fonction de son VarIB_Type
    let nomBouton = '';
    switch (VarIB_Type) {
      case 'Sous_Bouton':
        nomBouton = this.TS_GenererNomBouton(TabIB_Parent_Line, false);
        break;
      case 'Table_BD':
        nomBouton = this.TS_GenererNomBouton(TabIB_Parent_Line, true);
        break;
    }
    // Créer le nouveau bouton avec les propriétés appropriées
    const nouveauBouton: Interface_Bouton = {
      InterfIB_Id: this.TS_GenererIdUnique(),
      InterfIB_Nom: nomBouton,
      InterfIB_EnEdition: false,
      InterfIB_RectangleVisible: false,
      InterfIB_ListeVisible: false,
      InterfIB_SousBoutons: [],
      InterfIB_SousBoutonsVisible: false,
      InterfIB_EstTableBD: VarIB_Type === 'Table_BD', // Indiquer s'il s'agit d'un bouton 'Table_BD'
      InterfIB_Type: VarIB_Type, // Utilisez la valeur correcte pour le VarIB_Type
    };
    // Ajouter le nouveau bouton soit à la liste principale, soit comme Sous_Bouton
    if (TabIB_Parent_Line) {
      TabIB_Parent_Line.InterfIB_SousBoutons.push(nouveauBouton);
      TabIB_Parent_Line.InterfIB_SousBoutonsVisible = true; // Assurez-vous que les Sous_Boutons sont visibles
    } else {
      this.Tab_Bouton_1.push(nouveauBouton);
    }
    // Masquer le menu d'options après l'ajout
    if (TabIB_Parent_Line) {
      TabIB_Parent_Line.InterfIB_ListeVisible = false;
    }
    console.log('nouveauBouton',nouveauBouton)
}
TS_GenererNomBouton(TabIB_Parent_Line?: Interface_Bouton, VarIB_EstTableBD: boolean = false): string {
  let prefixe = VarIB_EstTableBD ? 'TableBD' : 'Sous_Bouton'
  let index: string
  if (TabIB_Parent_Line && TabIB_Parent_Line.InterfIB_Nom) {
    // Assurez-vous que TabIB_Parent_Line et TabIB_Parent_Line.VarIB_Nom sont définis
    const indexParent = TabIB_Parent_Line.InterfIB_Nom.split('-')[1]; // Extrait l'index du TabIB_Parent_Line
    const indexSousBouton = TabIB_Parent_Line.InterfIB_SousBoutons.length + 1
    index = `${indexParent}.${indexSousBouton}`
  } else {
    // Numérotation basée sur le nombre total de boutons
    const indexTotal = this.Tab_Bouton_1.length + 1
    index = `${indexTotal}`
  }
  return `${prefixe} - ${index}`
}
private idCompteur = 0;
private TS_GenererIdUnique(): string {
  return `bouton-${this.idCompteur++}`;
}

addToListIds(bouton: Interface_Bouton) {
  // Ajoutez l'ID de ce bouton à la liste
  this.listIds.push(bouton.InterfIB_Id);

  // Faites-le récursivement pour tous les sous-boutons
  bouton.InterfIB_SousBoutons.forEach(sb => this.addToListIds(sb));
}
TS_Drop_BD(event: CdkDragDrop<Interface_Bouton[]>, TabIB_Parent_Line?: Interface_Bouton) {
  if (event.previousContainer === event.container) {
    // Si l'élément est déplacé dans le même conteneur, réorganisez simplement la liste.
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    // Si l'élément est déplacé vers un autre conteneur, transférez l'élément.
    if (this.canDrop(event.item.data, TabIB_Parent_Line)) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // Mise à jour du parent pour l'élément déplacé
      event.container.data[event.currentIndex].InterfIB_Parent = TabIB_Parent_Line;
      // Mettre à jour les noms ou d'autres propriétés si nécessaire, en fonction de votre logique métier
      this.TS_MiseAJourNomsSousBoutons(event.container.data[event.currentIndex], TabIB_Parent_Line);
    }
  }
}

canDrop(item: Interface_Bouton, parent?: Interface_Bouton): boolean {
  // Autoriser le déplacement si l'item est un Sous_Bouton ou si l'item est un Table_BD et le parent est un Sous_Bouton
  return true;
}



TS_MiseAJourNomsSousBoutons(TabIB_Bouton_Line: Interface_Bouton, TabIB_Parent_Line?: Interface_Bouton) {
  // Si le TabIB_Bouton_Line a un TabIB_Parent_Line, mettre à jour son nom en fonction du TabIB_Parent_Line
  if (TabIB_Parent_Line) {
    TabIB_Bouton_Line.InterfIB_Nom = `${TabIB_Parent_Line.InterfIB_Nom}.${TabIB_Parent_Line.InterfIB_SousBoutons.indexOf(TabIB_Bouton_Line) + 1}`;
  }
  // Mise à jour récursive pour les Sous_Boutons
  TabIB_Bouton_Line.InterfIB_SousBoutons.forEach((sousBouton) => {
    this.TS_MiseAJourNomsSousBoutons(sousBouton, TabIB_Bouton_Line);
  })
}


ClickDroite_ToParent: boolean = true;
@Output() ClickDroite_ToParentChange = new EventEmitter<boolean>()
TS_GererClicDroite(TabIB_Bouton_Line: Interface_Bouton, event: MouseEvent): void {
  event.preventDefault(); // Pour éviter l'apparition du menu contextuel du navigateur
  this.TS_MasquerAutresMenus(TabIB_Bouton_Line) // Masquer tous les autres menus
  TabIB_Bouton_Line.InterfIB_ListeVisible = !TabIB_Bouton_Line.InterfIB_ListeVisible
  this.ClickDroite_ToParent = false
  this.ClickDroite_ToParentChange.emit(this.ClickDroite_ToParent)
}
private TS_MasquerAutresMenus(TabIB_Bouton_LineActuel: Interface_Bouton) {
  const masquerMenu = (TabIB_Bouton_Line: Interface_Bouton) => {
    if (TabIB_Bouton_Line !== TabIB_Bouton_LineActuel) {
      TabIB_Bouton_Line.InterfIB_ListeVisible = false
    }
    TabIB_Bouton_Line.InterfIB_SousBoutons.forEach(sb => masquerMenu(sb)); // Appel récursif pour les Sous_Boutons
  }
  this.Tab_Bouton_1.forEach(TabIB_Bouton_Line => masquerMenu(TabIB_Bouton_Line));
}


TS_Basculer_SousBoutons(TabIB_Bouton_Line: Interface_Bouton) {
  TabIB_Bouton_Line.InterfIB_SousBoutonsVisible = !TabIB_Bouton_Line.InterfIB_SousBoutonsVisible;
}

VarIB_Nom: string | undefined
@Output() VarIB_NomChange = new EventEmitter<string>()
ClickGauche_ToParent: boolean = false;
@Output() ClickGauche_ToParentChange = new EventEmitter<boolean>()
TS_GererClicGauche(TabIB_Bouton_Line: Interface_Bouton, event: MouseEvent): void {
  this.VarIB_Nom = TabIB_Bouton_Line.InterfIB_Nom
  this.VarIB_NomChange.emit(this.VarIB_Nom)
  this.ClickGauche_ToParent = true
  this.ClickGauche_ToParentChange.emit(this.ClickGauche_ToParent)
}

TS_AjouterTableBD(TabIB_Parent_Line: Interface_Bouton) {
  this.TS_AjouterBouton(TabIB_Parent_Line, 'Table_BD');
}
TS_CreerTableDansBD(TabIB_Bouton_Line: Interface_Bouton) {
  if (TabIB_Bouton_Line.InterfIB_Type === 'Table_BD') {
    this.s6o9Service.TS_Sce_CreatNewTable({ Table_Name: TabIB_Bouton_Line.InterfIB_Nom })
      .subscribe(
        (response: any) => {
          console.log('Table créée avec succès', response);
        },
        (error: any) => {
          console.log('Erreur lors de la création de la table', error);
        }
      )
  }
}
TS_DeleteTableDansBD(TabIB_Bouton_Line: Interface_Bouton) {
  if (TabIB_Bouton_Line.InterfIB_Type === 'Table_BD' && TabIB_Bouton_Line.InterfIB_Nom) {
    this.s6o9Service.TS_Sce_DeleteTable(TabIB_Bouton_Line.InterfIB_Nom)
      .subscribe(
        (response: any) => {
          console.log('Table supprimée avec succès', response)
          // Mise à jour de l'UI ici
        },
        (error: any) => {
          console.log('Erreur lors de la suppression de la table', error)
        }
      )
  }
}
TS_DebutEdition(TabIB_Bouton_Line: Interface_Bouton) {
  TabIB_Bouton_Line.InterfIB_NomTemporaire = TabIB_Bouton_Line.InterfIB_Nom; // Sauvegardez le VarIB_Nom actuel
  TabIB_Bouton_Line.InterfIB_EnEdition = true;
  TabIB_Bouton_Line.InterfIB_ListeVisible = false;
}
TS_SupprimerBouton(TabIB_Bouton_Line: Interface_Bouton, TabIB_Parent_Line: Interface_Bouton, index: number) {
  if (TabIB_Parent_Line) {
    TabIB_Parent_Line.InterfIB_SousBoutons.splice(index, 1);
  } else {
    this.Tab_Bouton_1.splice(index, 1);
  }
  if (TabIB_Parent_Line) {
    TabIB_Parent_Line.InterfIB_ListeVisible = false;
  } else {
    TabIB_Bouton_Line.InterfIB_ListeVisible = false;
  }
}

TS_FinEdition(TabIB_Bouton_Line: Interface_Bouton, sauvegarder: boolean = true) {
  if (!sauvegarder) {
    TabIB_Bouton_Line.InterfIB_Nom = TabIB_Bouton_Line.InterfIB_NomTemporaire // Restaurez le nom si l'édition est annulée
  }
  TabIB_Bouton_Line.InterfIB_EnEdition = false
}




Tab_Items: Array<[string, number, number]> = 
[ 
  ['Table', 2, 0]
]
Tab_NewItem: Array<[string, number, number]> = [['Table', 2, 0]]
private nextId = 0
@Input() Input_TabList_Type: Interface_Type[] = []
@Output() Output_TabLine_ItemAdded = new EventEmitter<Interface_DraggableItem>()
TS_ItemAdded(itemName: Interface_Bouton): void {
 const typeValue = this.Tab_NewItem[0][2]
 const newItem: Interface_DraggableItem = { 
  InterfDI_Id: this.nextId++, 
  InterfDI_Name: this.Tab_NewItem[0][0],
  InterfDI_Content: itemName.InterfIB_Nom,
  InterfDI_Type: [this.Input_TabList_Type[typeValue]]
  // InterfDI_Position // InterfDI_Taille // InterfDI_Image // InterfDI_DragEnabled      
  }
  this.Output_TabLine_ItemAdded.emit(newItem)
}

TS_GetFieldFromTableBD(tableName: string) {
  console.log('tableName',tableName)
  this.s6o9Service.TS_Sce_GetFields(tableName)
    .subscribe(
      (fields: any) => {
        console.log('Champs récupérés avec succès:', fields);
        // Traiter les champs ici (mise à jour de l'UI, etc.)
      },
      (error: any) => {
        console.log('Erreur lors de la récupération des champs:', error);
        // Gérer l'erreur ici
      }
    )
  }
}

interface Interface_Bouton {
  InterfIB_Id: string;
  InterfIB_Nom?: string;
  InterfIB_NomTemporaire?: string; // Pour stocker temporairement le InterfIB_Nom lors de l'édition
  InterfIB_EnEdition: boolean;
  InterfIB_RectangleVisible: boolean;
  InterfIB_ListeVisible: boolean;
  InterfIB_SousBoutons: Interface_Bouton[];
  InterfIB_Parent?: Interface_Bouton;
  InterfIB_SousBoutonsVisible?: boolean;
  InterfIB_EstTableBD?: boolean;
  InterfIB_Type: 'Sous_Bouton' | 'Table_BD'
}

/*

TS_ItemAdded(itemName: string): void {
  const found_itemLine = this.Tab_Items.find(Tab_RILine => Tab_RILine[0] === itemName);
  if (found_itemLine) {
    const typeValue = found_itemLine[2];
    const newItem: Interface_DraggableItem = { 
      InterfDI_Id: this.nextId++, 
      InterfDI_Name: itemName,
      InterfDI_Type:  [this.Input_TabList_Type[typeValue]]
      // InterfDI_Position // InterfDI_Taille // InterfDI_Image // InterfDI_DragEnabled      
    }
    this.Output_TabLine_ItemAdded.emit(newItem);
  } else {
    console.error("Element non trouvé dans Tab_Items");
  }
}

*/

/*
  @Output() boutonClicked = new EventEmitter<string>()
  afficherRectangle(bouton: Interface_Bouton) {
    console.log("Clic sur le bouton:", bouton.nom, "| État actuel de VarIB_VarIB_ListeVisible:", bouton.listeVisible);
    this.boutonClicked.emit(bouton.nom); // Emit le nom du bouton cliqué
    bouton.listeVisible = !bouton.listeVisible; // Bascule l'état de visibilité
    console.log("État mis à jour de listeVisible:", bouton.listeVisible);
  }


ajouterSousBouton(bouton: Interface_Bouton) {
  this.TS_AjouterBouton(bouton);
  bouton.sousBoutonsVisible = true; // S'assurer que les Sous_Boutons sont visibles
  bouton.listeVisible = false; // Cacher les options après l'action
}


gererActionBouton(bouton: Interface_Bouton, event: any, parent: Interface_Bouton, index: number) {
  const action = event.target.value;
  switch (action) {
    case 'sousBouton':
      this.TS_AjouterBouton(bouton);
      break;
    case 'editer':
      this.TS_DebutEdition(bouton);
      break;
    case 'supprimer':
      if (parent) {
        parent.sousBoutons.splice(index, 1);
      } else {
        this.Tab_Bouton_1.splice(index, 1);
      }
      break;
  }
  bouton.listeVisible = false;
}



  
*/