import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itinerary, ItineraryDto } from '../models/itinerary';
import { ItineraryUserPage } from '../models/itineraryUserPage';
import { TokenService } from 'src/app/services/token.service';
import {environment} from '../../environments/environment-ci';
@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }
  //hostURL1 = 'http://localhost:3000/itineraries';
  
  hostURL = environment.backendEndpoint;

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
    return req;
  }

  
  
  public nuevo(itinerary: ItineraryDto): Observable<any> {
    var url=this.hostURL + '/itinerary/create';
    var req = this.httpClient.post<ItineraryDto>(url, itinerary);
    return req;
  }

  public editar(itinerary: ItineraryDto): Observable<any> {
    var url=this.hostURL + '/itinerary/update';
    var req = this.httpClient.put<ItineraryDto>(url, itinerary);
    return req;
  }
  
  public delete(idDelete): Observable<any> {
    var url=this.hostURL + '/itinerary/delete/' + idDelete
    var req = this.httpClient.delete(url)
    return req
  }

}
