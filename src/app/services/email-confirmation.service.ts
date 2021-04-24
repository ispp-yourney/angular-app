import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment-ci';

@Injectable({
  providedIn: 'root'
})
export class EmailConfirmationService {

  
  constructor(private httpClient: HttpClient) { }
  hostURL = environment.backendEndpoint;

  public nuevo(token: string): Observable<any> {
    var url=this.hostURL + '/auth/confirmNewUser?token='+ token;
    return this.httpClient.get<any>(url);
  }

  public sendConfirmationCode(email: string): Observable<any> {
    var url=this.hostURL + '/auth/requestConfirmation?email='+email;
    return this.httpClient.get<any>(url);
  }
 


}
