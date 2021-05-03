import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { LandmarkService } from './landmark.service';
import { Landmark, Itinerary, ItineraryDto, Author, Activity } from '../models/itinerary';
import { Comment } from '../models/comment';
import { Observable, of } from 'rxjs';
import { ItineraryService } from './itinerary.service';
import { ItineraryUserPage } from '../models/itineraryUserPage';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
  put = jasmine.createSpy('httpClient.put')
  delete = jasmine.createSpy('httpClient.delete')
}

describe('ItineraryService', () => {
  let service: ItineraryService;
  let httpClientMock: HttpClientMock;
  let itineraryMockResponse: Itinerary;
  let itineraryMockDto: ItineraryDto;
  let itineraryUserPageMockResponse: ItineraryUserPage


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LandmarkService,
        {
          provide: HttpClient,
          useClass: HttpClientMock
        }
      ]
    });
    service = TestBed.inject(ItineraryService);
    httpClientMock = TestBed.get(HttpClient);

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
    itineraryUserPageMockResponse = {
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
      "totalPages": 1,
      "totalElements": 10,
      "numberOfElements": 3,
    }

    itineraryMockResponse = {
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

    itineraryMockDto = new ItineraryDto(0, "Itinerary test", "Description test", 1, 100, "WINTER", "DRAFT")

  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('check base backend url', () => {
    let url = service.hostURL;
    expect(url).toBeDefined();
  });

  it('should return user itineraries', () => {
    const itineraryObservable: Observable<ItineraryUserPage> = of(itineraryUserPageMockResponse);
    httpClientMock.get.and.returnValue(itineraryObservable);
    service.userItineraries("alejandro1cortes", 0)
      .subscribe(itineraryResponse => {
        expect(itineraryResponse.content[0].name).toEqual("Una semana en Los Ángeles")
      });
  });

  it('should show itinerary', () => {
    const itineraryObservable: Observable<Itinerary> = of(itineraryMockResponse);
    httpClientMock.get.and.returnValue(itineraryObservable);
    service.vista(1)
      .subscribe(itineraryResponse => {
        expect(itineraryResponse.name).toEqual("Una semana en Los Ángeles")
      });
  });

  it('should create itinerary', () => {
    const itineraryObservable: Observable<ItineraryDto> = of(itineraryMockDto);
    httpClientMock.post.and.returnValue(itineraryObservable);
    service.nuevo(itineraryMockDto)
      .subscribe(itineraryResponse => {
        expect(itineraryResponse.name).toEqual("Itinerary test")
      });
  });

  it('should edit itinerary', () => {
    const itineraryObservable: Observable<ItineraryDto> = of(itineraryMockDto);
    httpClientMock.put.and.returnValue(itineraryObservable);
    service.editar(itineraryMockDto)
      .subscribe(itineraryResponse => {
        expect(itineraryResponse.name).toEqual("Itinerary test")
      });
  });

  it('should delete itinerary', () => {
    const itineraryMockDelete = { "text": "Itinerario eliminado correctamente" }
    const itineraryObservable: Observable<any> = of(itineraryMockDelete);
    httpClientMock.delete.and.returnValue(itineraryObservable);
    service.delete(1)
      .subscribe(itineraryResponse => {
        expect(itineraryResponse.text).toEqual("Itinerario eliminado correctamente")
      });
  });
});