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

import { LineComponent } from './line/line.component';
import { OneLineComponent } from './one-line/one-line.component';
import { AngularResizedEventModule } from 'angular-resize-event';
import {NgxDragResizeModule} from 'ngx-drag-resize';
import { ChoicesPopUpComponent } from './choices-pop-up/choices-pop-up.component';
import { ExcelFormComponent } from './excel-form/excel-form.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PythonCompilerComponent } from '../graphs/python-compiler/python-compiler.component';
import { CodeEditorModule } from '@ngstack/code-editor';
import { GraphsListComponent } from './graphs-list/graphs-list.component';
import { DataAnalysisComponent } from '../graphs/data-analysis/data-analysis.component';
import { RefrenceFieldComponent } from './refrence-field/refrence-field.component';
import { RestFormsComponent } from './rest-forms/rest-forms.component';







import {A11yModule} from '@angular/cdk/a11y';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ManuelChoiceComponent } from './manuel-choice/manuel-choice.component';
import { ExcelChoiceComponent } from './excel-choice/excel-choice.component';
import { SelectReponseComponent } from '../graphs/select-reponse/select-reponse.component';

import { GraphsModule } from '../graphs/graphs.module';

@NgModule({

  declarations: [
   FormulaireListComponent,
   FormulaireCreatComponent,
   FormulaireReponseComponent,
   FormulaireTableComponent,
   LineComponent,
   OneLineComponent,
   ChoicesPopUpComponent,
   ExcelFormComponent,
   FileManagerComponent,
   PythonCompilerComponent,
   GraphsListComponent,
   DataAnalysisComponent,
   RefrenceFieldComponent,
   RestFormsComponent,
   ManuelChoiceComponent,
   ExcelChoiceComponent,
   
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
    TreeTableModule,
    AngularResizedEventModule,
    NgxDragResizeModule,
    MatPaginatorModule,
    GraphsModule,
    
    CodeEditorModule.forRoot()
    
    
  ],
  exports: [
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
  ]
})
export class FormulaireModule { }

