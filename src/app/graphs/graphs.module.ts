import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphsRoutingModule } from './graphs-routing.module';
import { SelectReponseComponent } from './select-reponse/select-reponse.component';
import { ReportsComponent } from './reports/reports.component';
import { FormsModule } from '@angular/forms';
import { CausesComponent } from './causes/causes.component';
import { ConsequencesComponent } from './consequences/consequences.component';
import { TabsGraphsComponent } from './tabs-graphs/tabs-graphs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DocumentsComponent } from './documents/documents.component';

@NgModule({
  declarations: [
    SelectReponseComponent,
    ReportsComponent,
    CausesComponent,
    ConsequencesComponent,
    TabsGraphsComponent,
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    GraphsRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatCheckboxModule 
    
  ],
  exports:[
SelectReponseComponent,
ReportsComponent,
CausesComponent,
ConsequencesComponent,
TabsGraphsComponent
  ]
})
export class GraphsModule { }
