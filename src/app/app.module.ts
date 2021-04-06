import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
    CommentformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    interceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
