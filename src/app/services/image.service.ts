import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import {environment} from '../../environments/environment-ci';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService, private http: HttpClient) { }
  
  hostURL = environment.backendEndpoint + '/image';

  public addItineraryPhoto(itineraryId: number, itineraryImage: File): Observable<any> {
    var url = this.hostURL + '/uploadForItinerary/' + itineraryId;

    const formData: FormData = new FormData();
    formData.append('multipartFile', itineraryImage);

    return this.httpClient.post<any>(url, formData)
  }

  public addLandmarkPhoto(landmarkId: number, landmarkImage: File): Observable<any> {
    var url = this.hostURL + '/uploadForLandmark/' + landmarkId;

    const formData: FormData = new FormData();
    formData.append('multipartFile', landmarkImage);

    return this.httpClient.post<any>(url, formData)
  }

  public addUserPhoto(userImage: File): Observable<any> {
    var url = this.hostURL + '/uploadForUser';

    const formData: FormData = new FormData();
    formData.append('multipartFile', userImage);

    return this.httpClient.post<any>(url, formData)
  }

}