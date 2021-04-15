import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BuscadorLandmarkService } from './buscador-landmark.service';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
  put = jasmine.createSpy('httpClient.put')
  delete = jasmine.createSpy('httpClient.delete')
}

describe('BuscadorLandmarkService', () => {
  let service: BuscadorLandmarkService;
  let httpClientMock: HttpClientMock;
  let countryList: string[]
  let cityList: string[]
  let citiesByCountry: string[]
  let landmarkSearchResult: any

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BuscadorLandmarkService,
        {
          provide: HttpClient,
          useClass: HttpClientMock
        }
      ]
    });
    service = TestBed.inject(BuscadorLandmarkService);
    httpClientMock = TestBed.get(HttpClient);

    countryList = [
      "Alemania",
      "Brasil",
      "Cuba",
      "España",
      "Estados Unidos",
      "Finlandia",
      "Francia",
      "fwefq",
      "Italia",
      "Japón",
      "Reino Unido"
    ]
    cityList = [
      "Helsinki",
      "La Habana",
      "Londres",
      "Los Ángeles",
      "Munich",
      "París",
      "qwef",
      "Río de Janeiro",
      "Roma",
      "Sevilla",
      "Tokio"
    ]
    citiesByCountry = [
      "Sevilla"
    ]
    landmarkSearchResult = {
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
        },
        {
          "views": 75,
          "country": "España",
          "latitude": 37.3832718833855,
          "longitude": -5.990287762829736,
          "endPromotionDate": null,
          "image": {
            "imageUrl": "https://multimedia.andalucia.org/fotos/image_249607.jpeg",
            "name": "imagenRealAlcazarDeSevilla",
            "id": "71"
          },
          "description": "Emblemático palacio real de origen árabe con jardines, fuentes, arcos ornamentados y azulejos del siglo XVI.",
          "price": 0,
          "city": "Sevilla",
          "category": "Punto turístico",
          "phone": "+(34) 954502324",
          "website": "https://www.alcazarsevilla.org/",
          "instagram": null,
          "twitter": null,
          "createDate": "2021-01-01T00:00:01",
          "email": null,
          "name": "Real Alcázar de Sevilla",
          "id": 61
        },
        {
          "views": 75,
          "country": "España",
          "latitude": 37.385908828128976,
          "longitude": -5.993128874217623,
          "endPromotionDate": null,
          "image": {
            "imageUrl": "https://multimedia.andalucia.org/fotos/image_104532.jpeg",
            "name": "imagenCatedralDeSevilla",
            "id": "72"
          },
          "description": "Gran catedral gótica con la tumba de Colón y un campanario de estilo árabe con vistas a la ciudad.",
          "price": 0,
          "city": "Sevilla",
          "category": "Punto turístico",
          "phone": "+(34) 902099692",
          "website": "https://www.catedraldesevilla.es/",
          "instagram": null,
          "twitter": null,
          "createDate": "2021-01-01T00:00:01",
          "email": null,
          "name": "Catedral de Sevilla",
          "id": 62
        },
        {
          "views": 75,
          "country": "España",
          "latitude": 37.38541909043881,
          "longitude": -5.99400606331006,
          "endPromotionDate": null,
          "image": {
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a8/Avenida_de_la_Constituci%C3%B3n.jpg",
            "name": "imagenAvenidaDeLaCostitucion",
            "id": "73"
          },
          "description": "Gran avenida situada en el centro de Sevilla.",
          "price": 0,
          "city": "Sevilla",
          "category": "Punto turístico",
          "phone": null,
          "website": null,
          "instagram": null,
          "twitter": null,
          "createDate": "2021-01-01T00:00:01",
          "email": null,
          "name": "Avenida de la Costitución",
          "id": 63
        },
        {
          "views": 75,
          "country": "España",
          "latitude": 37.38256989217136,
          "longitude": -5.9965161355143,
          "endPromotionDate": null,
          "image": {
            "imageUrl": "https://elcorreoweb.es/binrepository/sevilla-torre-del-oro_20193800_20190602135155.jpg",
            "name": "imagenTorreDelOro",
            "id": "70"
          },
          "description": "Torre defensiva exterior construida alrededor de 1220, cuyo nombre responde a diversas teorías.",
          "price": 0,
          "city": "Sevilla",
          "category": "Punto turístico",
          "phone": "+(34) 954222419",
          "website": "https://www.visitasevilla.es/monumentos-y-cultura/torre-del-oro",
          "instagram": null,
          "twitter": null,
          "createDate": "2021-01-01T00:00:01",
          "email": null,
          "name": "Torre del Oro",
          "id": 60
        },
        {
          "views": 75,
          "country": "España",
          "latitude": 37.39348567731709,
          "longitude": -5.991700244607688,
          "endPromotionDate": null,
          "image": {
            "imageUrl": "https://www.espanaguide.com/images/bg/sevilla/setas-de-sevilla-mobile.jpg",
            "name": "imagenLasSetas",
            "id": "75"
          },
          "description": "Estructura escultural de madera con museo arqueológico, pasarela en la azotea y mirador.",
          "price": 0,
          "city": "Sevilla",
          "category": "Punto turístico",
          "phone": "+(34) 606635214",
          "website": "http://www.setasdesevilla.com/",
          "instagram": null,
          "twitter": null,
          "createDate": "2021-01-01T00:00:01",
          "email": null,
          "name": "Las Setas",
          "id": 65
        },
        {
          "views": 75,
          "country": "España",
          "latitude": 37.37597811939473,
          "longitude": -5.989446712742345,
          "endPromotionDate": null,
          "image": {
            "imageUrl": "https://elcorreoweb.es/documents/10157/0/675x413/0c7/675d400/none/10703/KRPT/image_content_19649564_20180308225211.jpg",
            "name": "imagenParqueDeMariaLuisa",
            "id": "76"
          },
          "description": "Amplio parque destacado con plazas pintorescas, jardines paisajísticos, fuentes y monumentos.",
          "price": 0,
          "city": "Sevilla",
          "category": "Parque",
          "phone": "+(34) 955473232",
          "website": "https://www.sevilla.org/ayuntamiento/competencias-areas/area-de-habitat-urbano-cultura-y-turismo/servicio-de-parques-y-jardines/parques/parques-y-jardines-historicos-1/parque-de-maria-luisa",
          "instagram": null,
          "twitter": null,
          "createDate": "2021-01-01T00:00:01",
          "email": null,
          "name": "Parque de Maria Luisa",
          "id": 66
        },
        {
          "views": 75,
          "country": "España",
          "latitude": 37.38938805923123,
          "longitude": -5.994983994882645,
          "endPromotionDate": null,
          "image": {
            "imageUrl": "https://offloadmedia.feverup.com/sevillasecreta.co/wp-content/uploads/2018/12/03053953/shutterstock_791291599-1-1024x597.jpg",
            "name": "imagenCalleTetuan",
            "id": "74"
          },
          "description": "Calle de gran interés turístico de Sevilla.",
          "price": 0,
          "city": "Sevilla",
          "category": "Punto turístico",
          "phone": null,
          "website": null,
          "instagram": null,
          "twitter": null,
          "createDate": "2021-01-01T00:00:01",
          "email": null,
          "name": "Calle Tetuán",
          "id": 64
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
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('check base backend url', () => {
    let url = service.baseUrl;
    expect(url).toBeDefined();
  });

  it('should return all countries', () => {
    const buscadorObservable: Observable<string[]> = of(countryList);
    httpClientMock.get.and.returnValue(buscadorObservable);
    service.getAllCountry()
      .subscribe(buscadorResponse => {
        expect(buscadorResponse).toContain("España")
      });
  });

  it('should return all cities', () => {
    const buscadorObservable: Observable<string[]> = of(cityList);
    httpClientMock.get.and.returnValue(buscadorObservable);
    service.getAllCity()
      .subscribe(buscadorResponse => {
        expect(buscadorResponse).toContain("Sevilla")
      });
  });

  it('should return cities by a country', () => {
    const buscadorObservable: Observable<string[]> = of(citiesByCountry);
    httpClientMock.get.and.returnValue(buscadorObservable);
    service.getCityByCountry("España")
      .subscribe(buscadorResponse => {
        expect(buscadorResponse).toContain("Sevilla")
      });
  });

  it('should return filtered results', () => {
    const buscadorObservable: Observable<any> = of(landmarkSearchResult);
    httpClientMock.get.and.returnValue(buscadorObservable);
    service.landmarkPage("España", "Sevilla", 0)
      .subscribe(buscadorResponse => {
        expect(buscadorResponse.content[0].name).toEqual("Isla Mágica")
      });
  });

});