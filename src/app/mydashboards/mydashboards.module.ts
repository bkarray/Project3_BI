import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MydashboardsRoutingModule } from './mydashboards-routing.module';
import { DashbordListComponent } from './dashbord-list/dashbord-list.component';
import { FormulaireRoutingModule } from '../formulaire/formulaire.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { TreeTableModule } from 'primeng/treetable';
import { CodeEditorModule } from '@ngstack/code-editor';
import { GraphsModule } from '../graphs/graphs.module';
import { FormulaireModule } from '../formulaire/formulaire.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PythonCompilerComponent } from '../graphs/python-compiler/python-compiler.component';


@NgModule({
  declarations: [
    DashbordListComponent
  ],
  imports: [
    CommonModule,
    MydashboardsRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,
    MatTreeModule,
    TreeTableModule,
    GraphsModule,
    FormulaireModule,
    MatTabsModule,

    
    CodeEditorModule.forRoot()
  ],
  exports:[
    TreeTableModule
  ]
})
export class MydashboardsModule { }
