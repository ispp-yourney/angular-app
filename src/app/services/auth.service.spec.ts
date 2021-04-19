import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { NewUser } from '../models/new-user';
import { LoginUser } from '../models/login-user';
import { JwtDto } from '../models/jwt-dto';
import { ShowUser, UpgradeUserDto } from '../models/show-user';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
  put = jasmine.createSpy('httpClient.put')
  delete = jasmine.createSpy('httpClient.delete')
}

describe('AuthService', () => {
  let service: AuthService;
  let httpClientMock: HttpClientMock;
  let newUser: NewUser
  let loginUser: LoginUser
  let jwtDto: JwtDto
  let showUser: ShowUser
  let userUpdateResponseMock: { text: string; }
  let userUpgrade: UpgradeUserDto


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: HttpClient,
          useClass: HttpClientMock
        }
      ]
    });
    service = TestBed.inject(AuthService);
    httpClientMock = TestBed.get(HttpClient);

    newUser = new NewUser("testUser", "testPassword", "John", "Doe", "user@test.com");
    loginUser = new LoginUser("testUser", "testPassword");
    jwtDto = {
      token: "testToken",
      bearer: "testBearer",
      username: "testUser",
      authorities: [
        "ROLE_USER"
      ]
    }
    const createDate: Date = new Date("2021-01-01T00:00:01");
    showUser = new ShowUser("testUser", "testPassword", "John", "Doe", "user@test.com", null, 0);

    userUpdateResponseMock = { "text": "Usuario actualizado correctamente" }
    userUpgrade = new UpgradeUserDto("paypal redirection")
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('check base backend url', () => {
    let url = service.auth;
    expect(url).toBeDefined();
  });

  it('should create new user', () => {
    const authObservable: Observable<any> = of(newUser);
    httpClientMock.post.and.returnValue(authObservable);
    service.new(newUser)
      .subscribe(authResponse => {
        expect(authResponse.username).toEqual("testUser")
      });
  });

  it('should login with user', () => {
    const authObservable: Observable<JwtDto> = of(jwtDto);
    httpClientMock.post.and.returnValue(authObservable);
    service.login(loginUser)
      .subscribe(authResponse => {
        expect(authResponse.username).toEqual("testUser")
      });
  });

  it('should show user', () => {
    const authObservable: Observable<ShowUser> = of(showUser);
    httpClientMock.get.and.returnValue(authObservable);
    service.showUser("testUser")
      .subscribe(authResponse => {
        expect(authResponse.username).toEqual("testUser")
      });
  });

  it('should update user', () => {
    const authObservable: Observable<any> = of(userUpdateResponseMock);
    httpClientMock.put.and.returnValue(authObservable);
    service.updateUser(newUser)
      .subscribe(authResponse => {
        expect(authResponse.text).toEqual("Usuario actualizado correctamente")
      });
  });

  it('should upgrade user', () => {
    const authObservable: Observable<UpgradeUserDto> = of(userUpgrade);
    httpClientMock.get.and.returnValue(authObservable);
    service.upgradeUser()
      .subscribe(authResponse => {
        expect(authResponse.text).toEqual("paypal redirection")
      });
  });

});