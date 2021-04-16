import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { IndexComponent } from './components/index/index.component';
import { ItinerarylistComponent } from './components/itinerary/itinerarylist/itinerarylist.component';
import { ItineraryViewComponent } from './components/itinerary/itineraryshow/itineraryview.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/operations/login/login.component';
import { RegisterComponent } from './components/operations/register/register.component';
import { ItineraryformComponent } from './components/itinerary/itineraryform/itineraryform.component';
import { ProfileComponent } from './components/profile/profile.component';
import {PermissionsService as guard } from './revisors/permissions.service';
import { ItineraryupdateComponent } from './components/itinerary/itineraryupdate/itineraryupdate.component';
import { BuscadorLandmarkComponent } from './components/buscador-landmark/buscador-landmark.component';
import { LandmarkShowComponent } from './components/landmark/landmark-show/landmark-show.component';

export const routes: Routes = [
  {path: '' , component: IndexComponent},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'buscador', component: BuscadorComponent, pathMatch: 'full'},
  {path: 'buscadorLandmark', component: BuscadorLandmarkComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'itinerarios/crear', component: ItineraryformComponent, canActivate: [guard], data: { expectedRol:['user'] }},
  {path: 'itinerarios/actualizar/:id', component: ItineraryupdateComponent, canActivate: [guard], data: { expectedRol:['user'] }},
  {path: 'itinerarios/:id', component: ItineraryViewComponent,pathMatch: 'full'},
  {path: 'punto_interes/:id', component: LandmarkShowComponent,pathMatch: 'full'},
  {path: 'error', component: NotFoundComponent},
  // {path:'itinerarios/:id', component: ItinerarylistComponent,pathMatch: 'full'},
  {path:'perfil/:username', component: ProfileComponent, pathMatch: 'full'},
  {path:'perfil/:username/itinerarios/:id', component: ItinerarylistComponent,pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
