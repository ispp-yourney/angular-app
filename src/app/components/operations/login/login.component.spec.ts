import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { MenuComponent } from '../../menu/menu.component';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { routes } from "../../../app-routing.module";
import { ReactiveFormsModule, FormsModule, FormBuilder } from "@angular/forms";
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { LoginUser } from 'src/app/models/login-user';
import { NewUser } from 'src/app/models/new-user';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

let component: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;

let authService: AuthService;
let tokenService: TokenService;
let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;
let formBuilder: FormBuilder

let spyTokenService;

let newUser = new NewUser("testUser", "testPassword", "John", "Doe", "user@test.com");
let loginUser = new LoginUser("testUser", "testPassword");


describe('Login', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername", "getAuthorities", "setToken", "setUsername", "setAuthorities","logOut"]);
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");
    spyTokenService.getAuthorities.and.returnValue(['user']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule,
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        LoginComponent,
        MenuComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        AuthService
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;

      // Returns a service with the MockBackend so we can test with dummy responses
      authService = TestBed.inject(AuthService);
      //spyAuthService.showUser.and.returnValue(showUser);
      tokenService = TestBed.inject(TokenService);
      // Inject the http service and test controller for each test
      httpTestingController = TestBed.inject(HttpTestingController);
      activatedRoute = TestBed.inject(ActivatedRoute);
      router = TestBed.inject(Router);
      location = TestBed.inject(Location);
      formBuilder = TestBed.inject(FormBuilder);

      router.initialNavigation();
    });
  });

  afterEach(() => {
    fixture = null;
    component = null;
    authService = null;
    tokenService = null;
  });


  it('should get token ngOnInit', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.isLogged).toEqual(true)
  });

  it('should not get token ngOnInit', () => {
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.isLogged).toEqual(false)
  });

  it('should login', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(authService, 'login').and.returnValue(of(loginUser))
    fixture.detectChanges();
    component.ngOnInit()
    component.onLogin();
    expect(component.isLogged).toEqual(true)
    expect(location.path()).toBe("/");
  });

  it('should fail to login', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(authService, 'login').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))
    fixture.detectChanges();
    component.ngOnInit()
    component.onLogin();
    expect(component.isLogged).toEqual(false)
    expect(component.messageError).toEqual('Error')
    //expect(location.path()).toBe("");
  });

  it('should fail to login and undefined error', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(authService, 'login').and.returnValue(throwError({
      status: 404,
      error: {
        textError: 'Error'
      }
    }))
    fixture.detectChanges();
    component.ngOnInit()
    component.onLogin();
    expect(component.isLogged).toEqual(false)
    expect(component.messageError).toEqual('Usuario incorrecto')
    //expect(location.path()).toBe("");
  });

  it('should logout', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyTokenService.logOut.and.returnValue();
    
    spyOn(component, 'reloadWindow').and.returnValue();

    fixture.detectChanges();
    component.ngOnInit()
    component.onLogout();
    expect(component.reloadWindow).toBeTruthy();
  });
})