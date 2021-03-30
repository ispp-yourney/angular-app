import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { LoginUser } from '../models/login-user';
import { NewUser } from '../models/new-user';
import { ShowUser } from '../models/show-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = 'https://be-dev-yourney.herokuapp.com/auth/'
  //auth='http://localhost:50482/auth/';
  //auth = 'http://localhost:3000/'
  constructor(private httpClient: HttpClient) { }

  public new(newUser: NewUser): Observable<any>{
    return this.httpClient.post<any>(this.auth + 'new', newUser);
  }

  public login(loginUser: LoginUser): Observable<any>{
    return this.httpClient.post<JwtDto>(this.auth + 'login', loginUser);
    //return this.httpClient.get<JwtDto>(this.auth+'login');
    
  }

  public showUser(username: String): Observable<any>{
    return this.httpClient.get<ShowUser>(this.auth+"show/"+username);
  }



}
