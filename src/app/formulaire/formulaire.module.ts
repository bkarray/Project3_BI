import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{FormulaireRoutingModule} from "./formulaire.routing.module"
import {FormulaireListComponent} from "./formulaire-list/formulaire-list.component"

//drag and drop modules
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

//icone
import {MatIconModule} from '@angular/material/icon';
import { FormulaireCreatComponent } from './formulaire-creat/formulaire-creat.component';
import { FormulaireReponseComponent } from './formulaire-reponse/formulaire-reponse.component';
import { FormulaireTableComponent } from './formulaire-table/formulaire-table.component';
import {MatTreeModule} from '@angular/material/tree';
import {TreeTableModule} from 'primeng/treetable';

import {HttpClientModule} from '@angular/common/http';

import { ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
   FormulaireListComponent,
   FormulaireCreatComponent,
   FormulaireReponseComponent,
   FormulaireTableComponent,
  ],
  imports: [
    CommonModule,
    FormulaireRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    DragDropModule,
    MatIconModule,
    MatTreeModule,
    TreeTableModule
  ]
})
export class FormulaireModule { }

