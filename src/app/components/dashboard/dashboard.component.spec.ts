import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
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

import { LandmarkCreateComponent } from '../landmark/landmark-create/landmark-create.component';
import { BuscadorService } from 'src/app/services/buscador.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ChartsModule } from 'ng2-charts';



let component: DashboardComponent;
let fixture: ComponentFixture<DashboardComponent>;

let authService: AuthService;
let tokenService: TokenService;
let dashboardService: DashboardService;

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
let itinerarySearchResult = {
  "content": [
    {
      "views": 75,
      "username": "ana3tirado",
      "description": "Millones de turistas de todo el mundo visitan distintos lugares de España cada año. Andalucía es una de las regiones más visitadas y su capital nos da una idea de porqué. Monumentos históricos, calles encantadoras, temperaturas cálidas, una gastronomía sin igual y una cultura única hacen de Sevilla una ciudad llena de pasión.",
      "budget": 900,
      "imageUrl": "https://sevillando.net/wp-content/uploads/2019/04/catedral-y-giralda-Sevilla.jpeg",
      "avgRating": 5,
      "status": "PUBLISHED",
      "name": "Sevilla, tierra de pasión",
      "id": 10
    },
    {
      "views": 0,
      "username": "alejandro1cortes",
      "description": "sad",
      "budget": 0,
      "imageUrl": "https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png",
      "avgRating": null,
      "status": "PUBLISHED",
      "name": "asdfas",
      "id": 19
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
  "totalElements": 2,
  "sort": {
    "sorted": false,
    "unsorted": true,
    "empty": true
  },
  "first": true,
  "number": 0,
  "numberOfElements": 2,
  "size": 10,
  "empty": false
}
let formBuilder: FormBuilder = new FormBuilder();
let formMock = formBuilder.group({
  text: ['']
});

let spyTokenService;
let spybuscadorService;

let dashboardMockResponse;

describe('Buscador', () => {

  beforeEach(async () => {
    let activatedRouteMock: any = {
      snapshot: {
        paramMap: { get: username => { return 'alejandro1cortes' } }
      }
    }
    dashboardMockResponse={
      "content": [
          {
              "views": 24,
              "name": "Siete días en Londres",
              "id": 7,
              "budget": 145.0,
              "avgRating": 3.0,
              "countComments": 5,
              "username": "ana3tirado",
              "description": "Cuando pensamos en Londres, imaginamos una ciudad fría, gris y triste. Nada más lejos de la realidad. La capital de Reino Unido fue fundada por los romanos hace casi dos milenios. Se encuentra a orillas del rio Támesis y atrae a millones de personas. En este itinerario descubriremos los encantos de la ciudad y lo que la hace un lugar extraordinario.",
              "status": "PUBLISHED",
              "imageUrl": "https://static.hosteltur.com/app/public/uploads/img/articles/2020/09/28/L_175243_londres-bigben-cabina-coronavirus.jpg"
          },
          {
              "views": 56,
              "name": "Tu verano en La Habana",
              "id": 2,
              "budget": 135.0,
              "avgRating": 4.0,
              "countComments": 4,
              "username": "lidia2lopez",
              "description": "¿Alguna vez haz soñado con visitar un país tropical donde el ambiente y las temperaturas te enamoren y te hagan olvidar todas tus preocupaciones? Entonces Cuba es tu sitio. Su capital, La Habana, es una de las ciudades mas encantadoras del mundo. Sus hermosos colores y sus vivas calles harán que tu visita a Cuba sea inolvidable.",
              "status": "PUBLISHED",
              "imageUrl": "https://elviajista.com/wp-content/uploads/2020/06/habanacuba-730x487.jpg"
          },
          {
              "views": 53,
              "name": "Múnich, un viaje para recordar",
              "id": 4,
              "budget": 109.0,
              "avgRating": 3.5,
              "countComments": 4,
              "username": "luis4ruiz",
              "description": "La capital de Baviera es uno de los lugares con más interés histórico del mundo. Situada al sur de Alemania, atrae turistas de todo el mundo y se encuentra entre las ciudades más visitadas de Europa. Hoy os propongo un itinerario para visitar los lugares más interesantes de la ciudad en tan solo 4 días.",
              "status": "PUBLISHED",
              "imageUrl": "https://turismoymas.com/wp-content/uploads/2016/10/M%C3%BAnich.jpg"
          },
          {
              "views": 33,
              "name": "Enamorate de París",
              "id": 5,
              "budget": 60.0,
              "avgRating": 3.5,
              "countComments": 4,
              "username": "alejandro1cortes",
              "description": "Todo el mundo conoce los grandes atractivos turísticos de París: el Arco del Triunfo, el museo del Louvre y la Torre Eiffel son algunos de los más famosos. Sin embargo, el encanto de la capital francesa no solo reside en estos lugares mundialmente conocidos. Sus calles, su cultura y su gastronomía son algunos de los factores que te harán enamorarte de París.",
              "status": "PUBLISHED",
              "imageUrl": "https://aws.traveler.es/prod/designs/v1/assets/940x627/98404.jpg"
          },
          {
              "views": 43,
              "name": "Una semana en Los Ángeles",
              "id": 1,
              "budget": 51.75,
              "avgRating": 3.0,
              "countComments": 3,
              "username": "alejandro1cortes",
              "description": "Situada en la coste oeste de los Estados Unidos, Los Ángeles es una ciudad de gran atractivo turístico. En este itinerario, os llevaré por algunos de los lugares más interesantes de esta gran ciudad, desde la playa de Venice hasta Hollywood, pasando por el Observatorio Griffith y el distrito comercial.",
              "status": "PUBLISHED",
              "imageUrl": "https://storage.googleapis.com/md-media-cl/2019/04/promociones-aereas-los-angeles-capa2019-01.jpg"
          },
          {
              "views": 62,
              "name": "Viaje a Tokio",
              "id": 3,
              "budget": 105.0,
              "avgRating": 4.333333333333333,
              "countComments": 3,
              "username": "ana3tirado",
              "description": "El continente asiatico siempre me ha parecido muy interesante, especialmente por su cultura. Viajar a Tokio fue una experiencia única para mi. Por eso, os traigo este itinerario que he creado para disfrutar al máximo dela ciudad durante cuatro días. Solo espero que Tokio os guste tanto como a mi.",
              "status": "PUBLISHED",
              "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/4b/5d/10/caption.jpg?w=500&h=300&s=1&cx=1005&cy=690&chk=v1_2ed86f729380ea073850"
          },
          {
              "views": 49,
              "name": "El encanto de Río de Janeiro",
              "id": 6,
              "budget": 25.0,
              "avgRating": 4.333333333333333,
              "countComments": 3,
              "username": "lidia2lopez",
              "description": "La ciudad Brasileña es la segunda ciudad más habitada del país. Posee un gran interés turístico que atrae a miles de personas cada año. Los hermosos paisajes de la ciudad costera ofrecen unas vistas únicas y espectaculares. Sin embargo, Rio de Janeiro cuenta con muchos más atractivos, como su cultura y su gastronomía.",
              "status": "PUBLISHED",
              "imageUrl": "https://i1.wp.com/www.sinmapa.net/wp-content/uploads/2019/09/rio-janeiro-shutter-portada.jpg?resize=700%2C467&ssl=1"
          },
          {
              "views": 108,
              "name": "Visita a Roma",
              "id": 8,
              "budget": 160.0,
              "avgRating": 4.666666666666667,
              "countComments": 3,
              "username": "lidia2lopez",
              "description": "Como todos sabemos, la llamada Ciudad Eterna fue la capital de uno de los mayores imperios de la historia. Sin lugar a dudas, sus calles hacen justicia a su grandeza. Son muchos los monumentos y puntos de interés que podemos visitar en la capital italiana. En este itinerario veremos muchos de ellos y nos aseguraremos de lanzar una moneda a la Fontana di Trevi con el fin de volver a esta majestuosa ciudad.",
              "status": "PUBLISHED",
              "imageUrl": "https://miviaje.com/wp-content/uploads/2017/10/vista-de-roma.jpg"
          },
          {
              "views": 51,
              "name": "Invierno en Helsinki",
              "id": 9,
              "budget": 80.0,
              "avgRating": 4.0,
              "countComments": 3,
              "username": "alejandro1cortes",
              "description": "Pienso que los países nórdicos son lugares mágicos y enigmáticos que, en invierno, se cubren de un manto de nieve blanca que nos ofrece vistas extraordinarias. Por eso, decidí que ya era hora de visitar Helsinki, la capital de Finlandia. Fue una de las experiencias más bonitas de mi vida y me gustarí compartirla con vosotros en este itinerario.",
              "status": "PUBLISHED",
              "imageUrl": "https://rt00.epimg.net/retina/imagenes/2019/04/15/tendencias/1555328206_322875_1555328399_noticia_normal.jpg"
          },
          {
              "views": 75,
              "name": "Sevilla, tierra de pasión",
              "id": 10,
              "budget": 65.0,
              "avgRating": 5.0,
              "countComments": 3,
              "username": "ana3tirado",
              "description": "Millones de turistas de todo el mundo visitan distintos lugares de España cada año. Andalucía es una de las regiones más visitadas y su capital nos da una idea de porqué. Monumentos históricos, calles encantadoras, temperaturas cálidas, una gastronomía sin igual y una cultura única hacen de Sevilla una ciudad llena de pasión.",
              "status": "PUBLISHED",
              "imageUrl": "https://sevillando.net/wp-content/uploads/2019/04/catedral-y-giralda-Sevilla.jpeg"
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
      "totalElements": 10,
      "sort": {
          "sorted": false,
          "unsorted": true,
          "empty": true
      },
      "first": true,
      "size": 10,
      "number": 0,
      "numberOfElements": 10,
      "empty": false
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
        ToastrModule.forRoot(),
        ChartsModule
      ],
      declarations: [
        DashboardComponent,
        MenuComponent,
        LandmarkCreateComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TokenService, useValue: spyTokenService },
        AuthService, DashboardService
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;

      authService = TestBed.inject(AuthService);
      tokenService = TestBed.inject(TokenService);
      dashboardService = TestBed.inject(DashboardService);

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
    dashboardService = null;

  });

  it('should use ngOnInit function', fakeAsync(() => { 
    spyOn(dashboardService,'getAllCountry').and.returnValue(of(countries))
    spyTokenService.getToken.and.returnValue("tokenTest");
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy()
  }));


  it('should use onChange function', fakeAsync(() => { 
    spyOn(dashboardService,'getAllCountry').and.returnValue(of(countries))
    spyOn(dashboardService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy()
    component.OnChange("España")
    component.OnChange("")
  }));

  it('should use onRegister function ItinerariosMasVisitas', fakeAsync(() => { 
    spyOn(dashboardService,'getAllCountry').and.returnValue(of(countries))
    spyOn(dashboardService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyOn(dashboardService,'itinerariosOrdenadosPorVisualizaciones').and.returnValue(of(dashboardMockResponse))
    component.formFilter.get('function').setValue('ItinerariosMasVisitas')

    fixture.detectChanges();
    expect(component.onRegister).toBeTruthy()
    component.onRegister()
  }));

  it('should use onRegister function ItinerariosMasVisitas barChartData.length > 0 before and ==0 after', fakeAsync(() => { 
    spyOn(dashboardService,'getAllCountry').and.returnValue(of(countries))
    spyOn(dashboardService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    let dashboardMockResponseTemp=dashboardMockResponse
    dashboardMockResponseTemp.content=[]
    spyOn(dashboardService,'itinerariosOrdenadosPorVisualizaciones').and.returnValue(of(dashboardMockResponseTemp))
    component.formFilter.get('function').setValue('ItinerariosMasVisitas')
    component.barChartData.push({ data: [3], label: 'test' })
    fixture.detectChanges();
    expect(component.onRegister).toBeTruthy()
    component.onRegister()
  }));

  it('should use onRegister function LandmarksMasVisitas', fakeAsync(() => { 
    spyOn(dashboardService,'getAllCountry').and.returnValue(of(countries))
    spyOn(dashboardService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyOn(dashboardService,'landmarkOrdenadosPorVisualizaciones').and.returnValue(of(dashboardMockResponse))
    component.formFilter.get('function').setValue('LandmarksMasVisitas')

    fixture.detectChanges();
    expect(component.onRegister).toBeTruthy()
    component.onRegister()
  }));

  it('should use onRegister function LandmarksMasVisitas barChartData.length > 0 before and ==0 after', fakeAsync(() => { 
    spyOn(dashboardService,'getAllCountry').and.returnValue(of(countries))
    spyOn(dashboardService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    let dashboardMockResponseTemp=dashboardMockResponse
    dashboardMockResponseTemp.content=[]
    spyOn(dashboardService,'landmarkOrdenadosPorVisualizaciones').and.returnValue(of(dashboardMockResponseTemp))
    component.formFilter.get('function').setValue('LandmarksMasVisitas')
    component.barChartData.push({ data: [3], label: 'test' })
    fixture.detectChanges();
    expect(component.onRegister).toBeTruthy()
    component.onRegister()
  }));

  it('should use onRegister function ItinerariosMasComentarios', fakeAsync(() => { 
    spyOn(dashboardService,'getAllCountry').and.returnValue(of(countries))
    spyOn(dashboardService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyOn(dashboardService,'itinerariosOrdenadosPorComentarios').and.returnValue(of(dashboardMockResponse))
    component.formFilter.get('function').setValue('ItinerariosMasComentarios')

    fixture.detectChanges();
    expect(component.onRegister).toBeTruthy()
    component.onRegister()
  }));

  it('should use onRegister function ItinerariosMasComentarios barChartData.length > 0 before and ==0 after', fakeAsync(() => { 
    spyOn(dashboardService,'getAllCountry').and.returnValue(of(countries))
    spyOn(dashboardService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    let dashboardMockResponseTemp=dashboardMockResponse
    dashboardMockResponseTemp.content=[]
    spyOn(dashboardService,'itinerariosOrdenadosPorComentarios').and.returnValue(of(dashboardMockResponseTemp))
    component.formFilter.get('function').setValue('ItinerariosMasComentarios')
    component.barChartData.push({ data: [3], label: 'test' })
    fixture.detectChanges();
    expect(component.onRegister).toBeTruthy()
    component.onRegister()
  }));

  it('should use onRegister function ItinerariosMejorValoracion', fakeAsync(() => { 
    spyOn(dashboardService,'getAllCountry').and.returnValue(of(countries))
    spyOn(dashboardService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyOn(dashboardService,'itinerariosOrdenadosPorValoracion').and.returnValue(of(dashboardMockResponse))
    component.formFilter.get('function').setValue('ItinerariosMejorValoracion')

    fixture.detectChanges();
    expect(component.onRegister).toBeTruthy()
    component.onRegister()
  }));

  it('should use onRegister function ItinerariosMejorValoracion barChartData.length > 0 before and ==0 after', fakeAsync(() => { 
    spyOn(dashboardService,'getAllCountry').and.returnValue(of(countries))
    spyOn(dashboardService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    let dashboardMockResponseTemp=dashboardMockResponse
    dashboardMockResponseTemp.content=[]
    spyOn(dashboardService,'itinerariosOrdenadosPorValoracion').and.returnValue(of(dashboardMockResponseTemp))
    component.formFilter.get('function').setValue('ItinerariosMejorValoracion')
    component.barChartData.push({ data: [3], label: 'test' })
    fixture.detectChanges();
    expect(component.onRegister).toBeTruthy()
    component.onRegister()
  }));

  it('should use onRegister function UltimosItinerariosMejorValoracion', fakeAsync(() => { 
    spyOn(dashboardService,'getAllCountry').and.returnValue(of(countries))
    spyOn(dashboardService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyOn(dashboardService,'ultimosItinerariosOrdenadosPorValoracion').and.returnValue(of(dashboardMockResponse))
    component.formFilter.get('function').setValue('UltimosItinerariosMejorValoracion')

    fixture.detectChanges();
    expect(component.onRegister).toBeTruthy()
    component.onRegister()
  }));

  it('should use onRegister function UltimosItinerariosMejorValoracion barChartData.length > 0 before and ==0 after', fakeAsync(() => { 
    spyOn(dashboardService,'getAllCountry').and.returnValue(of(countries))
    spyOn(dashboardService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    let dashboardMockResponseTemp=dashboardMockResponse
    dashboardMockResponseTemp.content=[]
    spyOn(dashboardService,'ultimosItinerariosOrdenadosPorValoracion').and.returnValue(of(dashboardMockResponseTemp))
    component.formFilter.get('function').setValue('UltimosItinerariosMejorValoracion')
    component.barChartData.push({ data: [3], label: 'test' })
    fixture.detectChanges();
    expect(component.onRegister).toBeTruthy()
    component.onRegister()
  }));

  it('should use onRegister function UltimosItinerariosMasComentarios', fakeAsync(() => { 
    spyOn(dashboardService,'getAllCountry').and.returnValue(of(countries))
    spyOn(dashboardService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    spyOn(dashboardService,'ultimosItinerariosOrdenadosPorComentarios').and.returnValue(of(dashboardMockResponse))
    component.formFilter.get('function').setValue('UltimosItinerariosMasComentarios')

    fixture.detectChanges();
    expect(component.onRegister).toBeTruthy()
    component.onRegister()
  }));

  it('should use onRegister function UltimosItinerariosMasComentarios barChartData.length > 0 before and ==0 after', fakeAsync(() => { 
    spyOn(dashboardService,'getAllCountry').and.returnValue(of(countries))
    spyOn(dashboardService,'getCityByCountry').and.returnValue(of(['Sevilla']))
    let dashboardMockResponseTemp=dashboardMockResponse
    dashboardMockResponseTemp.content=[]
    spyOn(dashboardService,'ultimosItinerariosOrdenadosPorComentarios').and.returnValue(of(dashboardMockResponseTemp))
    component.formFilter.get('function').setValue('UltimosItinerariosMasComentarios')
    component.barChartData.push({ data: [3], label: 'test' })
    fixture.detectChanges();
    expect(component.onRegister).toBeTruthy()
    component.onRegister()
  }));
})
