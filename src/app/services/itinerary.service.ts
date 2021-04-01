import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itinerary, ItineraryDto } from '../models/itinerary';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  constructor(private httpClient: HttpClient) { }

  hostURL = 'http://localhost:8080/';

  public lista(): Observable<Itinerary[]> {
    var url=this.hostURL + 'itineraries'
    var req=this.httpClient.get<Itinerary[]>(url);
    req.subscribe(res=>console.log(res))
    return req;
  }
  
  public nuevo(itinerary: ItineraryDto): Observable<any> {
    var url=this.hostURL + 'itinerary/create';
    var req = this.httpClient.post<ItineraryDto>(url, itinerary);
    req.subscribe(res=>console.log(res));
    return req;
  }

}
