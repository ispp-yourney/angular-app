import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { routes } from "../app-routing.module";
import { Location } from '@angular/common';
import { InterceptorService } from './interceptor.service';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { interceptor } from './interceptor.service';
import { getPlatform } from '@angular/core';
import { Observable, of } from 'rxjs';

let interceptorService:InterceptorService
let tokenService: TokenService;
let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;

let spyTokenService;
let fixture


describe('InterceptorService', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername", "getAuthorities", "setToken", "setUsername", "setAuthorities","logOut"]);
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");
    spyTokenService.getToken.and.returnValue("tokenTest");

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
      ]

    }).compileComponents().then(() => {

      interceptorService = TestBed.inject(InterceptorService);
      tokenService = TestBed.inject(TokenService);
      // Inject the http service and test controller for each test
      httpTestingController = TestBed.inject(HttpTestingController);
      activatedRoute = TestBed.inject(ActivatedRoute);
      router = TestBed.inject(Router);
      location = TestBed.inject(Location);

      router.initialNavigation();
    });
  });

  afterEach(() => {
    tokenService = null;
  });


  it('should use intercept function with token', fakeAsync(() => {

    spyTokenService.getToken.and.returnValue("tokenTest");
    const req = new HttpRequest<any>('GET', 'hhtp://test.com');
    const next: any = {
      handle: (request: HttpRequest<any>) => {
        return of({ test: 'test' });
      }
    };
    tick()
    expect(interceptorService.intercept).toBeTruthy();
    interceptorService.intercept(req,next )
  }));

  it('should use intercept function without token', fakeAsync(() => {
    spyTokenService.getToken.and.returnValue();
    const req = new HttpRequest<any>('GET', 'hhtp://test.com');
    const next: any = {
      handle: (request: HttpRequest<any>) => {
        return of({ test: 'test' });
      }
    };
    tick()
    expect(interceptorService.intercept).toBeTruthy();
    interceptorService.intercept(req,next )

  }));


 
})
