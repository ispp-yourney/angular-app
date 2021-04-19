import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { LandmarkService } from './landmark.service';
import { Landmark, LandmarkDto, UpgradeLandmarkDto } from '../models/itinerary';
import { Observable, of } from 'rxjs';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
  put = jasmine.createSpy('httpClient.put')
  delete = jasmine.createSpy('httpClient.delete')
}

describe('LandmarkService', () => {
  let service: LandmarkService;
  let httpClientMock: HttpClientMock;
  let landmarkMockResponse: Landmark;
  let landmarkMockDto: LandmarkDto;
  let landmarkUpgradeMockDto: UpgradeLandmarkDto;
  let landmarkDeleteResponse: { text: string; }

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
    service = TestBed.inject(LandmarkService);
    httpClientMock = TestBed.get(HttpClient);

    const createDate = new Date("2021-01-01T00:00:01");
    const endPromotionDate = new Date("2021-08-01T00:00:01");
    landmarkMockResponse = {
      "id": 1,
      "name": "Teatro Chino de Grauman",
      "description": "Famoso teatro que se ecuentra en Hollywood Boulevard. Grandes celebridades asisten a los estrenos que allí se realizan.",
      "price": 21.75,
      "country": "Estados Unidos",
      "city": "Los Ángeles",
      "latitude": 34.1022362941919,
      "longitude": -118.34090682908928,
      "endPromotionDate": endPromotionDate,
      "category": "Cine",
      "email": "info@chinesetheatres.com",
      "phone": "+(01) 323464514",
      "website": "http://www.tclchinesetheatres.com/",
      "instagram": null,
      "twitter": null,
      "createDate": createDate,
      "views": 44,
      "image": {
        "id": 11,
        "name": "imagenTeatroChinoDeGrauman",
        "imageUrl": "https://images2.minutemediacdn.com/image/upload/c_crop,h_1191,w_2121,x_0,y_160/v1554925523/shape/mentalfloss/21817-istock-515672264.jpg?itok=AYt9udYR"
      },
    };

    landmarkMockDto = new LandmarkDto(0, "Landmark test", "This is a landmark text", 0, "string", "string", 0, 0, "string", "string", "string", "string", "string", "string", null)

    landmarkUpgradeMockDto = new UpgradeLandmarkDto("Paypal redirection")

    landmarkDeleteResponse ={"text":"El punto de interes se ha borrado correctamente"};
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('check base backend url', () => {
    let url = service.hostURL;
    expect(url).toBeDefined();
  });

  it('should show landmark', () => {
    const landmarkObservable: Observable<Landmark> = of(landmarkMockResponse);
    httpClientMock.get.and.returnValue(landmarkObservable);

    service.mostrar(1)
      .subscribe(landmarkResponse => {
        expect(landmarkResponse.name).toEqual("Teatro Chino de Grauman");
      });
  });

  it('should create landmark', () => {
    const landmarkObservable: Observable<LandmarkDto> = of(landmarkMockDto);
    httpClientMock.post.and.returnValue(landmarkObservable);

    service.nuevo(landmarkMockDto)
      .subscribe(landmarkResponse => {
        expect(landmarkResponse.name).toEqual("Landmark test");
      });
  });

  it('should edit landmark', () => {
    const landmarkObservable: Observable<LandmarkDto> = of(landmarkMockDto);
    httpClientMock.put.and.returnValue(landmarkObservable);

    service.editar(landmarkMockDto)
      .subscribe(landmarkResponse => {
        expect(landmarkResponse.name).toEqual("Landmark test");
      });
  });

  it('should upgrade landmark', () => {
    const landmarkObservable: Observable<UpgradeLandmarkDto> = of(landmarkUpgradeMockDto);
    httpClientMock.get.and.returnValue(landmarkObservable);
    service.upgradeLandmark(1)
      .subscribe(landmarkResponse => {
        expect(landmarkResponse.text).toEqual("Paypal redirection")
      });
  });

  it('should delete landmark', () => {
    const landmarkObservable: Observable<any> = of(landmarkDeleteResponse);
    httpClientMock.delete.and.returnValue(landmarkObservable);
    service.deleteLandmark(1)
      .subscribe(landmarkResponse => {
        expect(landmarkResponse.text).toEqual("El punto de interes se ha borrado correctamente")
      });
  });

  it('should determine activities existence', () => {
    const landmarkObservable: Observable<boolean> = of(true);
    httpClientMock.get.and.returnValue(landmarkObservable);
    service.tieneActividades(1)
      .subscribe(landmarkResponse => {
        expect(landmarkResponse).toEqual(true)
      });
  });

});