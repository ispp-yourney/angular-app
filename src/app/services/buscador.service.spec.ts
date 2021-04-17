import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BuscadorService } from './buscador.service';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
  put = jasmine.createSpy('httpClient.put')
  delete = jasmine.createSpy('httpClient.delete')
}

describe('BuscadorService', () => {
  let service: BuscadorService;
  let httpClientMock: HttpClientMock;
  let countryList: string[]
  let cityList: string[]
  let citiesByCountry: string[]
  let itinerarySearchResult: any

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BuscadorService,
        {
          provide: HttpClient,
          useClass: HttpClientMock
        }
      ]
    });
    service = TestBed.inject(BuscadorService);
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
    itinerarySearchResult = {
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
    const buscadorObservable: Observable<any> = of(itinerarySearchResult);
    httpClientMock.get.and.returnValue(buscadorObservable);
    service.postFilter("España", "Sevilla", 1000, 20, 0)
      .subscribe(buscadorResponse => {
        expect(buscadorResponse.content[0].name).toEqual("Sevilla, tierra de pasión")
      });
  });

});