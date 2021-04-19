import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
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
let routerSpy;
let spyTokenService;



describe('Menu', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername", "getAuthorities", "setToken", "setUsername", "setAuthorities","logOut"]);
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");
    spyTokenService.getAuthorities.and.returnValue(['user']);

    routerSpy = jasmine.createSpyObj(Router, ["navigate"]);

    
    
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
        { provide: Router, useValue: routerSpy },
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(MenuComponent);
      component = fixture.componentInstance;

      tokenService = TestBed.inject(TokenService);
      // Inject the http service and test controller for each test
      httpTestingController = TestBed.inject(HttpTestingController);
      activatedRoute = TestBed.inject(ActivatedRoute);
      router = TestBed.inject(Router);
      location = TestBed.inject(Location);

    });
  });

  afterEach(() => {
    fixture = null;
    component = null;
    tokenService = null;
  });

  it('should create', () => {
    spyTokenService.logOut.and.returnValue();
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(component, 'reloadMenu').and.returnValue();
    routerSpy.navigate.and.returnValue(Promise.resolve(''));
    fixture.detectChanges();

    component.ngOnInit()

    fixture.detectChanges();
    expect(component.onLogout).toBeTruthy();
  });

  it('should logOut', fakeAsync(() => {
    spyTokenService.logOut.and.returnValue();
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(component, 'reloadMenu').and.returnValue();
    routerSpy.navigate.and.returnValue(Promise.resolve(''));
    fixture.detectChanges();

    component.ngOnInit()

    fixture.detectChanges();
    component.onLogout();
    expect(component.onLogout).toBeTruthy();
  }));

})
