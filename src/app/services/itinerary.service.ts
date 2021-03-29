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

  public userItineraries(page:Number, username:String): Observable<ItineraryUserPage> {
    var url=this.hostURL + 'itinerary/user/'+username;
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    var url_params = "?page="+page;
    var req=this.httpClient.get<ItineraryUserPage>(url+url_params);
    //req.subscribe(res=>console.log(res))
    return req;
  }

}