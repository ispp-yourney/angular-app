import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment-ci';

@Injectable({
  providedIn: 'root'
})
export class BuscadorLandmarkService {

  constructor(private http:HttpClient) { }

  baseUrl:string = environment.backendEndpoint;
  private listCountries:string = this.baseUrl+"/landmark/country/list";
  private listCities:string = this.baseUrl+"/landmark/city/list";
  private listCitiesByCountry:string = this.baseUrl+"/landmark/country/";
  private landmarkSearch:string = this.baseUrl+ '/landmark/search/'
  
  public getAllCountry():Observable<string[]>{
    return this.http.get<string[]>(this.listCountries);
  }

  public getAllCity():Observable<string[]>{
    return this.http.get<string[]>(this.listCities);
  }

  public getCityByCountry(pais:string):Observable<string[]>{
    return this.http.get<string[]>(this.listCitiesByCountry + pais + "/city/list");
  }

  public landmarkPage(country:string,city:string,page:number): Observable<any>{
    let params = new HttpParams()
    .set('country', country)
    .set('city', city  )
    .set('page', page.toString() )
    .set('size', '8');
    return this.http.get<any>(this.landmarkSearch, {params});
  }
}
