import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment-ci';
@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  baseUrl:string = environment.backendEndpoint;
  private listCountries:string = this.baseUrl+"/landmark/country/list?itinerary=true";
  private listCities:string = this.baseUrl+"/landmark/city/list";
  private listCitiesByCountry:string = this.baseUrl+"/landmark/country/";
  private itinerarySearch:string = this.baseUrl+ '/itinerary/search/'
  
  

  constructor( private http:HttpClient ) { }

  public getAllCountry():Observable<string[]>{
    return this.http.get<string[]>(this.listCountries);
  }

  public getAllCity():Observable<string[]>{
    return this.http.get<string[]>(this.listCities);
  }

  public getCityByCountry(pais:string):Observable<string[]>{
    return this.http.get<string[]>(this.listCitiesByCountry + pais + "/city/list");
  }

  public postFilter(country:string,city:string,maxBudget:number,maxDays:number,page:number): Observable<any>{
    let params = new HttpParams()
    .set('country', country )
    .set('city', city )
    .set('maxBudget', maxBudget.toString() )
    .set('maxDays', maxDays.toString())
    .set('page', page.toString())
    .set('size', "8");
    return this.http.get<any>(this.itinerarySearch, {params});
  }

}
