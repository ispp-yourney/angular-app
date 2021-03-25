import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itinerary } from '../models/itinerary';
import { ItineraryUserPage } from '../models/itineraryUserPage';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  constructor(private httpClient: HttpClient) { }

  hostURL = 'https://be-dev-yourney.herokuapp.com/';

  public userItineraries(page:Number, userId:Number): Observable<ItineraryUserPage> {
    var url=this.hostURL + 'itinerary/user/'+page;
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    var body_params = { "userId": userId };
    var req=this.httpClient.post<ItineraryUserPage>(url,body_params);
    //req.subscribe(res=>console.log(res))
    return req;
  }

}
