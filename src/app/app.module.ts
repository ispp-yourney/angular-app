import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ItinerarylistComponent } from './components/itinerary/itinerarylist/itinerarylist.component';
import { ItineraryViewComponent } from './components/itinerary/itineraryshow/itineraryview.component';
import { IndexComponent } from './components/index/index.component';
import { interceptor } from './revisors/interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/operations/login/login.component';
import { RegisterComponent } from './components/operations/register/register.component';
import { ItineraryformComponent } from './components/itinerary/itineraryform/itineraryform.component';
import { ItineraryupdateComponent } from './components/itinerary/itineraryupdate/itineraryupdate.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommentformComponent } from './components/comment/commentform/commentform.component';
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { BuscadorLandmarkComponent } from './components/buscador-landmark/buscador-landmark.component';
import { LandmarkShowComponent } from './components/landmark/landmark-show/landmark-show.component';
import { HereMapComponent } from './components/here-map/here-map.component';
import { LandmarkCreateComponent } from './components/landmark/landmark-create/landmark-create.component';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationUserComponent } from './components/confirmation-user/confirmation-user.component';
import {NgxPaginationModule} from 'ngx-pagination'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { TermComponent } from './components/terms/terms.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ItinerarylistComponent,
    ItineraryViewComponent,
    IndexComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ItineraryformComponent,
    ItineraryupdateComponent,
    ProfileComponent,
    BuscadorComponent,
    FooterComponent,
    CommentformComponent,
    BuscadorLandmarkComponent,
    LandmarkShowComponent,
    HereMapComponent,
    LandmarkCreateComponent,
    ConfirmationUserComponent,
    DashboardComponent,
    TermComponent
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    ChartsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    NgxPaginationModule
  ],
  providers: [
    interceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
