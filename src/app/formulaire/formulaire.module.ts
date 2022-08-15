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
    DragDropModule,
    MatIconModule
  ]
})
export class FormulaireModule { }
