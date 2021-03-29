import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { ItinerarylistComponent } from './components/itinerary/itinerarylist/itinerarylist.component';
import { MyItinerariesComponent } from './components/itinerary/my-itineraries/my-itineraries.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/operations/login/login.component';
import { RegisterComponent } from './components/operations/register/register.component';

const routes: Routes = [
  //{path:'',component: AppComponent,pathMatch: 'full'},
  {path: '' , component: IndexComponent},
  {path:'itinerarios/:id', component: ItinerarylistComponent,pathMatch: 'full'},
  {path:'mis_itinerarios/:id', component: MyItinerariesComponent,pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'error', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
