import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommentformComponent } from './commentform.component';
import { MenuComponent } from '../../menu/menu.component';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { Comment } from '../../../models/comment';
import { NgxSliderModule, Options } from "@angular-slider/ngx-slider";


import { routes } from "../../../app-routing.module";
import { ReactiveFormsModule, FormsModule, FormBuilder } from "@angular/forms";
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { ShowUser } from 'src/app/models/show-user';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { Activity, Author, Landmark } from 'src/app/models/itinerary';
import { CommentService } from 'src/app/services/comment.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ItineraryViewComponent } from '../../itinerary/itineraryshow/itineraryview.component';



let component: CommentformComponent;
let fixture: ComponentFixture<CommentformComponent>;

let authService: AuthService;
let tokenService: TokenService;
let itineraryService: ItineraryService;
let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;
let showUserPlan0: ShowUser = new ShowUser("testUser", "testPassword", "John", "Doe", "user@test.com", null, 0);
let showUserPlan1: ShowUser = new ShowUser("testUser", "testPassword", "John", "Doe", "user@test.com", null, 1);
let spyTokenService;
let spyCommentService;

let routerSpy;
let formBuilder: FormBuilder;

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
  "lastName": "Cort??s G??mez",
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
  "description": "Famoso teatro que se ecuentra en Hollywood Boulevard. Grandes celebridades asisten a los estrenos que all?? se realizan.",
  "price": 21.75,
  "country": "Estados Unidos",
  "city": "Los ??ngeles",
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
  "description": "ES uno de los barrios m??s t??picos de la ciudad, donde se encuentra Olvera Street, la calle m??s antigua de Los ??ngeles.",
  "price": 0,
  "country": "Estados Unidos",
  "city": "Los ??ngeles",
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
    "content": "Es un plan de vacaciones muy completo y que comprende los lugares m??s emblem??ticos de la ciudad. Muy buenas actividades propuestas para cada d??a y muy bien organizado el viaje.",
    "rating": 4,
    "createDate": createDate,
    "author": {
      "id": 4,
      "username": "ana3tirado",
      "email": "ana3tirado@hotmail.com",
      "firstName": "Ana",
      "lastName": "Tirado S??nchez",
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
    "content": "Es un itinerario correcto pero me parece mal que no se visite el Paseo de la Fama, ya que es de lo m??s importante de la ciudad.",
    "rating": 3,
    "createDate": createDate,
    "author": {
      "id": 3,
      "username": "lidia2lopez",
      "email": "lidia2lopez@gmail.com",
      "firstName": "Lidia",
      "lastName": "L??pez Garc??a",
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
    "description": "El primer d??a de nuestro itinerario podemos visitar un lugar conocido en todo el planeta, especialmente por el mundo del cine. Hablamos del glamuroso Hollywood. Os recomiendo que no perdais la magn??fica oportunidad de visitar el paseo de la fama y el Teatro Chino de Grauman.",
    "day": 1,
    "createDate": createDate,
    "landmark": landmark1
  },
  {
    "id": 2,
    "title": "Chinatown",
    "description": "El barrio de Chinatown es famoso en todo el mundo por su especial y ??nico encanto. Merece la pena realizar una visita para disfrutar plenamente de sus calles.",
    "day": 2,
    "createDate": createDate,
    "landmark": landmark2
  }]
let itineraryInput = {
  "views": 43,
  "status": "PUBLISHED",
  "description": "Situada en la coste oeste de los Estados Unidos, Los ??ngeles es una ciudad de gran atractivo tur??stico. En este itinerario, os llevar?? por algunos de los lugares m??s interesantes de esta gran ciudad, desde la playa de Venice hasta Hollywood, pasando por el Observatorio Griffith y el distrito comercial.",
  "budget": 1400,
  "imageUrl": "https://storage.googleapis.com/md-media-cl/2019/04/promociones-aereas-los-angeles-capa2019-01.jpg",
  "avgRating": 3,
  "username": "alejandro1cortes",
  "name": "Una semana en Los ??ngeles",
  "id": 1,

  "estimatedDays": 3, "createDate": createDate, "image": image, "recommendedSeason": "WINTER",
  "calcPlan": 0, "calcPromotion": 0,
  "activities": activities, "author": author, "comments": comments
}


describe('Commentform', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername","getAuthorities"]);
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);

    spyCommentService = jasmine.createSpyObj(CommentService, ["nuevo", "borrar"]);
    routerSpy = jasmine.createSpyObj(Router, ["navigate"]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule, 
        NgxSliderModule,
        NoopAnimationsModule,
        ToastrModule.forRoot()

      ],
      declarations: [
        CommentformComponent,
        MenuComponent,
        ItineraryViewComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        { provide: CommentService, useValue: spyCommentService },
        { provide: Router, useValue: routerSpy },
        AuthService, ItineraryService
        //Options
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(CommentformComponent);
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
      formBuilder = TestBed.inject(FormBuilder);

    });
  });

  afterEach(() => {
    fixture = null;
    component = null;
    authService = null;
    tokenService = null;
    itineraryService=null;
  });

  it('should use loadLandmark without any authorities', fakeAsync(() => {
    component.itinerary = itineraryInput
    spyTokenService.getAuthorities.and.returnValue([
      
    ]);
    expect(component.ngOnInit).toBeTruthy()

    component.ngOnInit()
    fixture.detectChanges();
  }));

  it('should loadComments from ngOnInit', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    component.itinerary = itineraryInput
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.isLogged).toEqual(true)
  });

  it('should loadComments from ngOnInit but not logged', () => {
    component.itinerary = itineraryInput
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.isLogged).toEqual(false)
  });

  it('should use showComments', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    component.itinerary = itineraryInput
    fixture.detectChanges();
    component.ngOnInit()
    component.showComments()
    expect(component.clickComments).toEqual(true)
    expect(component.display).toEqual('block')
  });

  it('should use onCreate', fakeAsync(() => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(component, 'reloadCommentsPage').and.returnValue();
    spyCommentService.nuevo.and.returnValue(of('Comentario creado'));
    routerSpy.navigate.and.returnValue(Promise.resolve(''));
    component.itinerary = itineraryInput
    fixture.detectChanges();
    component.ngOnInit()
    component.onCreate()
    tick()
    fixture.detectChanges();
    expect(component.comment.content).toEqual('')
    flush()
  }));

  it('should fail to use onCreate', fakeAsync(() => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(component, 'reloadCommentsPage').and.returnValue();
    spyCommentService.nuevo.and.returnValue(throwError({
      status: 404,
      error: {
        textError: 'Error'
      }
    }));
    routerSpy.navigate.and.returnValue(Promise.resolve(''));
    component.itinerary = itineraryInput
    fixture.detectChanges();
    component.ngOnInit()
    component.onCreate()
    tick()
    fixture.detectChanges();
    expect(component.comment.content).toEqual('')
    flush()
  }));


  it('should use removeComment', fakeAsync(() => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(component, 'reloadCommentsPage').and.returnValue();
    spyCommentService.borrar.and.returnValue(of('Comentario borrado'));
    routerSpy.navigate.and.returnValue(Promise.resolve(''));
    component.itinerary = itineraryInput
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.removeComment).toBeTruthy();
    component.removeComment(1)
    tick()
    fixture.detectChanges();
    flush()
  }));

  it('should fail to use onCreate', fakeAsync(() => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    spyOn(component, 'reloadCommentsPage').and.returnValue();
    spyCommentService.borrar.and.returnValue(throwError({
      status: 404,
      error: {
        textError: 'Error'
      }
    }));
    component.itinerary = itineraryInput
    fixture.detectChanges();
    component.ngOnInit()
    expect(component.removeComment).toBeTruthy();
    component.removeComment(1)
    tick()
    fixture.detectChanges();
    flush()
  }));
})
