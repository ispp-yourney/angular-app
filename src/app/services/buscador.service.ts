import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { Observable } from 'rxjs';
import { searchFilter } from '../models/search-filters';
import { JwtDto } from '../models/jwt-dto';
import {environment} from '../../environments/environment-ci';
@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  private baseUrl:string = environment.backendEndpoint;
  private listCountries:string = this.baseUrl+"/landmark/country/list";
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

  public postFilter(searchFilter: searchFilter): Observable<any>{
    let params = new HttpParams()
    .set('country', searchFilter.country ?? "")
    .set('city', searchFilter.city  ?? "")
    .set('maxBudget', searchFilter.maxBudget  ?? "")
    .set('maxDays', searchFilter.maxDays  ?? "")
    .set('size', '1000');
    var req=this.http.get<any>(this.itinerarySearch, {params});
 //console.log(req)
    return req;
    
  }

}
