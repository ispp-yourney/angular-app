import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from '../menu/menu.component';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { Location } from '@angular/common';
import { IndexComponent } from './index.component';
import { FooterComponent } from '../footer/footer.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';


let component: IndexComponent;
let fixture: ComponentFixture<IndexComponent>;

let tokenService: TokenService;
let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;

let spyTokenService;



describe('Index', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername", "getAuthorities", "setToken", "setUsername", "setAuthorities", "logOut"]);
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
        IndexComponent,
        MenuComponent,
        FooterComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(IndexComponent);
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

  it('should get token', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.isLogged).toEqual(true)
  });

  it('should not get token', () => {
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.isLogged).toEqual(false)
  });

})
