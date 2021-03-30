import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itinerary } from '../models/itinerary';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  constructor(private httpClient: HttpClient) { }

  // hostURL = 'http://localhost:3000/';
  id = 1
  hostURL = 'https://be-dev-yourney.herokuapp.com';


  public lista(): Observable<Itinerary[]> {
    var url=this.hostURL + 'itineraries'
    var req=this.httpClient.get<Itinerary[]>(url);
    req.subscribe(res=>console.log(res))
    return req;
  }

  public vista(): Observable<Itinerary> {
    var url=this.hostURL + '/itinerary/show/' + this.id.toString()
    var req=this.httpClient.get<Itinerary>(url)
    req.subscribe(res=>console.log(res))
    return req;
  }

  public delete(idDelete): Observable<any> {
    var url=this.hostURL + '/itinerary/delete/' + idDelete
    var req = this.httpClient.delete(url)
    req.subscribe(res=>console.log(res))
    return req
  }




}
