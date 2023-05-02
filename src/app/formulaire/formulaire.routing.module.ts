import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from '../guard.guard';
import {FormulaireListComponent} from "./formulaire-list/formulaire-list.component"
import { FormulaireCreatComponent } from './formulaire-creat/formulaire-creat.component';
import { FormulaireReponseComponent } from './formulaire-reponse/formulaire-reponse.component';
import { FormulaireTableComponent } from './formulaire-table/formulaire-table.component';
import { LineComponent } from './line/line.component';
import { OneLineComponent } from './one-line/one-line.component';
export const routes: Routes = [
 {
 path: '',
 children: [
  {path:'list',component:FormulaireListComponent},
  {path:'new/:id/:generated',component:FormulaireCreatComponent},
  {path:'reponse/:idF/:idR/:isCreated',component:FormulaireReponseComponent},
  {path:'table/:idF/:idR',component:FormulaireTableComponent},
  {path:'line/:idF/:idR/:lineId',component:LineComponent},
  {path:'oneLine/:idF/:idR/:address',component:OneLineComponent},
  
 ] ,
 }
];
@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports:[RouterModule],
})
export class FormulaireRoutingModule { }