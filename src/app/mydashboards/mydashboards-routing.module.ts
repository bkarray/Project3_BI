import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordListComponent } from './dashbord-list/dashbord-list.component';

const routes: Routes = [
  {
    path:'',
    component:DashbordListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MydashboardsRoutingModule { }
