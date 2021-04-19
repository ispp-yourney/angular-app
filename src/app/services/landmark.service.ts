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

  hostURL = environment.backendEndpoint;
  
  public nuevo(landmark: LandmarkDto): Observable<any> {
    var url=this.hostURL + '/landmark/create';
    return this.httpClient.post<LandmarkDto>(url, landmark);
  }

  public editar(landmark: LandmarkDto): Observable<any> {
    var url=this.hostURL + '/landmark/update';
    return this.httpClient.put<LandmarkDto>(url, landmark);
  }

  public mostrar(landmarkId: number): Observable<any> {
    var url=this.hostURL + '/landmark/show/'+landmarkId.toString();
    return this.httpClient.get<Landmark>(url);
  }

  public upgradeLandmark(landmarkId: number): Observable<any> {
    return this.httpClient.get<UpgradeLandmarkDto>(this.hostURL + "/paypal/create/SPONSORSHIP?id=" + landmarkId.toString())
  }


  public deleteLandmark(id: number): Observable<any> {
    var url = this.hostURL + '/landmark/delete/' + id;
    return this.httpClient.delete<any>(url);
  }

  public tieneActividades(landmarkId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(this.hostURL + "/landmark/hasActivity/" + landmarkId.toString())
  }

}
