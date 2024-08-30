import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainUserComponent } from './main-user/main-user.component';
import { NgChartsModule } from 'ng2-charts';
import { AcheterModaleComponent } from './acheter-modale/acheter-modale.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PorteFeuilleComponent } from './porte-feuille/porte-feuille.component';
import { TableModule } from 'primeng/table';
import { SellModaleComponent } from './sell-modale/sell-modale.component';
import { AjouterPorteFeuilleComponent } from './ajouter-porte-feuille/ajouter-porte-feuille.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { WalletsComponent } from './wallets/wallets.component';
import { CarouselModule } from 'primeng/carousel';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { TemoignageAdminComponent } from './temoignage-admin/temoignage-admin.component';
import { DashbordAdminComponent } from './dashbord-admin/dashbord-admin.component';
import { SplitterModule } from 'primeng/splitter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainUserComponent,
    AcheterModaleComponent,
    PorteFeuilleComponent,
    SellModaleComponent,
    AjouterPorteFeuilleComponent,
    HomePageComponent,
    UserNavbarComponent,
    UserFooterComponent,
    WalletsComponent,
    NavbarAdminComponent,
    TemoignageAdminComponent,
    DashbordAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    BrowserAnimationsModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    TableModule,
    CarouselModule,
    SplitterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
