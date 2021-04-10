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
    var url = this.hostURL + '/uploadForItinerary/' + itineraryId
    const formData: FormData = new FormData()
    formData.append('multipartFile', itineraryImage)
    return this.httpClient.post<any>(url, formData)
  }

  public deleteItineraryPhoto(itineraryId: number): Observable<any> {
    var url = this.hostURL + '/deleteForItinerary/' + itineraryId
    return this.httpClient.delete<any>(url)
  }

  public addLandmarkPhoto(landmarkId: number, landmarkImage: File): Observable<any> {
    var url = this.hostURL + '/uploadForLandmark/' + landmarkId
    const formData: FormData = new FormData()
    formData.append('multipartFile', landmarkImage)
    return this.httpClient.post<any>(url, formData)
  }

  public deleteLandmarkPhoto(landmarkId: number): Observable<any> {
    var url = this.hostURL + '/deleteForLandmark/' + landmarkId
    return this.httpClient.delete<any>(url)
  }

  public addUserPhoto(userImage: File): Observable<any> {
    var url = this.hostURL + '/uploadForUser'
    const formData: FormData = new FormData()
    formData.append('multipartFile', userImage)
    return this.httpClient.post<any>(url, formData)
  }

  public deleteUserPhoto(): Observable<any> {
    var url = this.hostURL + '/deleteForUser'
    return this.httpClient.delete<any>(url)
  }

}