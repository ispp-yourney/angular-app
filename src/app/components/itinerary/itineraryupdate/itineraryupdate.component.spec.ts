import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { Comment } from '../../../models/comment';
import { routes } from "../../../app-routing.module";
import { ReactiveFormsModule, FormsModule, FormBuilder, FormArray, FormControl, Validators, AbstractControl, FormGroup } from "@angular/forms";
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { ShowUser } from '../../../models/show-user';
import { ImageService } from '../../../services/image.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ItineraryupdateComponent } from './itineraryupdate.component';
import { MenuComponent } from '../../menu/menu.component';
import { ItineraryService } from '../../../services/itinerary.service';
import { FooterComponent } from '../../footer/footer.component';
import { Activity, ActivityDto, Author, ItineraryDto, Landmark } from '../../../models/itinerary';
import { CommentformComponent } from '../../comment/commentform/commentform.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivityService } from '../../../services/activity.service';
import { LandmarkService } from '../../../services/landmark.service';
import { CountryService } from '../../../services/country.service';
import { BuscadorLandmarkComponent } from '../../buscador-landmark/buscador-landmark.component';
import { checkRange } from '../../itinerary/itineraryupdate/itineraryupdate.component';



let component: ItineraryupdateComponent;
let fixture: ComponentFixture<ItineraryupdateComponent>;

let authService: AuthService;
let tokenService: TokenService;
let itineraryService: ItineraryService
let activityService: ActivityService
let imageService: ImageService
let landmarkService: LandmarkService
let countryService: CountryService

let httpTestingController: HttpTestingController;
//Stubs
let activatedRoute: ActivatedRoute
let router: Router
let location: Location;
let spyTokenService;
let spyCountryService;

let countries = ["Afganistán", "Akrotiri", "Albania", "Alemania", "Andorra", "Angola", "Anguila", "Antártida", "Antigua y Barbuda", "Antillas Neerlandesas", "Arabia Saudí", "Arctic Ocean", "Argelia", "Argentina", "Armenia", "Aruba", "Ashmore andCartier Islands", "Atlantic Ocean", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bahráin", "Bangladesh", "Barbados", "Bélgica", "Belice", "Benín", "Bermudas", "Bielorrusia", "Birmania Myanmar", "Bolivia", "Bosnia y Hercegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Chad", "Chile", "China", "Chipre", "Clipperton Island", "Colombia", "Comoras", "Congo", "Coral Sea Islands", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dhekelia", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "El Vaticano", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Estonia", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Gaza Strip", "Georgia", "Ghana", "Gibraltar", "Granada", "Grecia", "Groenlandia", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Ecuatorial", "Guinea-Bissau", "Guyana", "Haití", "Honduras", "Hong Kong", "Hungría", "India", "Indian Ocean", "Indonesia", "Irán", "Iraq", "Irlanda", "Isla Bouvet", "Isla Christmas", "Isla Norfolk", "Islandia", "Islas Caimán", "Islas Cocos", "Islas Cook", "Islas Feroe", "Islas Georgia del Sur y Sandwich del Sur", "Islas Heard y McDonald", "Islas Malvinas", "Islas Marianas del Norte", "IslasMarshall", "Islas Pitcairn", "Islas Salomón", "Islas Turcas y Caicos", "Islas Vírgenes Americanas", "Islas Vírgenes Británicas", "Israel", "Italia", "Jamaica", "Jan Mayen", "Japón", "Jersey", "Jordania", "Kazajistán", "Kenia", "Kirguizistán", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Macao", "Macedonia", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta", "Man, Isle of", "Marruecos", "Mauricio", "Mauritania", "Mayotte", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montserrat", "Mozambique", "Namibia", "Nauru", "Navassa Island", "Nepal", "Nicaragua", "Níger", "Nigeria", "Niue", "Noruega", "Nueva Caledonia", "Nueva Zelanda", "Omán", "Pacific Ocean", "Países Bajos", "Pakistán", "Palaos", "Panamá", "Papúa-Nueva Guinea", "Paracel Islands", "Paraguay", "Perú", "Polinesia Francesa", "Polonia", "Portugal", "Puerto Rico", "Qatar", "Reino Unido", "República Centroafricana", "República Checa", "República Democrática del Congo", "República Dominicana", "Ruanda", "Rumania", "Rusia", "Sáhara Occidental", "Samoa", "Samoa Americana", "San Cristóbal y Nieves", "San Marino", "San Pedro y Miquelón", "San Vicente y las Granadinas", "Santa Helena", "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Southern Ocean", "Spratly Islands", "Sri Lanka", "Suazilandia", "Sudáfrica", "Sudán", "Suecia", "Suiza", "Surinam", "Svalbard y Jan Mayen", "Tailandia", "Taiwán", "Tanzania", "Tayikistán", "TerritorioBritánicodel Océano Indico", "Territorios Australes Franceses", "Timor Oriental", "Togo", "Tokelau", "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Unión Europea", "Uruguay", "Uzbekistán", "Vanuatu", "Venezuela", "Vietnam", "Wake Island", "Wallis y Futuna", "West Bank", "World", "Yemen", "Yibuti", "Zambia", "Zimbabue"]
let itineraryMockDto: ItineraryDto = new ItineraryDto(0, "Itinerary test", "Description test", 1, 100, "WINTER", "DRAFT")

let formBuilder: FormBuilder = new FormBuilder();

let formMock = formBuilder.group({
  text: ['']
});

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

let imageMock = new File([""], "filename", { type: 'text/html' });

let activityDto = new ActivityDto(1, "Test Activity", "This is a test activity", 1, 1, 1);

describe('ItineraryUpdate', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: id => { return '1' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername", "getAuthorities", "logOut"]);
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");

    spyTokenService.logOut.and.returnValue();
    spyCountryService = jasmine.createSpyObj(CountryService, ["getAllCountries"]);

    spyCountryService.getAllCountries.and.returnValue(of(countries))

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule,
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        ItineraryupdateComponent,
        MenuComponent,
        FooterComponent,
        BuscadorLandmarkComponent
      ],
      //schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        { provide: CountryService, useValue: spyCountryService },
        AuthService, ImageService, ItineraryService, ActivityService, LandmarkService,

      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ItineraryupdateComponent);
      component = fixture.componentInstance;

      // Returns a service with the MockBackend so we can test with dummy responses
      authService = TestBed.inject(AuthService);
      //spyAuthService.showUser.and.returnValue(showUser);
      tokenService = TestBed.inject(TokenService);
      itineraryService = TestBed.inject(ItineraryService);
      activityService = TestBed.inject(ActivityService);
      imageService = TestBed.inject(ImageService);
      landmarkService = TestBed.inject(LandmarkService);
      countryService = TestBed.inject(CountryService);

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
    activityService = null;
    imageService = null;
    landmarkService = null;
    countryService = null;
    router = null;
  });

  it('should use ngOnInit function being anonymous ', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
  });

  it('should use ngOnInit function being admin', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
  });

  it('should use ngOnInit function being user', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_USER"
      }
    ]);
    spyTokenService.getUsername.and.returnValue("ana3tirado");

    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
  });

  it('should fail to use vista in ngOnInit function', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_USER"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue((throwError({
      status: 404,
      error: {
        text: 'error'
      }
    })))

    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    flush()

  }));

  it('should fail to use vista in ngOnInit function with undefined error', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_USER"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    flush()
    tick(1000)
  }));

  it('should use addDay function ', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    component.ngOnInit()
    expect(component.addDay).toBeTruthy()
    component.addDay()
  });

  it('should use addActivity function ', () => {
    let formArray = new FormArray([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
    ]);
    expect(component.addActivity).toBeTruthy()
    component.addActivity(formArray)
  });

  it('should use checkPrice function ', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    component.editForm.addControl(
      'priceNormal', new FormControl('10', component.checkPrice)
    );
    component.editForm.addControl(
      'priceRare', new FormControl('-10', component.checkPrice)
    );
    expect(component.checkPrice).toBeTruthy()
  });

  it('should use removeActivity function ', () => {
    let formArray = new FormArray([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
    ]);
    expect(component.removeActivity).toBeTruthy()
    component.removeActivity(formArray, 0)
  });

  it('should use checkActivity function ', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    expect(component.checkActivity).toBeTruthy()
    component.checkActivity(component.editForm)
  });

  it('should use checkActivity function valid', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    let form = new FormGroup({
      name: new FormControl(),
      age: new FormControl('20')
    });
    expect(component.checkActivity).toBeTruthy()
    fixture.detectChanges()
    component.checkActivity(form)
  });

  it('should use uploadItineraryImage function', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    spyOn(imageService, 'addItineraryPhoto').and.returnValue(of('Imagen subida'))
    expect(component.uploadItineraryImage).toBeTruthy()
    fixture.detectChanges()
    component.uploadItineraryImage(imageMock, 1)
  });

  it('should fail to use uploadItineraryImage function', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    spyOn(imageService, 'addItineraryPhoto').and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    expect(component.uploadItineraryImage).toBeTruthy()
    fixture.detectChanges()
    component.uploadItineraryImage(imageMock, 1)
  });

  it('should use uploadLandmarkImage function', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    spyOn(imageService, 'addLandmarkPhoto').and.returnValue(of('Imagen subida'))
    expect(component.uploadLandmarkImage).toBeTruthy()
    fixture.detectChanges()
    component.uploadLandmarkImage(imageMock, 1)
  });

  it('should fail to use uploadLandmarkImage function', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    spyOn(imageService, 'addLandmarkPhoto').and.returnValue(throwError({
      status: 404,
      error: {
        text: undefined
      }
    }))
    expect(component.uploadLandmarkImage).toBeTruthy()
    fixture.detectChanges()
    component.uploadLandmarkImage(imageMock, 1)
  });


  it('should use addItineraryImage function', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()

    fixture.detectChanges();
    component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()
    tick();

    const getFileList = () => {
      const imageSize = "x".repeat(4000000 + 1)
      const blob = new Blob([imageSize], { type: "image/jpeg" });
      blob["lastModifiedDate"] = "";
      blob["name"] = "filename";

      const file = <File>blob;

      // @ts-ignore
      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file,
      };

      return fileList;
    };

    component.addItineraryImage(getFileList(), { value: { value: "test" } });
    flush();
  }));

  it('should use addItineraryImage function image/png', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    fixture.detectChanges();



    expect(component.ngOnInit).toBeTruthy()
    tick();

    const getFileList = () => {
      const imageSize = "x".repeat(4000000 + 1)
      const blob = new Blob([imageSize], { type: "image/png" });
      blob["lastModifiedDate"] = "";
      blob["name"] = [];

      const file = <File>blob;
      // @ts-ignore
      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file,
      };

      return fileList;
    };

    component.addItineraryImage(getFileList(), { value: { value: "test" } });
    flush();
  }));

  it('should use addItineraryImage function && file?.type == image/jpeg', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()


    const getFileList = () => {
      const imageSize = "x".repeat(4000000 - 1)
      const blob = new Blob([imageSize], { type: "image/jpeg" });
      blob["lastModifiedDate"] = " ";
      blob["name"] = [];

      const file = <File>blob;
      // @ts-ignore
      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file,
      };

      return fileList;
    };

    component.addItineraryImage(getFileList(), { value: { value: "test" } });
    flush();
  }));

  it('should use addItineraryImage function big size image/random', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()


    const getFileList = () => {
      const imageSize = "x".repeat(4000000 + 1)
      const blob = new Blob([imageSize], { type: "image/random" });
      blob["lastModifiedDate"] = " ";
      blob["name"] = [];

      const file = <File>blob;
      // @ts-ignore
      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file,
      };

      return fileList;
    };

    component.addItineraryImage(getFileList(), { value: { value: "test" } });
    flush();
  }));

  it('should use addItineraryImage function big size image/jpeg', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    let formArray = new FormArray([
      new FormControl('hola', Validators.required),
      new FormControl('hola2', Validators.required),
    ]);
    component.addDay()
    component.addActivity(formArray)
    expect(component.ngOnInit).toBeTruthy()


    const getFileList = () => {
      const imageSize = "x".repeat(4000000 - 1)
      const blob = new Blob([imageSize], { type: "image/random" });
      blob["lastModifiedDate"] = " ";
      blob["name"] = [];

      const file = <File>blob;
      // @ts-ignore
      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file,
      };

      return fileList;
    };

    component.addItineraryImage(getFileList(), { value: { value: "test" } });
    flush();
  }));

  it('should use addLandmarkImage function', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()
    tick();

    const getFileList = () => {
      const imageSize = "x".repeat(4000000 + 1)
      const blob = new Blob([imageSize], { type: "image/jpeg" });
      blob["lastModifiedDate"] = "";
      blob["name"] = "filename";

      const file = <File>blob;
      // @ts-ignore
      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file,
      };

      return fileList;
    };

    component.addLandmarkImage(getFileList(), component.editForm, { value: { value: "test" } });
    flush();
  }));

  it('should use addLandmarkImage function big size image/random', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    expect(component.ngOnInit).toBeTruthy()


    const getFileList = () => {
      const imageSize = "x".repeat(4000000 + 1)
      const blob = new Blob([imageSize], { type: "image/random" });
      blob["lastModifiedDate"] = " ";
      blob["name"] = [];

      const file = <File>blob;
      // @ts-ignore
      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file,
      };

      return fileList;
    };

    component.addLandmarkImage(getFileList(), component.editForm, { value: { value: "test" } });
    flush();
  }));

  it('should use addLandmarkImage function big size image/jpeg', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    let formArray = new FormArray([
      new FormControl('landmark', Validators.required),
      new FormControl('hola2', Validators.required),
    ]);
    component.addDay()
    component.addActivity(formArray)
    expect(component.ngOnInit).toBeTruthy()


    const getFileList = () => {
      const imageSize = "x".repeat(4000000 - 1)
      const blob = new Blob([imageSize], { type: "image/random" });
      blob["lastModifiedDate"] = " ";
      blob["name"] = [];

      const file = <File>blob;
      // @ts-ignore
      const fileList: FileList = {
        0: file,
        1: file,
        length: 2,
        item: (index: number) => file,
      };

      return fileList;
    };

    component.addLandmarkImage(getFileList(), component.editForm, { value: { value: "test" } });
    flush();
  }));

  it('should use existLandmark function', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    let form = formBuilder.group({
      title: [''],
      description: [''],
      action: [''],
      searchLandmark: [''],
      landmarkId: ['0'],
      landmarkImage: [''],
      landmarkName: [''],
      landmarkLoadImage: [''],
      landmarkLoadName: [''],
      landmark: formBuilder.array([])
      //landmark: ['', Validators.required],
    })
    let data = {
      name: "nombre",
      image: {
        imageUrl: "url"
      }
    }
    //form.addControl('landmark',  formBuilder.array([]))
    expect(component.existLandmark).toBeTruthy()
    fixture.detectChanges()
    component.existLandmark(form, data)
  });

  it('should use clickLandmarkShare function', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    let form = formBuilder.group({
      title: [''],
      description: [''],
      action: [''],
      searchLandmark: [''],
      landmarkId: ['0'],
      landmarkImage: [''],
      landmarkName: [''],
      landmark: formBuilder.array([])
      //landmark: ['', Validators.required],
    })
    let data = {
      name: "nombre",
      image: {
        imageUrl: "url"
      }
    }
    //form.addControl('landmark',  formBuilder.array([]))
    expect(component.clickLandmarkShare).toBeTruthy()
    fixture.detectChanges()
    component.clickLandmarkShare(form, data)
  });

  it('should use getItineraryPrice function without days', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    let form = formBuilder.group({
      title: [''],
      description: [''],
      action: [''],
      searchLandmark: [''],
      landmarkId: ['0'],
      landmarkImage: [''],
      landmarkName: [''],
      landmark: formBuilder.array([]),
      days: formBuilder.array([])
      //landmark: ['', Validators.required],
    })

    expect(component.getItineraryPrice).toBeTruthy()
    fixture.detectChanges()
    component.getItineraryPrice(form)
  });

  it('should use getItineraryPrice function with activities.controls and landmarkId == "" and  landmark[0].price ', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))

    const groupFormArrayActividades = formBuilder.group({
      landmarkId: [''],
      landmark: formBuilder.array([[{ price: 10 }]])
    });
    let formArrayActivities = formBuilder.array([], new FormControl(''))
    formArrayActivities.push(groupFormArrayActividades)

    const groupFormArrayDay = formBuilder.group({
      activities: formArrayActivities,
    });
    let formArrayDay = formBuilder.array([])
    formArrayDay.push(groupFormArrayDay)
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })

    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    expect(component.getItineraryPrice).toBeTruthy()
    fixture.detectChanges()
    component.getItineraryPrice(itinerary)
  });

  it('should use getItineraryPrice function with activities.controls and landmarkId == "test" and  landmark[0].price', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    const groupFormArrayActividades = formBuilder.group({
      landmarkId: ['test'],
      landmark: formBuilder.array([[{ price: 10 }]])
    });
    let formArrayActivities = formBuilder.array([], new FormControl(''))
    formArrayActivities.push(groupFormArrayActividades)

    const groupFormArrayDay = formBuilder.group({
      activities: formArrayActivities,
    });
    let formArrayDay = formBuilder.array([])
    formArrayDay.push(groupFormArrayDay)
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })

    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    expect(component.getItineraryPrice).toBeTruthy()
    fixture.detectChanges()
    component.getItineraryPrice(itinerary)
  });

  it('should use getItineraryPrice function without activities.controls', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))

    let formArrayActivities = formBuilder.array([])
    //formArrayActivities.push(groupFormArrayActividades)
    formArrayActivities.clearValidators()
    const groupFormArrayDay = formBuilder.group({
      activities: formArrayActivities,
    });
    let formArrayDay = formBuilder.array([])
    formArrayDay.push(groupFormArrayDay)
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })

    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    expect(component.getItineraryPrice).toBeTruthy()
    fixture.detectChanges()
    component.getItineraryPrice(itinerary)
  });

  it('should use getItineraryPrice function with activities.landmarkLoadPrice == -1', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))

    const groupFormArrayActividades = formBuilder.group({
      landmarkId: [''],
      landmark: formBuilder.array([[{ price: 10 }]]),
      landmarkLoadPrice: [-1]
    });
    let formArrayActivities = formBuilder.array([], new FormControl(''))
    formArrayActivities.push(groupFormArrayActividades)

    const groupFormArrayDay = formBuilder.group({
      activities: formArrayActivities,
    });
    let formArrayDay = formBuilder.array([])
    formArrayDay.push(groupFormArrayDay)
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })

    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    expect(component.getItineraryPrice).toBeTruthy()
    fixture.detectChanges()
    component.getItineraryPrice(itinerary)
  });


  it('should use onUpdate() function ', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    spyOn(itineraryService, 'editar').and.returnValue(of(itineraryInput))
    spyOn(activityService, 'borrar').and.returnValue(of('test'))
    spyOn(component, 'uploadItineraryImage').and.returnValue()
    const groupFormArrayActividades = formBuilder.group({
      id2: [''],
      landmarkId: [''],
      landmark: formBuilder.array([[{ price: 10 }]]),
      landmarkLoadPrice: [-1]
    });
    let formArrayActivities = formBuilder.array([], new FormControl(''))
    formArrayActivities.push(groupFormArrayActividades)

    const groupFormArrayDay = formBuilder.group({
      activities: formArrayActivities,
    });
    let formArrayDay = formBuilder.array([])
    formArrayDay.push(groupFormArrayDay)
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })

    component.activityTrash.push(1)
    component.itineraryImage = imageMock
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    //component.ngOnInit()

    fixture.detectChanges();
    expect(component.onUpdate).toBeTruthy()
    component.onUpdate()
    flush()
  }));

  it('should use onUpdate() function but fail to use editar itinerary', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    spyOn(itineraryService, 'editar').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))
    spyOn(activityService, 'borrar').and.returnValue(of('test'))
    spyOn(component, 'uploadItineraryImage').and.returnValue()
    const groupFormArrayActividades = formBuilder.group({
      id2: [''],
      landmarkId: [''],
      landmark: formBuilder.array([[{ price: 10 }]]),
      landmarkLoadPrice: [-1]
    });
    let formArrayActivities = formBuilder.array([], new FormControl(''))
    formArrayActivities.push(groupFormArrayActividades)

    const groupFormArrayDay = formBuilder.group({
      activities: formArrayActivities,
    });
    let formArrayDay = formBuilder.array([])
    formArrayDay.push(groupFormArrayDay)
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.activityTrash.push(1)
    component.itineraryImage = imageMock
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    fixture.detectChanges();
    expect(component.onUpdate).toBeTruthy()
    component.onUpdate()
    flush()
  }));

  it('should use onUpdate() function but fail to use borrar activity', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);
    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    spyOn(itineraryService, 'editar').and.returnValue(of(itineraryInput))
    spyOn(activityService, 'borrar').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))
    const groupFormArrayActividades = formBuilder.group({
      landmarkId: [''],
      landmark: formBuilder.array([[{ price: 10 }]]),
      landmarkLoadPrice: [-1]
    });
    let formArrayActivities = formBuilder.array([], new FormControl(''))
    formArrayActivities.push(groupFormArrayActividades)

    const groupFormArrayDay = formBuilder.group({
      activities: formArrayActivities,
    });
    let formArrayDay = formBuilder.array([])
    formArrayDay.push(groupFormArrayDay)
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.activityTrash.push(1)
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    fixture.detectChanges();
    expect(component.onUpdate).toBeTruthy()
    component.onUpdate()
    flush()
  }));

  it('should use inputClass() function not touched property', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_USER"
      }
    ]);
    spyTokenService.getUsername.and.returnValue("ana3tirado");

    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  });

  it('should use inputClass() function touched property', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_USER"
      }
    ]);
    spyTokenService.getUsername.and.returnValue("ana3tirado");

    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    formMock.get('text').markAsTouched()

    fixture.detectChanges();
    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  });

  it('should use inputClass() function touched property and valid', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_USER"
      }
    ]);
    spyTokenService.getUsername.and.returnValue("ana3tirado");

    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    formMock.get('text').markAsTouched()
    formMock.get('text').clearValidators()
    fixture.detectChanges();

    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  });

  it('should use inputClass() function touched property and invalid', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_USER"
      }
    ]);
    spyTokenService.getUsername.and.returnValue("ana3tirado");

    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    formMock.get('text').markAsTouched()
    formMock.get('text').setErrors({ required: true })
    fixture.detectChanges();

    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  });

  it('should use inputClass() function not touched property and invalid', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_USER"
      }
    ]);
    spyTokenService.getUsername.and.returnValue("ana3tirado");

    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()

    //formMock.get('text').markAsTouched()
    formMock.get('text').setErrors({ required: true })
    fixture.detectChanges();

    expect(component.inputClass(formMock, 'text')).toBeTruthy()
    component.inputClass(formMock, 'text')
  });

  it('should use checkRange', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_USER"
      }
    ]);
    spyTokenService.getUsername.and.returnValue("ana3tirado");

    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    let formTest = formBuilder.group({
      number: ['0', [checkRange(10, 20)]],
    })


  });

  it('should use notificationActivity', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_USER"
      }
    ]);
    spyTokenService.getUsername.and.returnValue("ana3tirado");

    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    let formTest1 = formBuilder.group({
      newActivity: ['true'],
    })

    component.notificationActivity(formTest1)

    let formTest2 = formBuilder.group({
      newActivity: ['false'],
    })
    component.notificationActivity(formTest2)
  });

  it('should use resetForm', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_USER"
      }
    ]);
    spyTokenService.getUsername.and.returnValue("ana3tirado");

    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    spyOn(activityService, 'show').and.returnValue(of(activityDto))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    let formTest = formBuilder.group({
      id2: [1],
      title: [],
      description: []
    })

    component.resetForm(formTest)
  });

  it('should use resetNewForm', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
    spyOn(component, 'reloadPage').and.returnValue();
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_USER"
      }
    ]);
    spyTokenService.getUsername.and.returnValue("ana3tirado");

    spyOn(itineraryService, 'vista').and.returnValue(of(itineraryInput))
    spyOn(activityService, 'show').and.returnValue(of(activityDto))
    let formArrayDay = formBuilder.array([])
    let itinerary = formBuilder.group({
      name: [''],
      description: [''],
      budget: [''],
      searchLandmark: [''],
      recommendedSeason: [''],
      days: formArrayDay
    })
    component.editForm = itinerary;
    fixture.detectChanges()
    expect(component.ngOnInit).toBeTruthy()
    component.ngOnInit()
    let formTestValid = formBuilder.group({
      title: [''],
      description: [''],
      action: [''],
      searchLandmark: [''],
      landmarkId: ['0'],
      landmarkImage: [''],
      landmarkName: [''],
      landmarkLoadImage: [''],
      landmarkLoadName: [''],
      landmark: formBuilder.array([]),
      newActivity: [''],
      createActivity: ['']
    })
    component.resetNewForm(formTestValid)

    let formTestInvalid = formBuilder.group({
      title: [''],
      description: [''],
      action: [''],
      searchLandmark: [''],
      landmarkId: ['0'],
      landmarkImage: [''],
      landmarkName: [''],
      landmarkLoadImage: [''],
      landmarkLoadName: [''],
      landmark: formBuilder.array([]),
      newActivity: [''],
      createActivity: [''],
      test: ['a', Validators.minLength(8)]
    })

    component.resetNewForm(formTestInvalid)
  });
})

