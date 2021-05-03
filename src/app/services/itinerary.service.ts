import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itinerary, ItineraryDto } from '../models/itinerary';
import { ItineraryUserPage } from '../models/itineraryUserPage';
import { TokenService } from 'src/app/services/token.service';
import { environment } from '../../environments/environment-ci';
@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }
  
  hostURL = environment.backendEndpoint;

  public userItineraries(username: String, page: number): Observable<ItineraryUserPage> {
    var url = this.hostURL + '/itinerary/user/' + username;
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', '4');
    return this.httpClient.get<ItineraryUserPage>(url, {params});
  }

  public vista(id:number): Observable<Itinerary> {
    var url=this.hostURL + '/itinerary/show/' + id
    return this.httpClient.get<Itinerary>(url)
  }

  public nuevo(itinerary: ItineraryDto): Observable<any> {
    var url=this.hostURL + '/itinerary/create';
    return this.httpClient.post<ItineraryDto>(url, itinerary);
  }

  public editar(itinerary: ItineraryDto): Observable<any> {
    var url=this.hostURL + '/itinerary/update';
    return this.httpClient.put<ItineraryDto>(url, itinerary);
  }
  
  public delete(idDelete: number): Observable<any> {
    var url=this.hostURL + '/itinerary/delete/' + idDelete;
    return this.httpClient.delete(url);
  }

}
