import { ComponentFixture,  discardPeriodicTasks,  fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LandmarkShowComponent } from './landmark-show.component';
import { MenuComponent } from '../../menu/menu.component';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";


import { routes } from "../../../app-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Location } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { ShowUser } from 'src/app/models/show-user';
import { LandmarkService } from 'src/app/services/landmark.service';
import { Landmark, LandmarkDto } from 'src/app/models/itinerary';
import { FormBuilder } from '@angular/forms';
import { HereMapComponent } from '../../here-map/here-map.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';



let component: LandmarkShowComponent;
let fixture: ComponentFixture<LandmarkShowComponent>;

let authService: AuthService;
let tokenService: TokenService;
let landmarkService: LandmarkService;


let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;
let createDate: Date = new Date("2021-01-01T00:00:01");
let endPromotionDate = new Date("2031-08-01T00:00:01");
let endPromotionDatePast = new Date("2010-08-01T00:00:01");

let landmarkMock1: Landmark = {
  "id": 1,
  "name": "Teatro Chino de Grauman",
  "description": "Famoso teatro que se ecuentra en Hollywood Boulevard. Grandes celebridades asisten a los estrenos que allí se realizan.",
  "price": 21.75,
  "country": "Estados Unidos",
  "city": "Los Ángeles",
  "latitude": 34.1022362941919,
  "longitude": -118.34090682908928,
  "category": "Cine",
  "email": "info@chinesetheatres.com",
  "phone": "+(01) 323464514",
  "website": "http://www.tclchinesetheatres.com/",
  "instagram": null,
  "twitter": null,
  "endPromotionDate": endPromotionDate,
  "createDate": createDate,
  "views": 44,
  "image": {
    "id": 11,
    "name": "imagenTeatroChinoDeGrauman",
    "imageUrl": "https://images2.minutemediacdn.com/image/upload/c_crop,h_1191,w_2121,x_0,y_160/v1554925523/shape/mentalfloss/21817-istock-515672264.jpg?itok=AYt9udYR"
  },
}
let landmarkMock2: Landmark = {
  "id": 1,
  "name": "Teatro Chino de Grauman",
  "description": "Famoso teatro que se ecuentra en Hollywood Boulevard. Grandes celebridades asisten a los estrenos que allí se realizan.",
  "price": 21.75,
  "country": "Estados Unidos",
  "city": "Los Ángeles",
  "latitude": 34.1022362941919,
  "longitude": -118.34090682908928,
  "category": "Cine",
  "email": "info@chinesetheatres.com",
  "phone": "+(01) 323464514",
  "website": "http://www.tclchinesetheatres.com/",
  "instagram": null,
  "twitter": null,
  "endPromotionDate": endPromotionDatePast,
  "createDate": createDate,
  "views": 44,
  "image": {
    "id": 11,
    "name": "imagenTeatroChinoDeGrauman",
    "imageUrl": "https://images2.minutemediacdn.com/image/upload/c_crop,h_1191,w_2121,x_0,y_160/v1554925523/shape/mentalfloss/21817-istock-515672264.jpg?itok=AYt9udYR"
  },
}
let showUserPlan0: ShowUser = new ShowUser("testUser", "testPassword", "John", "Doe", "user@test.com", null, 0);
let showUserPlan1: ShowUser = new ShowUser("testUser", "testPassword", "John", "Doe", "user@test.com", null, 1);
let landmarkMockDto:LandmarkDto = new LandmarkDto(0, "Landmark test", "This is a landmark text", 0, "string", "string", 0, 0, "string", "string", "string", "string", "string", "string", null)

let formBuilder:FormBuilder = new FormBuilder();
let formMock = formBuilder.group({
  text: ['']
});

let spyTokenService;
let spyLandmarkService;
let routerSpy;

describe('LandmarkCreate', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: id => { return '1' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername","getAuthorities"]);
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);

    spyLandmarkService = jasmine.createSpyObj(LandmarkService, ["nuevo","mostrar","tieneActividades"]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule,
      ],
      declarations: [
        LandmarkShowComponent,
        MenuComponent,
      ],
      schemas:[NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        AuthService, LandmarkService
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LandmarkShowComponent);
      component = fixture.componentInstance;

      authService = TestBed.inject(AuthService);
      tokenService = TestBed.inject(TokenService);
      landmarkService = TestBed.inject(LandmarkService);

      httpTestingController = TestBed.inject(HttpTestingController);
      activatedRoute = TestBed.inject(ActivatedRoute);
      router = TestBed.inject(Router);
      location = TestBed.inject(Location);

      router.initialNavigation();
    });
  });

  afterEach(() => {
    fixture = null;
    component = null;
    authService = null;
    tokenService = null;
    landmarkService = null;
  });

  it('should use onInit', fakeAsync(() => {
    const landmarkObservable: Observable<Landmark> = of(landmarkMock1);
    //spyLandmarkService.mostrar.and.returnValue(landmarkObservable)
    spyOn(landmarkService,"mostrar").and.returnValue(landmarkObservable)
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    tick()
    fixture.detectChanges();
  }));

  it('should use loadLandmark without being admin', fakeAsync(() => {
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_USER"
      }
    ]);
    expect(component.ngOnInit).toBeTruthy()
    const landmarkObservable: Observable<Landmark> = of(landmarkMock1);
    spyOn(landmarkService,"mostrar").and.returnValue(landmarkObservable)
    component.ngOnInit()
    fixture.detectChanges();
  }));

  it('should use loadLandmark', fakeAsync(() => {
    const landmarkObservable: Observable<Landmark> = of(landmarkMock1);
    //spyLandmarkService.mostrar.and.returnValue(landmarkObservable)
    tick()
    spyOn(landmarkService,"mostrar").and.returnValue(landmarkObservable)
    expect(component.loadLandmark).toBeTruthy()
    component.loadLandmark()
    tick()
    fixture.detectChanges();
  }));

  it('should use loadLandmark with sponsor date', fakeAsync(() => {
    const landmarkObservable: Observable<Landmark> = of(landmarkMock2);
    //spyLandmarkService.mostrar.and.returnValue(landmarkObservable)
    tick()
    spyOn(landmarkService,"mostrar").and.returnValue(landmarkObservable)
    spyOn(landmarkService,"tieneActividades").and.returnValue(of(true))
    expect(component.loadLandmark).toBeTruthy()
    component.loadLandmark()
    tick()
    fixture.detectChanges();
  }));

  it('should use loadLandmark with error', fakeAsync(() => {
    spyOn(landmarkService,"mostrar").and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))
    spyOn(landmarkService,"tieneActividades").and.returnValue(of(true))
    expect(component.loadLandmark).toBeTruthy()
    component.loadLandmark()
    tick()
    fixture.detectChanges();
  }));

  it('should use loadLandmark with undefined error', fakeAsync(() => {
    spyOn(landmarkService,"mostrar").and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    spyOn(landmarkService,"tieneActividades").and.returnValue(of(true))
    expect(component.loadLandmark).toBeTruthy()
    component.loadLandmark()
    tick()
    fixture.detectChanges();
  }));

  it('should use upgradeLandmark', fakeAsync(() => {
    spyOn(landmarkService,"upgradeLandmark").and.returnValue(of(''))
    spyOn(component, 'hrefWindowLocation').and.returnValue();
    expect(component.upgradeLandmark).toBeTruthy()
    component.landmark=landmarkMock1
    component.upgradeLandmark()
    tick()
    fixture.detectChanges();
  }));

  it('should use upgradeLandmark with error', fakeAsync(() => {
    spyOn(landmarkService,"upgradeLandmark").and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    expect(component.upgradeLandmark).toBeTruthy()
    component.landmark=landmarkMock1
    component.upgradeLandmark()
    fixture.detectChanges();
  }));

  it('should use onUpdate', fakeAsync(() => {
    spyOn(landmarkService,"editar").and.returnValue(of('text'))
    expect(component.upgradeLandmark).toBeTruthy()
    component.landmark=landmarkMock1
    component.ngOnInit()
    component.onUpdate()
    tick()
    fixture.detectChanges();
  }));

  it('should use onUpdate with error', fakeAsync(() => {
    spyOn(landmarkService,"editar").and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    expect(component.upgradeLandmark).toBeTruthy()
    component.landmark=landmarkMock1
    component.ngOnInit()
    component.onUpdate()
    tick()
    fixture.detectChanges();
  }));

    it('should use onDelete', fakeAsync(() => {
    spyOn(landmarkService,"deleteLandmark").and.returnValue(of('text'))
    expect(component.upgradeLandmark).toBeTruthy()
    component.landmark=landmarkMock1
    component.ngOnInit()
    component.onDelete()
    tick()
    
    fixture.detectChanges();
  }));

  it('should use onDelete with errors', fakeAsync(() => {
    spyOn(landmarkService,"deleteLandmark").and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    expect(component.upgradeLandmark).toBeTruthy()
    component.landmark=landmarkMock1
    component.ngOnInit()
    component.onDelete()
    tick()
    fixture.detectChanges();
  }));
})
