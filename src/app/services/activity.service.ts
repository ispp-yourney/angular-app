import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityDto } from '../models/itinerary';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient: HttpClient) { }

  hostURL = 'http://localhost:8080';
  
  public nuevo(activity: ActivityDto): Observable<any> {
    var url=this.hostURL + '/activity/create';
    var req = this.httpClient.post<ActivityDto>(url, activity);
    return req;
  }

  public editar(activity: ActivityDto): Observable<any> {
    var url=this.hostURL + '/activity/update';
    var req = this.httpClient.put<ActivityDto>(url, activity);
    return req;
  }

  public borrar(id: number): Observable<any> {
    var url = this.hostURL + '/activity/delete/' + id;
    var req = this.httpClient.delete<ActivityDto>(url);
    return req;
  }
}
