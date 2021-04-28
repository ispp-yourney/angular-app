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
import { ConfirmationUserComponent } from './components/confirmation-user/confirmation-user.component';
import { TermComponent } from './components/terms/terms.component';

export const routes: Routes = [
  {path: '' , component: IndexComponent},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'buscador', component: BuscadorComponent, pathMatch: 'full'},
  {path: 'buscador_punto_interes', component: BuscadorLandmarkComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'itinerarios/crear', component: ItineraryformComponent, canActivate: [guard], data: { expectedRol:['user', 'admin'] }},
  {path: 'itinerarios/actualizar/:id', component: ItineraryupdateComponent, canActivate: [guard], data: { expectedRol:['user', 'admin'] }},
  {path: 'itinerarios/:id', component: ItineraryViewComponent,pathMatch: 'full'},
  {path: 'punto_interes/:id', component: LandmarkShowComponent,pathMatch: 'full'},
  {path: 'confirmNewUser', component: ConfirmationUserComponent,pathMatch: 'full'},
  {path: 'error', component: NotFoundComponent},
  {path:'perfil/:username', component: ProfileComponent, pathMatch: 'full'},
  {path: 'terminos', component: TermComponent, pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
