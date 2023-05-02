import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphsRoutingModule } from './graphs-routing.module';
import { SelectReponseComponent } from './select-reponse/select-reponse.component';
import { ReportsComponent } from './reports/reports.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SelectReponseComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    GraphsRoutingModule,
    FormsModule
  ],
  exports:[
SelectReponseComponent,
ReportsComponent
  ]
})
export class GraphsModule { }
