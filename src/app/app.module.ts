


/* Importation : Angular */
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { DragDropModule } from '@angular/cdk/drag-drop';




/* Importation : Aziz */
import { HomeComponent } from './home/home.component';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './basics/navbar/navbar.component';
import { HeaderComponent } from './basics/header/header.component';
import { FooterComponent } from './basics/footer/footer.component';
import { UserMenuComponent } from './basics/user-menu/user-menu.component';
import { SidebarComponent } from './basics/sidebar/sidebar.component';
import { UserNotifactionsComponent } from './basics/user-notifactions/user-notifactions.component';
import { SharedService } from './services/shared.service';
import { AuthService } from './services/auth/authservice';




/* Importation : Dossier S8 */
import { S8o1RessourcesComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1-ressources.component';
import { S8o1o7DraggableComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o7-draggable/s8o1o7-draggable.component';
import { S8o1o9SettingsComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o9-settings/s8o1o9-settings.component';
import { S8o1o8ProductComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o8-product/s8o1o8-product.component';
import { S8o1o8DatabaseComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o8-database/s8o1o8-database.component';
import { S8o1o9o1ObjectComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o9-settings/s8o1o9o1-object/s8o1o9o1-object.component';
import { S8o1o9o1o1UiComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o9-settings/s8o1o9o1-object/s8o1o9o1o1-ui/s8o1o9o1o1-ui.component';
import { S8o1o9o1o2PositionComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o9-settings/s8o1o9o1-object/s8o1o9o1o2-position/s8o1o9o1o2-position.component';
import { S8o1o9o1o3SizeComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o9-settings/s8o1o9o1-object/s8o1o9o1o3-size/s8o1o9o1o3-size.component';
import { S8o1o9o2DataComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o9-settings/s8o1o9o2-data/s8o1o9o2-data.component';
import { S8o1o8o2ButtonComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o8-product/s8o1o8o2-button/s8o1o8o2-button.component';
import { S8o1o8o3PopupComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o8-product/s8o1o8o3-popup/s8o1o8o3-popup.component';
import { S8o1o8o1ObjecttoolsComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o8-product/s8o1o8o1-objecttools/s8o1o8o1-objecttools.component';
import { S8o1o8o1o1MenucontextuelComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o8-product/s8o1o8o1-objecttools/s8o1o8o1o1-menucontextuel/s8o1o8o1o1-menucontextuel.component';
import { S8o1o8o1o2ResizeComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o8-product/s8o1o8o1-objecttools/s8o1o8o1o2-resize/s8o1o8o1o2-resize.component';
import { S8o1o8o1o3RightclickComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o8-product/s8o1o8o1-objecttools/s8o1o8o1o3-rightclick/s8o1o8o1o3-rightclick.component';
import { S8o2CommandcenterComponent } from './s8-sharedcomponent/s8o2-commandcenter/s8o2-commandcenter.component';
import { S8o2o1DatabaseComponent } from './s8-sharedcomponent/s8o2-commandcenter/s8o2o1-database/s8o2o1-database.component';
import { S8o2o2GestiondataComponent } from './s8-sharedcomponent/s8o2-commandcenter/s8o2o2-gestiondata/s8o2o2-gestiondata.component';
import { S8o2o3DraggableComponent } from './s8-sharedcomponent/s8o2-commandcenter/s8o2o3-draggable/s8o2o3-draggable.component';
import { S8o1o9o2o1InputdataComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o9-settings/s8o1o9o2-data/s8o1o9o2o1-inputdata/s8o1o9o2o1-inputdata.component';
import { S8o1o9o2o2OutputdataComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o9-settings/s8o1o9o2-data/s8o1o9o2o2-outputdata/s8o1o9o2o2-outputdata.component';
import { S8o1o9o2o3TreatmentdataComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o9-settings/s8o1o9o2-data/s8o1o9o2o3-treatmentdata/s8o1o9o2o3-treatmentdata.component';
import { S8o1o2ServicesComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o2-services/s8o1o2-services.component';
import { S8o1o1CmdcenterComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o1-cmdcenter/s8o1o1-cmdcenter.component';
import { S8o1o1o1CmdcenterdetailComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o1-cmdcenter/s8o1o1o1-cmdcenterdetail/s8o1o1o1-cmdcenterdetail.component';
import { S8o1o9o3CmdcenterComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o9-settings/s8o1o9o3-cmdcenter/s8o1o9o3-cmdcenter.component';
import { S8o1o3VartransfertComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o3-vartransfert/s8o1o3-vartransfert.component';
import { S8o1o4FonctionComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o4-fonction/s8o1o4-fonction.component';
import { S8o1o3VariableComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o3-variable/s8o1o3-variable.component';
import { S8o1o3o1VartransfertComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o3-variable/s8o1o3o1-vartransfert/s8o1o3o1-vartransfert.component';
import { S8o1o3o2VarlocaltsComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o3-variable/s8o1o3o2-varlocalts/s8o1o3o2-varlocalts.component';
import { S8o1o3o3VarlocalhtmlComponent } from './s8-sharedcomponent/s8o1-ressources/s8o1o3-variable/s8o1o3o3-varlocalhtml/s8o1o3o3-varlocalhtml.component';
import { S7RubanComponent } from './s7-ruban/s7-ruban.component';
import { S6ProjetComponent } from './s6-projet/s6-projet.component';
import { S6o1RubanComponent } from './s6-projet/s6o1-ruban/s6o1-ruban.component';
import { S6o2LinkurlComponent } from './s6-projet/s6o2-linkurl/s6o2-linkurl.component';
import { S6o3PageurlComponent } from './s6-projet/s6o3-pageurl/s6o3-pageurl.component';
import { S6o4SettingsComponent } from './s6-projet/s6o4-settings/s6o4-settings.component';
import { S6o5ItemsComponent } from './s6-projet/s6o5-items/s6o5-items.component';
import { S6o5o1FormsComponent } from './s6-projet/s6o5-items/s6o5o1-forms/s6o5o1-forms.component';
import { S6o5o2UIComponent } from './s6-projet/s6o5-items/s6o5o2-ui/s6o5o2-ui.component';
import { S6o5o3SelectComponent } from './s6-projet/s6o5-items/s6o5o3-select/s6o5o3-select.component';
import { S6o5o4DropdownComponent } from './s6-projet/s6o5-items/s6o5o4-dropdown/s6o5o4-dropdown.component';
import { S6o5o5BDComponent } from './s6-projet/s6o5-items/s6o5o5-bd/s6o5o5-bd.component';
import { S6o5o5o1GestionbdComponent } from './s6-projet/s6o5-items/s6o5o5-BD/s6o5o5o1-gestionbd/s6o5o5o1-gestionbd.component';
import { S6o5o5o2TableComponent } from './s6-projet/s6o5-items/s6o5o5-BD/s6o5o5o2-table/s6o5o5o2-table.component';
import { S6o5o5o3AlltableComponent } from './s6-projet/s6o5-items/s6o5o5-bd/s6o5o5o3-alltable/s6o5o5o3-alltable.component';
import { S6o5o5o4CategoryComponent } from './s6-projet/s6o5-items/s6o5o5-bd/s6o5o5o4-category/s6o5o5o4-category.component';






@NgModule({
  declarations: [
    /* Importation : Angular */
    AppComponent,

    /* Importation : Aziz */
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SidebarComponent,
    UserMenuComponent,
    UserNotifactionsComponent,

    /* Importation : Dossier S8 */
    S8o1RessourcesComponent,
    S8o1RessourcesComponent,
    S8o1o7DraggableComponent,
    S8o1o9SettingsComponent,
    S8o1o8ProductComponent,
    S8o1o8DatabaseComponent,
    S8o1o9o1ObjectComponent,
    S8o1o9o1o1UiComponent,
    S8o1o9o1o2PositionComponent,
    S8o1o9o1o3SizeComponent,
    S8o1o9o2DataComponent,
    S8o1o8o2ButtonComponent,
    S8o1o8o3PopupComponent,
    S8o1o8o1ObjecttoolsComponent,
    S8o1o8o1o1MenucontextuelComponent,
    S8o1o8o1o2ResizeComponent,
    S8o1o8o1o3RightclickComponent,
    S8o2CommandcenterComponent,
    S8o2o1DatabaseComponent,
    S8o2o2GestiondataComponent,
    S8o2o3DraggableComponent,
    S8o1o9o2o1InputdataComponent,
    S8o1o9o2o2OutputdataComponent,
    S8o1o9o2o3TreatmentdataComponent,
    S8o1o2ServicesComponent,
    S8o1o1CmdcenterComponent,
    S8o1o1o1CmdcenterdetailComponent,
    S8o1o9o3CmdcenterComponent,
    S8o1o3VartransfertComponent,
    S8o1o4FonctionComponent,
    S8o1o3VariableComponent,
    S8o1o3o1VartransfertComponent,
    S8o1o3o2VarlocaltsComponent,
    S8o1o3o3VarlocalhtmlComponent,
    S7RubanComponent,
    S6ProjetComponent,
    S6o1RubanComponent,
    S6o2LinkurlComponent,
    S6o3PageurlComponent,
    S6o4SettingsComponent,
    S6o5ItemsComponent,
    S6o5o1FormsComponent,
    S6o5o2UIComponent,
    S6o5o3SelectComponent,
    S6o5o4DropdownComponent,
    S6o5o5BDComponent,
    S6o5o5o1GestionbdComponent,
    S6o5o5o2TableComponent,
    S6o5o5o3AlltableComponent,
    S6o5o5o4CategoryComponent,

  ],

  imports: [
    /* Importation : Angular */
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgChartsModule,
    DragDropModule,

    /* Importation : Aziz */
    AuthModule,
    

    /* Importation : Dossier S9 */
    /* Importation : Dossier S8 */
    
  ],


  exports: [
    /* Importation : Angular */
    /* Importation : Aziz */
    /* Importation : Dossier S9 */
    /* Importation : Dossier S8 */
  
  ],

  providers: [
    /* Importation : Angular */
    /* Importation : Aziz */
    AuthService,
    SharedService,

    /* Importation : Dossier S9 */
    /* Importation : Dossier S8 */
    
    
  ],
  bootstrap: [
    /* Importation : Angular */
    AppComponent

    /* Importation : Aziz */
    /* Importation : Dossier S9 */
    /* Importation : Dossier S8 */
    
  ]


})

export class AppModule { }
