/* Importation : Angular */
import { Component, OnInit, SimpleChanges,ChangeDetectorRef,OnDestroy   } from '@angular/core';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, tap, finalize, map } from 'rxjs/operators';
import { Observable, Observer, Subscription, BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { CdkDragDrop, CdkDragStart, CdkDragEnd, CdkDragMove, CdkDragEnter, moveItemInArray, transferArrayItem,copyArrayItem,  } from '@angular/cdk/drag-drop';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-s6o5o2-ui',
  templateUrl: './s6o5o2-ui.component.html',
  styleUrls: ['./s6o5o2-ui.component.css']
})
export class S6o5o2UIComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.headers.forEach(header => {
      this.sortDirection[header.title] = null; // Initialiser sortDirection pour chaque en-tête
    });
    this.applyFilter(); 
  }

  
  headers: Header[] = [
    { title: 'Entête1' },
    { title: 'Entête2' }
  ];
  rows: any[][] = [['C(1,1)', 'C(2,1)']]; // Initialiser avec des valeurs de cellule

  showContextMenu = false;
  contextMenuPosition = { x: 0, y: 0 };

  addHeader() {
    // Ajoute un nouvel en-tête à la fin du tableau des en-têtes
    this.headers.push({ title: `Entête${this.headers.length + 1}` });
  
    // Ajoute une nouvelle colonne pour chaque ligne dans le tableau des lignes
    this.rows.forEach((row, rowIndex) => {
      row.push(`C(${this.headers.length},${rowIndex + 1})`);
    });
  
    // Initialise le filtre pour le nouvel en-tête
    this.filterValues[`Entête${this.headers.length}`] = '';
  
    // Met à jour le tableau des lignes filtrées
    this.applyFilter();
  }
  
  removeHeader(index: number) {
    const headerToRemove = this.headers[index].title; // Stocker le titre avant suppression
    delete this.filterValues[headerToRemove]; // Supprimer le filtre pour l'en-tête supprimé
    this.headers.splice(index, 1);
    this.rows.forEach(row => row.splice(index, 1));
    this.applyFilter(); // Mettre à jour le tableau des lignes filtrées après suppression
  }

  addRow() {
    const newRow = this.headers.map((_, colIndex) => `C(${colIndex + 1},${this.rows.length + 1})`);
    this.rows.push(newRow);
    this.applyFilter(); // Mettre à jour filteredRows après l'ajout d'une ligne
  }

  openContextMenu(event: MouseEvent, rowIndex: number, cellIndex: number) {
    event.preventDefault();
    this.showContextMenu = true;
    this.contextMenuPosition.x = event.clientX;
    this.contextMenuPosition.y = event.clientY;
    // Logic for cell actions
  }

  editCell() {
    // Logic for cell editing
  }


  dropColumn(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.headers, event.previousIndex, event.currentIndex);
    this.rows.forEach(row => {
        moveItemInArray(row, event.previousIndex, event.currentIndex);
    });
}
onHeadDrop(event: CdkDragDrop<string[]>) {
  this.dropColumn(event);
}

  dropRow(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.rows, event.previousIndex, event.currentIndex);
  }


  moveRowUp(rowIndex: number) {
    if (rowIndex > 0) {
        const movedRow = this.rows.splice(rowIndex, 1)[0];
        this.rows.splice(rowIndex - 1, 0, movedRow);
    }
}

moveRowDown(rowIndex: number) {
    if (rowIndex < this.rows.length - 1) {
        const movedRow = this.rows.splice(rowIndex, 1)[0];
        this.rows.splice(rowIndex + 1, 0, movedRow);
    }
}


removeRow(rowIndex: number) {
  this.rows.splice(rowIndex, 1);
  this.applyFilter(); // Mettre à jour filteredRows après la suppression d'une ligne
}

sortDirection: {[key: string]: string | null} = {};

sortData(headerTitle: string): void {
  this.sortDirection[headerTitle] = this.sortDirection[headerTitle] === 'asc' ? 'desc' : 'asc';
  const direction = this.sortDirection[headerTitle];
  const index = this.headers.findIndex(header => header.title === headerTitle);

  this.rows.sort((a, b) => {
    const valA = a[index];
    const valB = b[index];
    if (typeof valA === 'string' && typeof valB === 'string') {
      return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    // Assurez-vous de gérer tous les cas et de retourner un nombre
    return 0; // Retournez 0 si aucune condition de tri n'est remplie
  });

  this.applyFilter(); // Mettre à jour filteredRows après le tri
}

filteredRows = [...this.rows];
filterValues: { [key: string]: string } = {};
applyFilter() {
  this.filteredRows = this.rows.filter(row => {
    return this.headers.every((header, index) => {
      const cellValue = row[index]?.toString().toLowerCase() || '';
      const filterValue = this.filterValues[header.title]?.toLowerCase() || '';
      return cellValue.includes(filterValue);
    });
  });

  // Mise à jour pour la pagination
  this.totalItems = this.filteredRows.length;
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  this.filteredRows = this.filteredRows.slice(startIndex, startIndex + this.itemsPerPage);
}



showManagementButtons: boolean = false;
toggleManagementButtons() {
  this.showManagementButtons = !this.showManagementButtons;
}

selectedAlignment: string = 'left'; // Valeur par défaut
toggleAlignment(alignment: string) {
  this.selectedAlignment = alignment;
}


showBorders: boolean = true;

isCellEditable: boolean = false;

exportAsExcel(): void {
  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.rows);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Feuille1');

  /* save to file */
  XLSX.writeFile(wb, 'ExportTableau.xlsx');
}


@ViewChild('fileInput') fileInput!: ElementRef
data: any[] = [];
onFileChange(evt: any) {
  const target: DataTransfer = <DataTransfer>(evt.target);
  if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  
  const reader: FileReader = new FileReader();
  reader.onload = (e: any) => {
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    this.data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    console.log(this.data); // Affiche les données importées dans la console
    // Ici, vous pouvez maintenant traiter les données comme nécessaire
  };
  reader.readAsBinaryString(target.files[0]);
}


currentPage: number = 1;
  itemsPerPage: number = 10; // Vous pouvez changer cette valeur pour 5 ou 25 selon les besoins
  totalItems: number = this.rows.length;
changePage(newPage: number) {
  this.currentPage = newPage;
  this.applyFilter();
}

changeItemsPerPage(newLimit: number) {
  this.itemsPerPage = newLimit;
  this.changePage(1); // Revenir à la première page avec la nouvelle limite
}

getTotalPages(): number {
  return Math.ceil(this.totalItems / this.itemsPerPage);
}

}

interface Header {
  title: string;
}