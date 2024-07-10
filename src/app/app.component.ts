

/* Importation : Angular */
import { Component, OnInit, OnDestroy } from '@angular/core'; // N'oubliez pas d'importer OnDestroy
import { Subscription } from 'rxjs'; // Importez Subscription de rxjs

/* Importation : Input Output EventEmitter */
import { Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy { // Implementez également OnDestroy
  

  VarS_CurrentComponent: string = '';
  private sub!: Subscription;

  constructor() {
  }
    
  title = 'cleverFlow';



  /* Debut Initialisation */

  ngOnInit(): void {
  }

   /* Fin Initialisation */

  /* Importation : Angular */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
  
  /* Debut Drag and Drop */

  TS_OnDragOver(event: DragEvent) {
    event.preventDefault();
  }

  TS_OnDrop(event: DragEvent) {
    event.preventDefault();
  }

  /* Fin Drag and Drop */

  


}

