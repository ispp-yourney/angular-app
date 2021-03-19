import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { ItinerarylistComponent } from './components/itinerary/itinerarylist/itinerarylist.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';





@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ItinerarylistComponent
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
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
