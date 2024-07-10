/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { CdkDragDrop, CdkDragStart, CdkDragEnd, CdkDragMove, CdkDragEnter, moveItemInArray, transferArrayItem,copyArrayItem,  } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-s6o2-linkurl',
  templateUrl: './s6o2-linkurl.component.html',
  styleUrls: ['./s6o2-linkurl.component.css']
})
export class S6o2LinkurlComponent implements OnInit {

  constructor() { }

  @Output() boutonClicked = new EventEmitter<string>();

  ngOnInit(): void {
  }

  Tab_Bouton: Bouton[] = [];

ajouterBouton(parent?: Bouton) {
  const nouveauBouton: Bouton = {
    id: this.genererIdUnique(),
    nom: this.genererNomBouton(parent), // Générer un nom numéroté
    enEdition: false,
    rectangleVisible: false,
    listeVisible: false,
    sousBoutons: []
  };

  if (parent) {
    nouveauBouton.parent = parent; // Ajoutez cette ligne
    parent.sousBoutons.push(nouveauBouton);
  } else {
    this.Tab_Bouton.push(nouveauBouton);
  }
}


afficherRectangle(bouton: Bouton) {
  this.boutonClicked.emit(bouton.nom); // Emit le nom du bouton cliqué
  bouton.rectangleVisible = !bouton.rectangleVisible;
}

gererListe(bouton: Bouton, event: MouseEvent) {
  event.preventDefault();
  bouton.listeVisible = !bouton.listeVisible;
}

debutEdition(bouton: Bouton) {
  bouton.nomTemporaire = bouton.nom; // Sauvegardez le nom actuel
  bouton.enEdition = true;
}

finEdition(bouton: Bouton, sauvegarder: boolean = true) {
  if (!sauvegarder) {
    bouton.nom = bouton.nomTemporaire; // Restaurez le nom si l'édition est annulée
  }
  bouton.enEdition = false;
}

gererActionBouton(bouton: Bouton, event: any, parent: Bouton, index: number) {
  const action = event.target.value;
  switch (action) {
    case 'sousBouton':
      this.ajouterBouton(bouton);
      break;
    case 'editer':
      this.debutEdition(bouton);
      break;
    case 'supprimer':
      if (parent) {
        parent.sousBoutons.splice(index, 1);
      } else {
        this.Tab_Bouton.splice(index, 1);
      }
      break;
  }
  bouton.listeVisible = false;
}

dragStart(bouton: Bouton) {
  // Code pour gérer le démarrage du déplacement
}

drop_URL(event: CdkDragDrop<Bouton[], any>, parent: Bouton) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    // Transférer l'élément d'une liste à une autre
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    
    // Mise à jour du parent de l'élément déplacé
    const item = event.container.data[event.currentIndex];
    item.parent = parent;

    // Mise à jour du nom et des noms des sous-boutons
    this.miseAJourNomsSousBoutons(item, parent);
  }
}

miseAJourNomsSousBoutons(bouton: Bouton, parent?: Bouton) {
  // Si le bouton a un parent, mettre à jour son nom en fonction du parent
  if (parent) {
    bouton.nom = `${parent.nom}.${parent.sousBoutons.indexOf(bouton) + 1}`;
  }

  // Mise à jour récursive pour les sous-boutons
  bouton.sousBoutons.forEach((sousBouton) => {
    this.miseAJourNomsSousBoutons(sousBouton, bouton);
  });
}

genererNomBouton(parent?: Bouton): string {
  let nomBase = 'localhost:4200/';
  if (parent) {
    // Ajouter la numérotation basée sur le parent et le nombre de sous-boutons
    const index = parent.sousBoutons.length + 1;
    nomBase = `${parent.nom}.${index}`;
  } else {
    // Ajouter la numérotation basée sur le nombre total de boutons
    const index = this.Tab_Bouton.length + 1;
    nomBase = `${nomBase} ${index}`;
  }
  return nomBase;
}

ajouterSousBouton(bouton: Bouton) {
  this.ajouterBouton(bouton);
  bouton.listeVisible = false; // Cacher les options après l'action
  console.log('this.Tab_Bouton',this.Tab_Bouton)
}

// Ajout d'une nouvelle méthode pour supprimer un bouton
supprimerBouton(bouton: Bouton, parent: Bouton, index: number) {
  if (parent) {
    parent.sousBoutons.splice(index, 1);
  } else {
    this.Tab_Bouton.splice(index, 1);
  }
  // Pas besoin de cacher les options ici car l'élément sera supprimé
}

private idCompteur = 0;

private genererIdUnique(): string {
  return `bouton-${this.idCompteur++}`;
}

}

interface Bouton {
  id: string;
  nom?: string;
  nomTemporaire?: string;
  enEdition: boolean;
  rectangleVisible: boolean;
  listeVisible: boolean;
  sousBoutons: Bouton[];
  parent?: Bouton;
}
