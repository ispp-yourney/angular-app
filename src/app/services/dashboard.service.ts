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
export class DashboardService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }
  
  hostURL = environment.backendEndpoint + "/itinerary/";

  public itinerariosOrdenadosPorVisualizaciones(country: string, city:string): Observable<any> {
    var url = this.hostURL + 'searchOrderedByViews';
    let params = new HttpParams().set('city', city).set('country', country);
    return this.httpClient.get<any>(url, {params});
  }

  public landmarkOrdenadosPorVisualizaciones(country: string, city:string): Observable<any> {
    var url = environment.backendEndpoint + '/landmark/searchOrderedByViews';
    let params = new HttpParams().set('city', city).set('country', country);
    return this.httpClient.get<any>(url, {params});
  }

  public itinerariosOrdenadosPorComentarios(country: string, city:string): Observable<any> {
    var url = this.hostURL + 'searchOrderedByComments';
    let params = new HttpParams().set('city', city).set('country', country);
    return this.httpClient.get<any>(url, {params});
  }

  public itinerariosOrdenadosPorValoracion(country: string, city:string): Observable<any> {
    var url = this.hostURL + 'searchOrderedByRating';
    let params = new HttpParams().set('city', city).set('country', country);
    return this.httpClient.get<any>(url, {params});
  }

  public ultimosItinerariosOrdenadosPorComentarios(country: string, city:string): Observable<any> {
    var url = this.hostURL + 'searchOrderedByComments/lastMonth';
    let params = new HttpParams().set('city', city).set('country', country);
    return this.httpClient.get<any>(url, {params});
  }

  public ultimosItinerariosOrdenadosPorValoracion(country: string, city:string): Observable<any> {
    var url = this.hostURL + 'searchOrderedByRating/lastMonth';
    let params = new HttpParams().set('city', city).set('country', country);
    return this.httpClient.get<any>(url, {params});
  }

  public getAllCountry():Observable<string[]>{
    return this.httpClient.get<string[]>(environment.backendEndpoint + "/landmark/country/list");
  }

  public getCityByCountry(pais:string):Observable<string[]>{
    return this.httpClient.get<string[]>(environment.backendEndpoint + "/landmark/country/" + pais + "/city/list");
  }

}
