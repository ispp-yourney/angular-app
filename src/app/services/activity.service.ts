import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityDto } from '../models/itinerary';
import {environment} from '../../environments/environment-ci';
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient: HttpClient) { }

  hostURL = environment.backendEndpoint;
  
  public nuevo(activity: ActivityDto): Observable<any> {
    var url=this.hostURL + '/activity/create';
    return this.httpClient.post<ActivityDto>(url, activity);
  }

  public editar(activity: ActivityDto): Observable<any> {
    var url=this.hostURL + '/activity/update';
    return this.httpClient.put<ActivityDto>(url, activity);
  }

  public borrar(id: number): Observable<any> {
    var url = this.hostURL + '/activity/delete/' + id;
    return this.httpClient.delete<any>(url);
  }


  public show(id: number): Observable<any> {
    var url = this.hostURL + '/activity/show/' + id;
    
    return this.httpClient.get<ActivityDto>(url);
  }
}
