import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpgradeLandmarkDto, LandmarkDto,Landmark } from '../models/itinerary';
import {environment} from '../../environments/environment-ci';
@Injectable({
  providedIn: 'root'
})
export class LandmarkService {

  constructor(private httpClient: HttpClient) { }

  // hostURL = 'http://localhost:8080';

  hostURL = environment.backendEndpoint;
  
  public nuevo(landmark: LandmarkDto): Observable<any> {
    var url=this.hostURL + '/landmark/create';
    var req = this.httpClient.post<LandmarkDto>(url, landmark);
    return req;
  }

  public nuevoSinActividad(landmark: LandmarkDto): Observable<any> {
    var url=this.hostURL + '/landmark/create';
    var req = this.httpClient.post<LandmarkDto>(url, landmark);
    return req;
  }

  public editar(landmark: LandmarkDto): Observable<any> {
    var url=this.hostURL + '/landmark/update';
    var req = this.httpClient.put<LandmarkDto>(url, landmark);
    return req;
  }

  public mostrar(landmarkId: number): Observable<any> {
    var url=this.hostURL + '/landmark/show/'+landmarkId.toString();
    var req = this.httpClient.get<Landmark>(url);
    return req;
  }

  public upgradeLandmark(landmarkId: number): Observable<any> {
    return this.httpClient.get<UpgradeLandmarkDto>(this.hostURL + "/paypal/create/SPONSORSHIP?id=" + landmarkId.toString())
  }
}
