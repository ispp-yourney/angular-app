import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityDto } from '../models/itinerary';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient: HttpClient) { }

  hostURL = 'http://localhost:8080/';
  
  public nuevo(itinerary: ActivityDto): Observable<any> {
    var url=this.hostURL + 'itinerary/create';
    var req = this.httpClient.post<ActivityDto>(url, itinerary);
    req.subscribe(res=>console.log(res));
    return req;
  }
}
