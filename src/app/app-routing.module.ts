import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { IndexComponent } from './components/index/index.component';
import { ItinerarylistComponent } from './components/itinerary/itinerarylist/itinerarylist.component';
import { ItineraryViewContoller } from './components/itinerary/itineraryshow/itineraryview.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/operations/login/login.component';
import { RegisterComponent } from './components/operations/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: '' , component: IndexComponent},
  {path:'itinerario/:id', component: ItineraryViewContoller,pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'error', component: NotFoundComponent, pathMatch: 'full'},
  {path: 'buscador', component: BuscadorComponent, pathMatch: 'full'},
  {path:'perfil/:username', component: ProfileComponent, pathMatch: 'full'},
  {path:'perfil/:username/itinerarios/:id', component: ItinerarylistComponent,pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
