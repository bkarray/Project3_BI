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
  selector: 'app-s7-ruban',
  templateUrl: './s7-ruban.component.html',
  styleUrls: ['./s7-ruban.component.css']
})

export class S7RubanComponent implements OnInit {

  @ViewChild('pageContainer', { static: false }) pageContainer?: ElementRef;




  Var_URL: string = '';  
  rubanItems: string[] = ['Rectangle', 'Ellipse', 'Rectangle Arrondi', 'Bouton', 'Tableau',
                          'Zone_Texte', 'Image', 'Piece_Jointe', 'Input', 'Image',
                          'LD', 'Radio', 'Choix_Multiple',
                          'LD_Vertical', 'LD_Horizontal', 'LD_Vertical_Contenu', 'LD_Horizontal_Contenu']
                          
  private nextId = 0;

  ngOnInit(): void {
    console.log('Component initialized');
  }

  TS_ItemClicked(item: string): void {
  const newItem: DraggableItem = { 
    id: this.nextId++, 
    name: item, 
    position: { x: 0, y: 0 },
    width: 100, // Valeur initiale pour la largeur
    height: 100, // Valeur initiale pour la hauteur
    isOriginal: true, // Marque comme l'original
  };
  this.pageItems.push(newItem);
  console.log('Item created:', newItem);
}

  pageItems: DraggableItem[] = []
  currentDraggedItem: string | null = null;
  startPosition: { x: number, y: number } = { x: 0, y: 0 };
  currentPosition: { x: number, y: number } = { x: 0, y: 0 };
  finalPosition: { x: number, y: number } = { x: 0, y: 0 };

  onDrag(event: DragEvent): void {
    this.currentPosition = { x: event.clientX, y: event.clientY }
  }
  relativeCursorPos: { x: number, y: number } = { x: 0, y: 0 };

  onDragStart(event: DragEvent, item: DraggableItem): void {
    if (this.pageContainer) {
      const rect = this.pageContainer.nativeElement.getBoundingClientRect();
      this.relativeCursorPos.x = event.clientX - rect.left - item.position.x;
      this.relativeCursorPos.y = event.clientY - rect.top - item.position.y;
    }
    console.log('Relative cursor position:', this.relativeCursorPos);
  }

  onDragEnd(event: DragEvent, item: DraggableItem): void {
    if (this.pageContainer) {
      const rect = this.pageContainer.nativeElement.getBoundingClientRect();
      const x = event.clientX - rect.left - this.relativeCursorPos.x;
      const y = event.clientY - rect.top - this.relativeCursorPos.y;

      const draggedItem = this.pageItems.find(i => i.id === item.id);
      if (draggedItem) {
        draggedItem.position = { x, y };
        console.log('Updated position for item', draggedItem.id, ':', draggedItem.position);
      }
    }
  }

  drop(event: CdkDragDrop<DraggableItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log('Item dropped. New order:', this.pageItems.map(item => item.name));
  }
  TS_OnDragOver(event: Event) {
    event.preventDefault();
    console.log('Drag over event:', event);
  }

  

}


interface DraggableItem {
  id: number;
  name: string;
  position: { x: number, y: number };
  width: number;
  height: number;
  isOriginal: boolean;
}
