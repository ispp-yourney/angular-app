import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itinerary } from '../models/itinerary';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  constructor(private httpClient: HttpClient) { }

  hostURL = 'http://localhost:3000/';

  public lista(): Observable<Itinerary[]> {
    var url=this.hostURL + 'itineraries'
    var req=this.httpClient.get<Itinerary[]>(url);
    req.subscribe(res=>console.log(res))
    return req;
  }

  public vista(): Observable<Itinerary> {
    var url=this.hostURL + 'itinerary'
    var req=this.httpClient.get<Itinerary>(url);
    req.subscribe(res=>console.log(res))
    return req;
  }

}
