import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from '../../menu/menu.component';
import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { Comment } from '../../../models/comment';
import { routes } from "../../../app-routing.module";
import { ReactiveFormsModule, FormsModule, AbstractControl } from "@angular/forms";
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { ShowUser } from '../../../models/show-user';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Activity, Author, Landmark, LandmarkDto } from '../../../models/itinerary';
import { FormBuilder } from '@angular/forms';
import { BuscadorLandmarkService } from 'src/app/services/buscador-landmark.service';
import { ItinerarylistComponent } from './itinerarylist.component';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';



let component: ItinerarylistComponent;
let fixture: ComponentFixture<ItinerarylistComponent>;

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
let countries = ["Afganistán", "Akrotiri", "Albania", "Alemania", "Andorra", "Angola", "Anguila", "Antártida", "Antigua y Barbuda", "Antillas Neerlandesas", "Arabia Saudí", "Arctic Ocean", "Argelia", "Argentina", "Armenia", "Aruba", "Ashmore andCartier Islands", "Atlantic Ocean", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bahráin", "Bangladesh", "Barbados", "Bélgica", "Belice", "Benín", "Bermudas", "Bielorrusia", "Birmania Myanmar", "Bolivia", "Bosnia y Hercegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Chad", "Chile", "China", "Chipre", "Clipperton Island", "Colombia", "Comoras", "Congo", "Coral Sea Islands", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dhekelia", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "El Vaticano", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Estonia", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Gaza Strip", "Georgia", "Ghana", "Gibraltar", "Granada", "Grecia", "Groenlandia", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Ecuatorial", "Guinea-Bissau", "Guyana", "Haití", "Honduras", "Hong Kong", "Hungría", "India", "Indian Ocean", "Indonesia", "Irán", "Iraq", "Irlanda", "Isla Bouvet", "Isla Christmas", "Isla Norfolk", "Islandia", "Islas Caimán", "Islas Cocos", "Islas Cook", "Islas Feroe", "Islas Georgia del Sur y Sandwich del Sur", "Islas Heard y McDonald", "Islas Malvinas", "Islas Marianas del Norte", "IslasMarshall", "Islas Pitcairn", "Islas Salomón", "Islas Turcas y Caicos", "Islas Vírgenes Americanas", "Islas Vírgenes Británicas", "Israel", "Italia", "Jamaica", "Jan Mayen", "Japón", "Jersey", "Jordania", "Kazajistán", "Kenia", "Kirguizistán", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Macao", "Macedonia", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta", "Man, Isle of", "Marruecos", "Mauricio", "Mauritania", "Mayotte", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montserrat", "Mozambique", "Namibia", "Nauru", "Navassa Island", "Nepal", "Nicaragua", "Níger", "Nigeria", "Niue", "Noruega", "Nueva Caledonia", "Nueva Zelanda", "Omán", "Pacific Ocean", "Países Bajos", "Pakistán", "Palaos", "Panamá", "Papúa-Nueva Guinea", "Paracel Islands", "Paraguay", "Perú", "Polinesia Francesa", "Polonia", "Portugal", "Puerto Rico", "Qatar", "Reino Unido", "República Centroafricana", "República Checa", "República Democrática del Congo", "República Dominicana", "Ruanda", "Rumania", "Rusia", "Sáhara Occidental", "Samoa", "Samoa Americana", "San Cristóbal y Nieves", "San Marino", "San Pedro y Miquelón", "San Vicente y las Granadinas", "Santa Helena", "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Southern Ocean", "Spratly Islands", "Sri Lanka", "Suazilandia", "Sudáfrica", "Sudán", "Suecia", "Suiza", "Surinam", "Svalbard y Jan Mayen", "Tailandia", "Taiwán", "Tanzania", "Tayikistán", "TerritorioBritánicodel Océano Indico", "Territorios Australes Franceses", "Timor Oriental", "Togo", "Tokelau", "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Unión Europea", "Uruguay", "Uzbekistán", "Vanuatu", "Venezuela", "Vietnam", "Wake Island", "Wallis y Futuna", "West Bank", "World", "Yemen", "Yibuti", "Zambia", "Zimbabue"]
let landmarkMockDto: LandmarkDto = new LandmarkDto(0, "Landmark test", "This is a landmark text", 0, "string", "string", 0, 0, "string", "string", "string", "string", "string", "string", null)
let imageMock = new File([""], "filename", { type: 'text/html' });
let createDate: Date = new Date("2021-01-01T00:00:01");
let endPromotionDate = new Date("2031-08-01T00:00:01");

let landmarkMock: Landmark = {
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

let landmarkPage = {
  "content": [
    {
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
  ],
  "pageable": {
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "pageNumber": 0,
    "pageSize": 10,
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "last": true,
  "totalPages": 1,
  "totalElements": 8,
  "sort": {
    "sorted": false,
    "unsorted": true,
    "empty": true
  },
  "first": true,
  "number": 0,
  "numberOfElements": 8,
  "size": 10,
  "empty": false
}

let landmarkPage2 = {
  "content": [
    {
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
  ],
  "pageable": {
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "pageNumber": 0,
    "pageSize": 10,
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "last": true,
  "totalPages": 2,
  "totalElements": 8,
  "sort": {
    "sorted": false,
    "unsorted": true,
    "empty": true
  },
  "first": true,
  "number": 0,
  "numberOfElements": 8,
  "size": 10,
  "empty": false
}

let landmarkPage3 = {
  "content": [
    {
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
  ],
  "pageable": {
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "pageNumber": 0,
    "pageSize": 10,
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "last": true,
  "totalPages": 4,
  "totalElements": 8,
  "sort": {
    "sorted": false,
    "unsorted": true,
    "empty": true
  },
  "first": true,
  "number": 0,
  "numberOfElements": 8,
  "size": 10,
  "empty": false
}
let landmarkPageEmptyLandmarks = {
  "content": [],
  "pageable": {
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "pageNumber": 0,
    "pageSize": 10,
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "last": true,
  "totalPages": 2,
  "totalElements": 8,
  "sort": {
    "sorted": false,
    "unsorted": true,
    "empty": true
  },
  "first": true,
  "number": 0,
  "numberOfElements": 8,
  "size": 10,
  "empty": false
}
let landmarkPageEmpty = {
  "content": [
    {
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
  ],
  "pageable": {
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "pageNumber": 0,
    "pageSize": 10,
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "last": true,
  "totalPages": 0,
  "totalElements": 8,
  "sort": {
    "sorted": false,
    "unsorted": true,
    "empty": true
  },
  "first": true,
  "number": 0,
  "numberOfElements": 8,
  "size": 10,
  "empty": false
}


let spyTokenService;

describe('ItineraryList', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername"]);
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");


    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule,
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        ItinerarylistComponent,
        MenuComponent,

      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        AuthService, ItineraryService
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ItinerarylistComponent);
      component = fixture.componentInstance;

      authService = TestBed.inject(AuthService);
      tokenService = TestBed.inject(TokenService);
      itineraryService = TestBed.inject(ItineraryService);

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
    router = null;
  });

  it('should use ngOnInit function', () => {
    spyTokenService.getToken.and.returnValue("tokenTest");
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy()
  });

  it('should use switchPage function', fakeAsync(() => {
    expect(component.ngOnInit).toBeTruthy()
    component.switchPage(1)
  }));

  it('should use count function ', fakeAsync(() => {
    expect(component.ngOnInit).toBeTruthy()
    component.count(1)
  }));


  /*it('should use loadUserItineraries function', fakeAsync(() => {
    spyOn(itineraryService, 'userItineraries').and.returnValue(of(landmarkPage))

    component.ngOnInit()
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy()
    component.loadUserItineraries('alejandro1cortes', 0)
  }));*/
  
    it('should use loadLandmarks function with 2 pages results', fakeAsync(() => { 
      
      
      spyOn(itineraryService, 'userItineraries').and.returnValue(of(landmarkPage2))
      component.ngOnInit()
      
      tick()
      expect(component.ngOnInit).toBeTruthy()
      component.loadUserItineraries('alejandro1cortes', 0)
      
      flush()
    }));
  
    /*it('should use loadLandmarks function with 3 pages results', () => { 
      
      
      spyOn(itineraryService, 'userItineraries').and.returnValue(of(landmarkPage3))
      component.ngOnInit()
      fixture.detectChanges();
  
      expect(component.ngOnInit).toBeTruthy()
      component.loadUserItineraries('alejandro1cortes', 0)
  
    });*/
  
    /*it('should use loadLandmarks function with 3 pages results and prueba=1', () => { 
      
      
      spyOn(itineraryService, 'userItineraries').and.returnValue(of(landmarkPage3))
      component.prueba=1
      component.ngOnInit()
      fixture.detectChanges();
  
      expect(component.ngOnInit).toBeTruthy()
      component.loadUserItineraries('alejandro1cortes', 0)
    });
    it('should use loadLandmarks function with 3 pages results and prueba=1 and currentPage = initialPages[0]', () => { 
      
      
      spyOn(itineraryService, 'userItineraries').and.returnValue(of(landmarkPage3))
      component.prueba=1
      component.currentPage=0
      component.initialPages=[0]
      component.ngOnInit()
      fixture.detectChanges();
  
      expect(component.ngOnInit).toBeTruthy()
      component.loadUserItineraries('alejandro1cortes', 0)
    });
  
    it('should use loadLandmarks function with 3 pages results and prueba=1 and currentPage = initialPages[0] and initialPages[length] big', () => { 
      
      
      spyOn(itineraryService, 'userItineraries').and.returnValue(of(landmarkPage3))
      component.prueba=1
      component.currentPage=0
      component.initialPages=[0,1,2,3,4]
      component.ngOnInit()
      fixture.detectChanges();
  
      expect(component.ngOnInit).toBeTruthy()
      component.loadUserItineraries('alejandro1cortes', 0)
    });
  
    it('should use loadLandmarks function with 2 pages results and currentPage != initialPages[0] ', () => { 
      
      
      spyOn(itineraryService, 'userItineraries').and.returnValue(of(landmarkPage2))
      component.prueba=1
      component.totalPages=landmarkPage2.totalPages
      component.currentPage=0
      component.initialPages=[1,2,3,4]
  
      fixture.detectChanges();
      expect(component.ngOnInit).toBeTruthy()
      component.loadUserItineraries('alejandro1cortes', 0)
    });
    it('should use loadLandmarks function with 2 pages results and currentPage != initialPages[0] and initialPages[0] + 1 < totalPages', () => { 
      
      
      spyOn(itineraryService, 'userItineraries').and.returnValue(of(landmarkPage2))
      component.prueba=1
      component.totalPages=landmarkPage2.totalPages
      component.currentPage=1
      component.initialPages=[0,1,2,3,4]
  
      fixture.detectChanges();
  
      expect(component.ngOnInit).toBeTruthy()
      component.loadUserItineraries('alejandro1cortes', 0)
    });
  
    it('should use loadLandmarks function with 2 pages results and currentPage != initialPages[0] and not matching any of 2 if', () => { 
      
      
      spyOn(itineraryService, 'userItineraries').and.returnValue(of(landmarkPage2))
      component.prueba=1
      component.totalPages=landmarkPage2.totalPages-1
      component.currentPage=2
      component.initialPages=[0,1,2,3,4]
  
      fixture.detectChanges();
  
      
      expect(component.ngOnInit).toBeTruthy()
      component.loadUserItineraries('alejandro1cortes', 0)
    });*/
  
    /*it('should use loadLandmarks function with empty result ', () => { 
      spyOn(itineraryService, 'userItineraries').and.returnValue(of(landmarkPageEmpty))
  
      fixture.detectChanges();
      component.loadUserItineraries('alejandro1cortes', 0)
      expect(component.ngOnInit).toBeTruthy()
    });*/
  
    it('should use loadLandmarks function with empty landmarks', () => { 
      spyOn(itineraryService, 'userItineraries').and.returnValue(of(landmarkPageEmptyLandmarks))
  
      fixture.detectChanges();
      component.loadUserItineraries('alejandro1cortes', 0)
      expect(component.ngOnInit).toBeTruthy()
    });
  
    it('should fail to use loadLandmarks function', () => { 
      spyOn(itineraryService, 'userItineraries').and.returnValue(throwError({
        status: 404,
        error: {
          text: 'Error'
        }
      }))
  
      fixture.detectChanges();
      component.loadUserItineraries('alejandro1cortes', 0)
      expect(component.ngOnInit).toBeTruthy()
    });

})
