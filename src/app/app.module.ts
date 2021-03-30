import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { ItinerarylistComponent } from './components/itinerary/itinerarylist/itinerarylist.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { IndexComponent } from './components/index/index.component';
import { interceptor } from './revisors/interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/operations/login/login.component';
import { RegisterComponent } from './components/operations/register/register.component';
import { ItineraryViewContoller } from './components/itinerary/itineraryshow/itineraryview.component';
import { MyItinirariesComponent } from './components/itinerary/my-itiniraries/my-itiniraries.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ItinerarylistComponent,
    IndexComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ItineraryViewContoller,
    MyItinirariesComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    interceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
