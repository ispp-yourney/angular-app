import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LandmarkDto } from '../models/itinerary';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {

  constructor(private httpClient: HttpClient) { }

  hostURL = 'http://localhost:8080';
  
  public nuevo(landmark: LandmarkDto): Observable<any> {
    var url=this.hostURL + '/landmark/create';
    var req = this.httpClient.post<LandmarkDto>(url, landmark);
    return req;
  }

  public editar(landmark: LandmarkDto): Observable<any> {
    var url=this.hostURL + '/landmark/update';
    var req = this.httpClient.put<LandmarkDto>(url, landmark);
    return req;
  }
}
