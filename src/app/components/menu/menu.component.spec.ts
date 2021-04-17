import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from './menu.component';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { routes } from "../../app-routing.module";
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';


let component: MenuComponent;
let fixture: ComponentFixture<MenuComponent>;

let tokenService: TokenService;
let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;

let spyTokenService;



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
    let routerSpy = {
      navigate: jasmine.createSpy('navigate')
    }
    
    
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        //RouterTestingModule.withRoutes(routes),
      ],
      declarations: [
        MenuComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        { provide: Router, useValue: routerSpy }
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(MenuComponent);
      component = fixture.componentInstance;

      tokenService = TestBed.inject(TokenService);
      // Inject the http service and test controller for each test
      httpTestingController = TestBed.inject(HttpTestingController);
      router = TestBed.inject(Router);
      location = TestBed.inject(Location);

    });
  });

  afterEach(() => {
    fixture = null;
    component = null;
    tokenService = null;
  });

  it('should logout', () => {
    spyTokenService.logOut.and.returnValue();
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(component, 'reloadMenu').and.returnValue();
    component.ngOnInit()

    fixture.detectChanges();
    component.onLogout();
    expect(component.onLogout).toBeTruthy();
  });

})
