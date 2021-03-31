import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http'
import { Observable } from 'rxjs';
import { searchFilter } from '../models/search-filters';
import { JwtDto } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  private url:string = "/landmark/country/list";
  private url1:string = "/landmark/city/list";
  private url2:string = "/landmark/country/";
  private url3:string = "https://be-dev-yourney.herokuapp.com/";
  

  constructor( private http:HttpClient ) { }

  public getAllCountry():Observable<string[]>{
    return this.http.get<string[]>(this.url);
  }

  public getAllCity():Observable<string[]>{
    return this.http.get<string[]>(this.url1);
  }

  public getCityByCountry(pais:string):Observable<string[]>{
    return this.http.get<string[]>(this.url2 + pais + "/city/list");
  }

  public postFilter(searchFilter: searchFilter): Observable<any>{
    let params = new HttpParams()
    .set('country', searchFilter.country)
    .set('city', searchFilter.city)
    .set('maxBudget', searchFilter.maxBudget)
    .set('maxDays', searchFilter.maxDays);
    return this.http.get<any>(this.url3 + 'list/', {params});

    
  }

}
