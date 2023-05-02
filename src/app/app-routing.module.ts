import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserMenuComponent } from './basics/user-menu/user-menu.component';
import { GuardGuard } from './guard.guard';
import { FormulaireModule } from './formulaire/formulaire.module';

const routes: Routes = [
  { path: 'P_Home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'userMenu', component: UserMenuComponent },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
 
  {
    path: 'formulaire',
    loadChildren: () =>
      import('./formulaire/formulaire.module').then((m) => m.FormulaireModule),
    canActivate: [GuardGuard],
  },
  {
    path: 'graphs',
    loadChildren: () =>
      import('./graphs/graphs.module').then((m) => m.GraphsModule),
    canActivate: [GuardGuard],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
