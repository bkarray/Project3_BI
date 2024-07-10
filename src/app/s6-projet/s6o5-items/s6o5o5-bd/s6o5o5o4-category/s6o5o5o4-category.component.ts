
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

interface Interf_Category {
  Interf_Cat_Id: number;
  Interf_Cat_Nom: string;
  Interf_Cat_Id_Parent: number | null;
  Interf_Cat_SousCategory?: Interf_Category[];
  Interf_Cat_MenuVisible?: boolean; 
}

@Component({
  selector: 'app-s6o5o5o4-category',
  templateUrl: './s6o5o5o4-category.component.html',
  styleUrls: ['./s6o5o5o4-category.component.css']
})
export class S6o5o5o4CategoryComponent implements OnInit {

  constructor(private s6o9Service: S6o9ServiceService, private changeDetectorRef: ChangeDetectorRef) { }

  Tab_Category: Interf_Category[] = [];
  nextId = 1;

  ajouterCategorie(parentId: number | null = null): void {
    console.log('Ajout d\'une catégorie, parent ID:', parentId);
    const nomCategorie = this.genererNomCategorie(parentId);
    const nouvelleCategorie: Interf_Category = {
      Interf_Cat_Id: this.nextId++,
      Interf_Cat_Nom: nomCategorie,
      Interf_Cat_Id_Parent: parentId,
      Interf_Cat_SousCategory: []
    }
    if (parentId === null) {
      console.log('Ajout d\'une catégorie principale:', nouvelleCategorie);
      this.Tab_Category.push(nouvelleCategorie);
    } else {
      
      const parentCategorie = this.trouverCategorieParId(this.Tab_Category, parentId);
      if (parentCategorie && parentCategorie.Interf_Cat_SousCategory) {
        console.log('Ajout d\'une sous-catégorie:', nouvelleCategorie);
        parentCategorie.Interf_Cat_SousCategory.push(nouvelleCategorie);
      } else {
        console.error('Catégorie parente introuvable ou sans sous-catégories', parentId);
      }
    }
    this.changeDetectorRef.detectChanges();
  }
  
  genererNomCategorie(parentId: number | null): string {
    console.log('Génération du nom de la catégorie, parent ID:', parentId);
    if (parentId === null) {
      return `Cat${this.nextId}`;
    } else {
      const parentCategorie = this.trouverCategorieParId(this.Tab_Category, parentId);
      if (parentCategorie && parentCategorie.Interf_Cat_SousCategory) {
        return `${parentCategorie.Interf_Cat_Nom}.${parentCategorie.Interf_Cat_SousCategory.length + 1}`;
      } else {
        console.warn('Catégorie parente introuvable lors de la génération du nom, ID:', parentId);
        return `${parentCategorie?.Interf_Cat_Nom}.1`;
      }
    }
  }

  trouverEtAjouterSousCategorie(categories: Interf_Category[], parentId: number, nouvelleCategorie: Interf_Category): void {
    console.log('Recherche de la catégorie parente pour ajouter une sous-catégorie, parent ID:', parentId);
    for (let categorie of categories) {
      if (categorie.Interf_Cat_Id === parentId) {
        console.log('Catégorie parente trouvée:', categorie);
        if (!categorie.Interf_Cat_SousCategory) {
          categorie.Interf_Cat_SousCategory = [];
        }
        categorie.Interf_Cat_SousCategory.push(nouvelleCategorie);
        return;
      }
      if (categorie.Interf_Cat_SousCategory) {
        this.trouverEtAjouterSousCategorie(categorie.Interf_Cat_SousCategory, parentId, nouvelleCategorie);
      }
    }
  }
  
  trouverCategorieParId(categories: Interf_Category[], id: number): Interf_Category | null {
    console.log('Recherche de la catégorie par ID:', id);
    for (let categorie of categories) {
      if (categorie.Interf_Cat_Id === id) {
        console.log('Catégorie trouvée:', categorie);
        return categorie;
      }
      if (categorie.Interf_Cat_SousCategory) {
        const sousCategorie = this.trouverCategorieParId(categorie.Interf_Cat_SousCategory, id);
        if (sousCategorie) return sousCategorie;
      }
    }
    console.warn('Catégorie introuvable, ID:', id);
    return null;
  }

  gererClicDroit(categorie: Interf_Category, event: MouseEvent): void {
    event.preventDefault();
    this.Tab_Category.forEach(cat => cat.Interf_Cat_MenuVisible = false); // Masquer tous les menus
    categorie.Interf_Cat_MenuVisible = true;
  }


  ajouterSousCategorie(parentId: number): void {
    // Logique pour ajouter une sous-catégorie
  }

  categorieEnEdition: Interf_Category | null = null;
  editerCategorie(categorie: Interf_Category): void {
    // Affectez la catégorie à categorieEnEdition pour la préparer à l'édition
    this.categorieEnEdition = categorie;
  }
  
  sauvegarderEdition(categorie: Interf_Category): void {
    // Mettez à jour le nom de la catégorie dans la variable categorieEnEdition
    // Réinitialisez ensuite categorieEnEdition à null
    if (this.categorieEnEdition) {
      this.categorieEnEdition.Interf_Cat_Nom = categorie.Interf_Cat_Nom;
      this.categorieEnEdition = null;
    }
  }

 
  supprimerCategorie(categorieId: number, parent?: Interf_Category): void {
    if (parent) {
      if (parent.Interf_Cat_SousCategory) {
        // Supprimez la sous-catégorie du parent
        const index = parent.Interf_Cat_SousCategory.findIndex((sousCategorie) => sousCategorie.Interf_Cat_Id === categorieId);
        if (index !== -1) {
          parent.Interf_Cat_SousCategory.splice(index, 1);
        }
      }
    } else {
      // Supprimez la catégorie principale
      const index = this.Tab_Category.findIndex((categorie) => categorie.Interf_Cat_Id === categorieId);
      if (index !== -1) {
        this.Tab_Category.splice(index, 1);
      }
    }
  
    // Mettez à jour la structure des catégories après la suppression
    this.Tab_Category = this.construireStructureCategories(this.Tab_Category);
  
    // Réinitialisez la visibilité du menu contextuel après la suppression
    this.Tab_Category.forEach((cat) => (cat.Interf_Cat_MenuVisible = false));
  }
  
  
  
  trackByCategoryId(index: number, categorie: Interf_Category): number {
    return categorie.Interf_Cat_Id;
}


construireStructureCategories(categories: Interf_Category[]): any[] {
  return categories.map(categorie => {
    return {
      ...categorie,
      sousCategoriesStructure: categorie.Interf_Cat_SousCategory ? this.construireStructureCategories(categorie.Interf_Cat_SousCategory) : []
    };
  });
}

onDrop(event: CdkDragDrop<Interf_Category[]>, parent?: Interf_Category): void {
  console.log('onDrop called for sousCategorie:', event);
  if (event.container && event.previousContainer && event.container.data && event.previousContainer.data) {
    if (event.previousContainer === event.container) {
      // Déplacer l'élément à l'intérieur de la même liste
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Déplacer l'élément d'une liste à une autre
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Mettez à jour les informations parentales de la catégorie déplacée
      const movedCategory = event.container.data[event.currentIndex];
      movedCategory.Interf_Cat_Id_Parent = parent ? parent.Interf_Cat_Id : null;

      // Mettez à jour la structure des catégories après le déplacement
      this.Tab_Category = this.construireStructureCategories(this.Tab_Category);

      // Afficher des informations sur les sous-catégories
      console.log('Sous-catégorie déplacée :', movedCategory);
      console.log('Nouvelle structure des catégories :', this.Tab_Category);

      // Réinitialisez la visibilité du menu contextuel après le déplacement
      this.Tab_Category.forEach((cat) => (cat.Interf_Cat_MenuVisible = false));
    }
  } else {
    console.error('Les données du conteneur ou du conteneur précédent ne sont pas définies correctement.');
  }
}



listeTables: string[] = [];
tableSelectionnee: string | null = null;
afficherListeTables: boolean = false;


TS_ImportNameTable() {
  this.s6o9Service.TS_Sce_GetAllTables().subscribe(
    data => {
      this.listeTables = data;
      this.afficherListeTables = true;
    },
    error => {
      console.error('Erreur lors de la récupération des tables', error);
    }
  );
}


// Ajoutez ces variables à votre classe S6o5o5o4CategoryComponent
champsTableSelectionnee: string[] = [];
champCatNom: string | null = null;
champCatIdParent: string | null = null;
champsCategorie = [
  { nom: 'Interf_Cat_Id', selection: null as string | null },
  { nom: 'Interf_Cat_Nom', selection: null as string | null },
  { nom: 'Interf_Cat_Id_Parent', selection: null as string | null },
  // Ajoutez d'autres champs ici si nécessaire
];


TS_GetFieldFromTableBD1(tableName: string) {
  this.s6o9Service.TS_Sce_GetFields(tableName).subscribe(
    (fields: any[]) => {
      // Supposons que 'fields' est un tableau d'objets avec une propriété 'Field_Name'
      this.champsTableSelectionnee = fields.map(field => field.Field_Name);
      
      // Réinitialiser les sélections pour chaque champ de l'interface Categorie
      this.champsCategorie.forEach(champ => {
        // Ici, vous pouvez définir une logique pour déterminer quelle valeur sélectionner par défaut
        // Pour cet exemple, je sélectionne le premier champ de la table
        champ.selection = this.champsTableSelectionnee.length > 0 ? this.champsTableSelectionnee[0] : null;
      });
    },
    error => {
      console.error('Erreur lors de la récupération des champs de la table', error);
    }
  );
}

donneesImportees: any[] = [];
importerDonnees() {
  if (this.tableSelectionnee && this.champsTableSelectionnee.length > 0) {
    this.s6o9Service.TS_ImportData(this.tableSelectionnee, this.champsTableSelectionnee)
      .subscribe(
        response => {
          console.log('Importation réussie', response);
          this.donneesImportees = response; // Assurez-vous que le backend renvoie les données importées
        },
        error => console.error('Erreur lors de limportation', error)
      );
  }
}


recupererDonnees() {
  if (this.tableSelectionnee) {
    this.s6o9Service.TS_Sce_GetTableData(this.tableSelectionnee)
      .subscribe(
        (donnees: any[]) => {
          // Mappage initial sans hiérarchie
          const categoriesTemp = donnees.map(donnee => {
            const idChamp = this.champsCategorie.find(champ => champ.nom === 'Interf_Cat_Id')?.selection;
            const nomChamp = this.champsCategorie.find(champ => champ.nom === 'Interf_Cat_Nom')?.selection;
            const parentIdChamp = this.champsCategorie.find(champ => champ.nom === 'Interf_Cat_Id_Parent')?.selection;
            return {
              Interf_Cat_Id: idChamp && donnee[idChamp] != null ? parseInt(donnee[idChamp].trim(), 10) : 0,
              Interf_Cat_Nom: nomChamp && donnee[nomChamp] != null ? donnee[nomChamp].trim() : '',
              Interf_Cat_Id_Parent: parentIdChamp && donnee[parentIdChamp] != null ? parseInt(donnee[parentIdChamp].trim(), 10) : null,
              Interf_Cat_SousCategory: [],
              Interf_Cat_MenuVisible: false
            };
          });

          // Organiser en hiérarchie parent-enfant
          this.Tab_Category = this.organiserCategories(categoriesTemp);
          console.log('Données organisées dans Tab_Category', this.Tab_Category);
        },
        error => console.error('Erreur lors de la récupération des données', error)
      );
  }
}

organiserCategories(categories: Interf_Category[]): Interf_Category[] {
  // Trouver et retourner les catégories racines (sans parents)
  const racines = categories.filter(c => c.Interf_Cat_Id_Parent === null);
  
  // Fonction récursive pour trouver et assigner les sous-catégories
  const assignerSousCategories = (parent: Interf_Category) => {
    const sousCategories = categories.filter(c => c.Interf_Cat_Id_Parent === parent.Interf_Cat_Id);
    sousCategories.forEach(assignerSousCategories);
    parent.Interf_Cat_SousCategory = sousCategories;
  };

  // Assigner les sous-catégories pour chaque catégorie racine
  racines.forEach(assignerSousCategories);
  
  return racines;
}

  ngOnInit(): void {
  }


Tab_Bouton_1: Interface_Bouton[] = []
TS_AjouterBouton(TabIB_Parent_Line?: Interface_Bouton, VarIB_Type: 'Sous_Bouton' | 'Table_BD' = 'Sous_Bouton') {
    let nomBouton = '';
    switch (VarIB_Type) {
      case 'Sous_Bouton':
        nomBouton = this.TS_GenererNomBouton(TabIB_Parent_Line, false)
        break;
      case 'Table_BD':
        nomBouton = this.TS_GenererNomBouton(TabIB_Parent_Line, true)
        break;
    }
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
    if (TabIB_Parent_Line) {
      TabIB_Parent_Line.InterfIB_SousBoutons.push(nouveauBouton);
      TabIB_Parent_Line.InterfIB_SousBoutonsVisible = true
    } else {
      this.Tab_Bouton_1.push(nouveauBouton);
    }
    if (TabIB_Parent_Line) {
      TabIB_Parent_Line.InterfIB_ListeVisible = false;
    }
    console.log('nouveauBouton',nouveauBouton)
}
idCompteur = 0;
TS_GenererIdUnique(): string {
  return `bouton-${this.idCompteur++}`
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

TS_Drop_BD(event: CdkDragDrop<Interface_Bouton[]>, TabIB_Parent_Line?: Interface_Bouton) {
  if (event.previousContainer === event.container) {
    // Si l'élément est déplacé dans le même conteneur, réorganisez simplement la liste.
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
    event.container.data[event.currentIndex].InterfIB_Parent = TabIB_Parent_Line
  }
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
TS_MasquerAutresMenus(TabIB_Bouton_LineActuel: Interface_Bouton) {
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

TS_GetFieldFromTableBD(tableName: string) {
  console.log('tableName',tableName)
  this.s6o9Service.TS_Sce_GetFields(tableName)
    .subscribe(
      (fields: any) => { console.log('Champs récupérés avec succès:', fields)},
      (error: any) => {console.log('Erreur lors de la récupération des champs:', error)})
}

Tab_Items: Array<[string, number, number]> = [['Table', 2, 0]]
Tab_NewItem: Array<[string, number, number]> = [['Table', 2, 0]]
//private nextId = 0
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
listIds: string[] = []
addToListIds(bouton: Interface_Bouton) {
  // Ajoutez l'ID de ce bouton à la liste
  this.listIds.push(bouton.InterfIB_Id)
  // Faites-le récursivement pour tous les sous-boutons
  bouton.InterfIB_SousBoutons.forEach(sb => this.addToListIds(sb))
}
*/