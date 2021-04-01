import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itinerary } from '../models/itinerary';
import { ItineraryUserPage } from '../models/itineraryUserPage';
import { TokenService } from 'src/app/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  // hostURL = 'http://localhost:3000/';
  id = 1
  hostURL = 'https://be-dev-yourney.herokuapp.com';

  public userItineraries(page:Number, username:String): Observable<ItineraryUserPage> {
    var url=this.hostURL + '/itinerary/user/'+username;
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    var url_params = "?page="+page;
    var req=this.httpClient.get<ItineraryUserPage>(url+url_params);
    //req.subscribe(res=>console.log(res))
    return req;
  }

  public vista(id:number): Observable<Itinerary> {
    var url=this.hostURL + '/itinerary/show/' + id
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