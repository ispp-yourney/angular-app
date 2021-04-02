import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { ItinerarylistComponent } from './components/itinerary/itinerarylist/itinerarylist.component';
import { ItineraryViewComponent } from './components/itinerary/itineraryshow/itineraryview.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/operations/login/login.component';
import { RegisterComponent } from './components/operations/register/register.component';
import { ItineraryformComponent } from './components/itinerary/itineraryform/itineraryform.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: '' , component: IndexComponent},
  {path:'itinerario/:id', component: ItineraryViewComponent,pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'itineraries/create', component: ItineraryformComponent},
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
