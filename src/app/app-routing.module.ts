import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainUserComponent } from './main-user/main-user.component';
import { PorteFeuilleComponent } from './porte-feuille/porte-feuille.component';
import { HomePageComponent } from './home-page/home-page.component';
import { WalletsComponent } from './wallets/wallets.component';
import { TemoignageAdminComponent } from './temoignage-admin/temoignage-admin.component';
import { DashbordAdminComponent } from './dashbord-admin/dashbord-admin.component';

const routes: Routes = [

  {
    path:'login',
    pathMatch:'full',
    component:LoginComponent
  
  },
  {
    path:'mainuser',
    pathMatch:'full',
    component:MainUserComponent
  
  },
  {
    path:'porteFeuille/:id',
    pathMatch:'full',
    component:PorteFeuilleComponent
  
  },
  {
    path:'',
    pathMatch:'full',
    component:HomePageComponent
  
  },
  {
    path:'wallet',
    pathMatch:'full',
    component:WalletsComponent
  
  },
  {
    path:'temoiAdmin',
    pathMatch:'full',
    component:TemoignageAdminComponent
  
  },
  {
    path:'dashbordAdmin',
    pathMatch:'full',
    component:DashbordAdminComponent
  
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
