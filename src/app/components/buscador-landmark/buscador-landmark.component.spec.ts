import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BuscadorLandmarkComponent } from './buscador-landmark.component';
import { MenuComponent } from '../menu/menu.component';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";


import { routes } from "../../app-routing.module";
import { ReactiveFormsModule, FormsModule, AbstractControl } from "@angular/forms";
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { ShowUser } from '../../models/show-user';
import { ImageService } from '../../services/image.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LandmarkService } from '../../services/landmark.service';
import { Landmark, LandmarkDto } from '../../models/itinerary';
import { FormBuilder } from '@angular/forms';
import { BuscadorLandmarkService } from 'src/app/services/buscador-landmark.service';
import { LandmarkCreateComponent } from '../landmark/landmark-create/landmark-create.component';



let component: BuscadorLandmarkComponent;
let fixture: ComponentFixture<BuscadorLandmarkComponent>;

let authService: AuthService;
let tokenService: TokenService;
let buscadorLandmarkService: BuscadorLandmarkService;

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

let landmarkPage={
  "content": [
    {
      "views": 78,
      "country": "España",
      "latitude": 37.40632855625326,
      "longitude": -5.999255630359631,
      "endPromotionDate": "2022-02-02T11:16:20",
      "image": {
        "imageUrl": "https://static4-sevilla.abc.es/media/sevilla/2019/01/04/s/isla-magica-deudas-k4xH--1200x630@abc.jpg",
        "name": "imagenIslaMagica",
        "id": "77"
      },
      "description": "Parque temático basado en el Nuevo Mundo con montañas rusas, toboganes acuáticos, espectáculos y un lago.",
      "price": 0,
      "city": "Sevilla",
      "category": "Parque",
      "phone": "+(34) 902161716",
      "website": "http://www.islamagica.es/",
      "instagram": null,
      "twitter": null,
      "createDate": "2021-01-01T00:00:01",
      "email": null,
      "name": "Isla Mágica",
      "id": 67
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

let landmarkPage2={
  "content": [
    {
      "views": 78,
      "country": "España",
      "latitude": 37.40632855625326,
      "longitude": -5.999255630359631,
      "endPromotionDate": "2022-02-02T11:16:20",
      "image": {
        "imageUrl": "https://static4-sevilla.abc.es/media/sevilla/2019/01/04/s/isla-magica-deudas-k4xH--1200x630@abc.jpg",
        "name": "imagenIslaMagica",
        "id": "77"
      },
      "description": "Parque temático basado en el Nuevo Mundo con montañas rusas, toboganes acuáticos, espectáculos y un lago.",
      "price": 0,
      "city": "Sevilla",
      "category": "Parque",
      "phone": "+(34) 902161716",
      "website": "http://www.islamagica.es/",
      "instagram": null,
      "twitter": null,
      "createDate": "2021-01-01T00:00:01",
      "email": null,
      "name": "Isla Mágica",
      "id": 67
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

let landmarkPage3={
  "content": [
    {
      "views": 78,
      "country": "España",
      "latitude": 37.40632855625326,
      "longitude": -5.999255630359631,
      "endPromotionDate": "2022-02-02T11:16:20",
      "image": {
        "imageUrl": "https://static4-sevilla.abc.es/media/sevilla/2019/01/04/s/isla-magica-deudas-k4xH--1200x630@abc.jpg",
        "name": "imagenIslaMagica",
        "id": "77"
      },
      "description": "Parque temático basado en el Nuevo Mundo con montañas rusas, toboganes acuáticos, espectáculos y un lago.",
      "price": 0,
      "city": "Sevilla",
      "category": "Parque",
      "phone": "+(34) 902161716",
      "website": "http://www.islamagica.es/",
      "instagram": null,
      "twitter": null,
      "createDate": "2021-01-01T00:00:01",
      "email": null,
      "name": "Isla Mágica",
      "id": 67
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
let landmarkPageEmptyLandmarks={
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
let landmarkPageEmpty={
  "content": [
    {
      "views": 78,
      "country": "España",
      "latitude": 37.40632855625326,
      "longitude": -5.999255630359631,
      "endPromotionDate": "2022-02-02T11:16:20",
      "image": {
        "imageUrl": "https://static4-sevilla.abc.es/media/sevilla/2019/01/04/s/isla-magica-deudas-k4xH--1200x630@abc.jpg",
        "name": "imagenIslaMagica",
        "id": "77"
      },
      "description": "Parque temático basado en el Nuevo Mundo con montañas rusas, toboganes acuáticos, espectáculos y un lago.",
      "price": 0,
      "city": "Sevilla",
      "category": "Parque",
      "phone": "+(34) 902161716",
      "website": "http://www.islamagica.es/",
      "instagram": null,
      "twitter": null,
      "createDate": "2021-01-01T00:00:01",
      "email": null,
      "name": "Isla Mágica",
      "id": 67
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
let formBuilder: FormBuilder = new FormBuilder();
let formMock = formBuilder.group({
  text: ['']
});

let spyTokenService;
let spyBuscadorLandmarkService;

describe('BuscadorLandmark', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      }
    }

    spyTokenService = jasmine.createSpyObj(TokenService, ["getToken", "getUsername", "getAuthorities"]);
    spyTokenService.getUsername.and.returnValue("alejandro1cortes");
    spyTokenService.getAuthorities.and.returnValue([
      {
        "authority": "ROLE_ADMIN"
      }
    ]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule,
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        BuscadorLandmarkComponent,
        MenuComponent,
        LandmarkCreateComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        AuthService, BuscadorLandmarkService
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(BuscadorLandmarkComponent);
      component = fixture.componentInstance;

      authService = TestBed.inject(AuthService);
      tokenService = TestBed.inject(TokenService);
      buscadorLandmarkService = TestBed.inject(BuscadorLandmarkService);

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
    router=null;
  });

  it('should use ngOnInit function', () => { 
    spyOn(buscadorLandmarkService,'getAllCountry').and.returnValue(of(countries))
    spyOn(buscadorLandmarkService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyTokenService.getToken.and.returnValue("tokenTest");
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy()
  });

  it('should use ngOnInit function without token', fakeAsync(() => {
    spyOn(buscadorLandmarkService,'getAllCountry').and.returnValue(of(countries))
    spyOn(buscadorLandmarkService,'getCityByCountry').and.returnValue(of(['Sevilla'])) 
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy()
  }));

  /*it('should use switchPage function', fakeAsync(() => { 
    spyOn(buscadorLandmarkService,'getAllCountry').and.returnValue(of(countries))
    spyOn(buscadorLandmarkService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy()
    component.switchPage(1)
  }));*/

  it('should use onRegister function', fakeAsync(() => { 
    spyOn(buscadorLandmarkService,'getAllCountry').and.returnValue(of(countries))
    spyOn(buscadorLandmarkService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy()
    component.onRegister()
  }));

  it('should use onChange function', fakeAsync(() => { 
    spyOn(buscadorLandmarkService,'getAllCountry').and.returnValue(of(countries))
    spyOn(buscadorLandmarkService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy()
    component.OnChange("España")
  }));

  it('should use passData function', fakeAsync(() => { 
    spyOn(buscadorLandmarkService,'getAllCountry').and.returnValue(of(countries))
    spyOn(buscadorLandmarkService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy()
    component.passData(landmarkMock)
    tick(1000)
  }));

  it('should use loadLandmarks function', fakeAsync(() => { 
    spyOn(buscadorLandmarkService,'getAllCountry').and.returnValue(of(countries))
    spyOn(buscadorLandmarkService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyOn(buscadorLandmarkService,'landmarkPage').and.returnValue(of(landmarkPage))
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy()
    component.loadLandmarks('España','Sevilla',0)
  }));

  it('should use loadLandmarks function with 2 pages results', fakeAsync(() => { 
    spyOn(buscadorLandmarkService,'getAllCountry').and.returnValue(of(countries))
    spyOn(buscadorLandmarkService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyOn(buscadorLandmarkService,'landmarkPage').and.returnValue(of(landmarkPage2))
    component.ngOnInit()
    
    tick()
    expect(component.ngOnInit).toBeTruthy()
    component.loadLandmarks('España','Sevilla',0)
    
    flush()
  }));

  it('should use loadLandmarks function with 3 pages results', () => { 
    spyOn(buscadorLandmarkService,'getAllCountry').and.returnValue(of(countries))
    spyOn(buscadorLandmarkService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyOn(buscadorLandmarkService,'landmarkPage').and.returnValue(of(landmarkPage3))
    component.ngOnInit()
    fixture.detectChanges();

    expect(component.ngOnInit).toBeTruthy()
    component.loadLandmarks('España','Sevilla',0)

  });

  it('should use loadLandmarks function with 3 pages results and prueba=1', () => { 
    spyOn(buscadorLandmarkService,'getAllCountry').and.returnValue(of(countries))
    spyOn(buscadorLandmarkService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyOn(buscadorLandmarkService,'landmarkPage').and.returnValue(of(landmarkPage3))
    component.prueba=1
    component.ngOnInit()
    fixture.detectChanges();

    expect(component.ngOnInit).toBeTruthy()
    component.loadLandmarks('España','Sevilla',0)
  });
  
  it('should use loadLandmarks function with 3 pages results and prueba=1 and currentPage = initialPages[0]', () => { 
    spyOn(buscadorLandmarkService,'getAllCountry').and.returnValue(of(countries))
    spyOn(buscadorLandmarkService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyOn(buscadorLandmarkService,'landmarkPage').and.returnValue(of(landmarkPage3))
    component.prueba=1
    component.currentPage=0
    component.initialPages=[0]
    component.ngOnInit()
    fixture.detectChanges();

    expect(component.ngOnInit).toBeTruthy()
    component.loadLandmarks('España','Sevilla',0)
  });

  it('should use loadLandmarks function with 3 pages results and prueba=1 and currentPage = initialPages[0] and initialPages[length] big', () => { 
    spyOn(buscadorLandmarkService,'getAllCountry').and.returnValue(of(countries))
    spyOn(buscadorLandmarkService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyOn(buscadorLandmarkService,'landmarkPage').and.returnValue(of(landmarkPage3))
    component.prueba=1
    component.currentPage=0
    component.initialPages=[0,1,2,3,4]
    component.ngOnInit()
    fixture.detectChanges();

    expect(component.ngOnInit).toBeTruthy()
    component.loadLandmarks('España','Sevilla',0)
  });

  it('should use loadLandmarks function with 2 pages results and currentPage != initialPages[0] ', () => { 
    spyOn(buscadorLandmarkService,'getAllCountry').and.returnValue(of(countries))
    spyOn(buscadorLandmarkService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyOn(buscadorLandmarkService,'landmarkPage').and.returnValue(of(landmarkPage2))
    component.prueba=1
    component.totalPages=landmarkPage2.totalPages
    component.currentPage=0
    component.initialPages=[1,2,3,4]

    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy()
    component.loadLandmarks('España','Sevilla',0)
  });

  it('should use loadLandmarks function with 2 pages results and currentPage != initialPages[0] and initialPages[0] + 1 < totalPages', () => { 
    spyOn(buscadorLandmarkService,'getAllCountry').and.returnValue(of(countries))
    spyOn(buscadorLandmarkService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyOn(buscadorLandmarkService,'landmarkPage').and.returnValue(of(landmarkPage2))
    component.prueba=1
    component.totalPages=landmarkPage2.totalPages
    component.currentPage=1
    component.initialPages=[0,1,2,3,4]

    fixture.detectChanges();

    expect(component.ngOnInit).toBeTruthy()
    component.loadLandmarks('España','Sevilla',0)
  });

  it('should use loadLandmarks function with 2 pages results and currentPage != initialPages[0] and not matching any of 2 if', () => { 
    spyOn(buscadorLandmarkService,'getAllCountry').and.returnValue(of(countries))
    spyOn(buscadorLandmarkService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyOn(buscadorLandmarkService,'landmarkPage').and.returnValue(of(landmarkPage2))
    component.prueba=1
    component.totalPages=landmarkPage2.totalPages-1
    component.currentPage=2
    component.initialPages=[0,1,2,3,4]

    fixture.detectChanges();

    
    expect(component.ngOnInit).toBeTruthy()
    component.loadLandmarks('España','Sevilla',0)
  });

  /*it('should use loadLandmarks function with empty result ', () => { 
    spyOn(buscadorLandmarkService,'landmarkPage').and.returnValue(of(landmarkPageEmpty))
    spyOn(component,'loadLandmarks').and.callThrough();
    fixture.detectChanges();
    component.loadLandmarks('España','Sevilla',0)
    expect(component.ngOnInit).toBeTruthy()
  });*/

  it('should use getPage function ', fakeAsync(() => {
    spyOn(buscadorLandmarkService,'landmarkPage').and.returnValue(of(landmarkPage2))

    component.ngOnInit()
    fixture.detectChanges();
    expect(component.getPage).toBeTruthy()
    component.getPage(0)
  }));
  
  it('should use getPage function without content', fakeAsync(() => {
    let landmarkPageTemp=landmarkPage
    landmarkPageTemp.content=[]
    spyOn(buscadorLandmarkService,'landmarkPage').and.returnValue(of(landmarkPageTemp))
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.getPage).toBeTruthy()
    component.getPage(0)
  }));
  
  it('should fail use getPage function ', fakeAsync(() => {
    spyOn(buscadorLandmarkService,'landmarkPage').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.getPage).toBeTruthy()
    component.getPage(0)
  }));

  it('should use loadLandmarks function with empty landmarks ', () => { 
    spyOn(buscadorLandmarkService,'landmarkPage').and.returnValue(of(landmarkPageEmptyLandmarks))

    fixture.detectChanges();
    component.loadLandmarks('España','Sevilla',0)
    expect(component.ngOnInit).toBeTruthy()
  });

  it('should fail to use loadLandmarks function', () => { 
    spyOn(buscadorLandmarkService,'landmarkPage').and.returnValue(throwError({
      status: 404,
      error: {
        text: 'Error'
      }
    }))

    fixture.detectChanges();
    component.loadLandmarks('España','Sevilla',0)
    expect(component.ngOnInit).toBeTruthy()
  });

})
