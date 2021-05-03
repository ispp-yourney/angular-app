import { ComponentFixture,  fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { Comment } from '../../../models/comment';
import { routes } from "../../../app-routing.module";
import { ReactiveFormsModule, FormsModule, FormBuilder } from "@angular/forms";
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { ShowUser } from 'src/app/models/show-user';
import { ImageService } from 'src/app/services/image.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ItineraryViewComponent } from './itineraryview.component';
import { MenuComponent } from '../../menu/menu.component';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { FooterComponent } from '../../footer/footer.component';
import { Activity, Author, Landmark } from 'src/app/models/itinerary';
import { CommentformComponent } from '../../comment/commentform/commentform.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


const createDate: Date = new Date("2021-01-01T00:00:01");
const image = {
  "id": 11,
  "name": "imagenTeatroChinoDeGrauman",
  "imageUrl": "https://images2.minutemediacdn.com/image/upload/c_crop,h_1191,w_2121,x_0,y_160/v1554925523/shape/mentalfloss/21817-istock-515672264.jpg?itok=AYt9udYR"
}
const author: Author = {
  "id": 2,
  "username": "alejandro1cortes",
  "email": "alejandro1cortes@gmail.com",
  "firstName": "Alejandra",
  "lastName": "Cortés Gómez",
  "expirationDate": null,
  "plan": 0,
  "roles": [
    {
      "id": 2,
      "name": "ROLE_USER"
    }
  ],
  "image": {
    "id": 87,
    "name": "Jes",
    "imageUrl": "http://res.cloudinary.com/duriegi68/image/upload/v1618420215/x31d5h5vcptt0etbyj3a.jpg"
  },
  "imageUrl": "http://res.cloudinary.com/duriegi68/image/upload/v1618420215/x31d5h5vcptt0etbyj3a.jpg"
}

const endPromotionDate = new Date("2021-08-01T00:00:01");
const landmark1: Landmark = {
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
const landmark2: Landmark = {
  "id": 2,
  "name": "Chinatown",
  "description": "ES uno de los barrios más típicos de la ciudad, donde se encuentra Olvera Street, la calle más antigua de Los Ángeles.",
  "price": 0,
  "country": "Estados Unidos",
  "city": "Los Ángeles",
  "latitude": 34.062680686248186,
  "longitude": -118.23735015248829,
  "category": "Barrio",
  "email": null,
  "phone": null,
  "website": null,
  "instagram": null,
  "twitter": null,
  "endPromotionDate": endPromotionDate,
  "createDate": createDate,
  "views": 44,
  "image": {
    "id": 12,
    "name": "imagenChinatown",
    "imageUrl": "https://globalcomment.com/wp-content/uploads/2017/04/800px-Chinatown_gate_Los_Angeles.jpg"
  },
}
const comments: Array<Comment> = [
  {
    "id": 1,
    "content": "Es un plan de vacaciones muy completo y que comprende los lugares más emblemáticos de la ciudad. Muy buenas actividades propuestas para cada día y muy bien organizado el viaje.",
    "rating": 4,
    "createDate": createDate,
    "author": {
      "id": 4,
      "username": "ana3tirado",
      "email": "ana3tirado@hotmail.com",
      "firstName": "Ana",
      "lastName": "Tirado Sánchez",
      "expirationDate": null,
      "plan": 0,
      "roles": [
        {
          "id": 2,
          "name": "ROLE_USER"
        }
      ],
      "image": {
        "id": 82,
        "name": "ana3tiradoPicture",
        "imageUrl": "https://3.bp.blogspot.com/-di61N-stVVg/WoGXhO14ZRI/AAAAAAAASjs/P3l9xdxX-TI5deqWkB78xo5DZm6AUT0ygCLcBGAs/s1600/insWilliams7.jpg"
      },
      "imageUrl": "https://3.bp.blogspot.com/-di61N-stVVg/WoGXhO14ZRI/AAAAAAAASjs/P3l9xdxX-TI5deqWkB78xo5DZm6AUT0ygCLcBGAs/s1600/insWilliams7.jpg"
    },
    "itinerary": 1
  },
  {
    "id": 2,
    "content": "Es un itinerario correcto pero me parece mal que no se visite el Paseo de la Fama, ya que es de lo más importante de la ciudad.",
    "rating": 3,
    "createDate": createDate,
    "author": {
      "id": 3,
      "username": "lidia2lopez",
      "email": "lidia2lopez@gmail.com",
      "firstName": "Lidia",
      "lastName": "López García",
      "expirationDate": null,
      "plan": 1,
      "roles": [
        {
          "id": 2,
          "name": "ROLE_USER"
        }
      ],
      "image": {
        "id": 81,
        "name": "lidia2lopezPicture",
        "imageUrl": "https://media.gq.com.mx/photos/5c9e87ab7499251a3d14ce86/16:9/w_1920,c_limit/Tatiana.jpg"
      },
      "imageUrl": "https://media.gq.com.mx/photos/5c9e87ab7499251a3d14ce86/16:9/w_1920,c_limit/Tatiana.jpg"
    },
    "itinerary": 1
  }
]

const activities: Array<Activity> = [
  {
    "id": 1,
    "title": "Hollywood",
    "description": "El primer día de nuestro itinerario podemos visitar un lugar conocido en todo el planeta, especialmente por el mundo del cine. Hablamos del glamuroso Hollywood. Os recomiendo que no perdais la magnífica oportunidad de visitar el paseo de la fama y el Teatro Chino de Grauman.",
    "day": 1,
    "createDate": createDate,
    "landmark": landmark1
  },
  {
    "id": 2,
    "title": "Chinatown",
    "description": "El barrio de Chinatown es famoso en todo el mundo por su especial y único encanto. Merece la pena realizar una visita para disfrutar plenamente de sus calles.",
    "day": 2,
    "createDate": createDate,
    "landmark": landmark2
  }]
let itineraryInput = {
  "views": 43,
  "status": "PUBLISHED",
  "description": "Situada en la coste oeste de los Estados Unidos, Los Ángeles es una ciudad de gran atractivo turístico. En este itinerario, os llevaré por algunos de los lugares más interesantes de esta gran ciudad, desde la playa de Venice hasta Hollywood, pasando por el Observatorio Griffith y el distrito comercial.",
  "budget": 1400,
  "imageUrl": "https://storage.googleapis.com/md-media-cl/2019/04/promociones-aereas-los-angeles-capa2019-01.jpg",
  "avgRating": 3,
  "username": "alejandro1cortes",
  "name": "Una semana en Los Ángeles",
  "id": 1,

  "estimatedDays": 3, "createDate": createDate, "image": image, "recommendedSeason": "WINTER",
  "calcPlan": 0, "calcPromotion": 0,
  "activities": activities, "author": author, "comments": comments
}

let component: ItineraryViewComponent;
let fixture: ComponentFixture<ItineraryViewComponent>;

let authService: AuthService;
let tokenService: TokenService;
let itineraryService:ItineraryService

let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;
let spyTokenService;

describe('ItineraryView', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: id => { return '1' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername","getAuthorities","logOut"]);
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");
    
    spyTokenService.logOut.and.returnValue();

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule,
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        ItineraryViewComponent,
        MenuComponent,
        FooterComponent,
        CommentformComponent
      ],
      schemas:[NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        AuthService, ItineraryService
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ItineraryViewComponent);
      component = fixture.componentInstance;

      // Returns a service with the MockBackend so we can test with dummy responses
      authService = TestBed.inject(AuthService);
      //spyAuthService.showUser.and.returnValue(showUser);
      tokenService = TestBed.inject(TokenService);
      itineraryService = TestBed.inject(ItineraryService);

      // Inject the http service and test controller for each test
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
    itineraryService = null;
    router=null;
  });

  it('should use loadItinerary with authorities', () => {
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService,'vista').and.returnValue(of(itineraryInput))
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.isAdmin).toEqual(true)
  });

  it('should use loadItinerary without authorities ', () => {
    spyTokenService.getAuthorities.and.returnValue([]);
    spyOn(itineraryService,'vista').and.returnValue(of(itineraryInput))
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.isAdmin).toEqual(false)
  });

  it('should fail to use loadItinerary ', () => {
    spyTokenService.getAuthorities.and.returnValue([]);
    spyOn(itineraryService,'vista').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.isAdmin).toEqual(false)
  });

  it('should fail to use loadItinerary with undefined error', () => {
    spyTokenService.getAuthorities.and.returnValue([]);
    spyOn(itineraryService,'vista').and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.isAdmin).toEqual(false)
  });

  it('should use getSeason function', () => {
    let seasons=['WINTER','SUMMER','FALL','SPRING','ANYTIME']
    expect(component.getSeason).toBeTruthy()
    for (let index = 0; index<seasons.length; index++) {
      component.getSeason(seasons[index])
    }
  });

  it('should use deleteItinerary ', () => {
    spyTokenService.getAuthorities.and.returnValue([]);
    spyOn(itineraryService,'vista').and.returnValue(of(itineraryInput))
    spyOn(itineraryService,'delete').and.returnValue(of('Itinerario eliminado correctamente'))
    fixture.detectChanges();
    component.loadItinerary()
    component.deleteItinerary()
    expect(component.isAdmin).toEqual(false)
  });

  it('should fail to use deleteItinerary ', () => {
    spyTokenService.getAuthorities.and.returnValue([]);
    spyOn(itineraryService,'vista').and.returnValue(of(itineraryInput))
    spyOn(itineraryService,'delete').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))
    fixture.detectChanges();
    component.loadItinerary()
    component.deleteItinerary()
    expect(component.isAdmin).toEqual(false)
  });

  it('should fail to use deleteItinerary with undefined error', () => {
    spyTokenService.getAuthorities.and.returnValue([]);
    spyOn(itineraryService,'vista').and.returnValue(of(itineraryInput))
    spyOn(itineraryService,'delete').and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    fixture.detectChanges();
    component.loadItinerary()
    component.deleteItinerary()
    expect(component.isAdmin).toEqual(false)
  });

})

