import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { routes } from "../app-routing.module";
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { LoginUser } from 'src/app/models/login-user';
import { NewUser } from 'src/app/models/new-user';
import { PermissionsService } from './permissions.service';

let permissionsService:PermissionsService
let tokenService: TokenService;
let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;

let spyTokenService;

let newUser = new NewUser("testUser", "testPassword", "John", "Doe", "user@test.com");
let loginUser = new LoginUser("testUser", "testPassword");


describe('PermissionsService', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername", "getAuthorities", "setToken", "setUsername", "setAuthorities","logOut"]);
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");

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


      permissionsService = TestBed.inject(PermissionsService);
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


  it('should use canActivate function and admin', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyTokenService.getAuthorities.and.returnValue(['ROLE_ADMIN']);
    permissionsService = new PermissionsService(tokenService,router);
    let activatedRouteSnapshot=new ActivatedRouteSnapshot();
    activatedRouteSnapshot.data = { expectedRol:['user'] }
    const result = permissionsService.canActivate(activatedRouteSnapshot, <RouterStateSnapshot>{url: 'testUrl'});
    expect(result).toBe(false);
  });

  it('should use canActivate function without token and admin', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyTokenService.getAuthorities.and.returnValue(['ROLE_ADMIN']);
    permissionsService = new PermissionsService(tokenService,router);
    let activatedRouteSnapshot=new ActivatedRouteSnapshot();
    activatedRouteSnapshot.data = { expectedRol:['admin'] }
    const result = permissionsService.canActivate(activatedRouteSnapshot, <RouterStateSnapshot>{url: 'testUrl'});
    expect(result).toBe(true);
  });

  it('should use canActivate function and user', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyTokenService.getAuthorities.and.returnValue(['ROLE_USER']);
    permissionsService = new PermissionsService(tokenService,router);
    let activatedRouteSnapshot=new ActivatedRouteSnapshot();
    activatedRouteSnapshot.data = { expectedRol:['admin'] }
    const result = permissionsService.canActivate(activatedRouteSnapshot, <RouterStateSnapshot>{url: 'testUrl'});
    expect(result).toBe(false);
  });
 
})
