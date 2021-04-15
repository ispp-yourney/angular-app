import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { LoginUser } from '../models/login-user';
import { NewUser } from '../models/new-user';
import { ShowUser, UpgradeUserDto } from '../models/show-user';

import {environment} from '../../environments/environment-ci';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = environment.backendEndpoint+'/auth/'
  constructor(private httpClient: HttpClient) { }

  public new(newUser: NewUser): Observable<any>{
    return this.httpClient.post<any>(this.auth + 'new', newUser);
  }

  public login(loginUser: LoginUser): Observable<any>{
    return this.httpClient.post<JwtDto>(this.auth + 'login', loginUser);
  }

  public showUser(username: String): Observable<any>{
    return this.httpClient.get<ShowUser>(this.auth+"show/"+username);
  }

  public updateUser(updateUser: NewUser): Observable<any>{
    return this.httpClient.put<any>(this.auth + 'update', updateUser);
  }

  public upgradeUser(): Observable<any> {
    return this.httpClient.get<UpgradeUserDto>(environment.backendEndpoint + "/paypal/create/SUBSCRIPTION")
  }

  


}
