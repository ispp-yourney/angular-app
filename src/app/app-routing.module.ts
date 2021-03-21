import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ItinerarylistComponent } from './components/itinerary/itinerarylist/itinerarylist.component';

const routes: Routes = [
  //{path:'',component: AppComponent,pathMatch: 'full'},
  {path: '' , redirectTo: 'AppComponent', pathMatch: 'full'},
  {path:':id/itineraries', component: ItinerarylistComponent,pathMatch: 'full'},
  { path: '**', redirectTo: '', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
