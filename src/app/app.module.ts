import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './basics/navbar/navbar.component';
import { HeaderComponent } from './basics/header/header.component';
import { FooterComponent } from './basics/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './basics/sidebar/sidebar.component';
import { SharedService } from './services/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserMenuComponent } from './basics/user-menu/user-menu.component';
import { AuthService } from './services/auth/authservice';
import { AuthModule } from './auth/auth.module';
import { NgChartsModule } from 'ng2-charts';
import { UserNotifactionsComponent } from './basics/user-notifactions/user-notifactions.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SidebarComponent,
    UserMenuComponent,
    UserNotifactionsComponent,
    



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [
    SharedService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
