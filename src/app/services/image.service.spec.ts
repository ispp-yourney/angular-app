import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ImageService } from './image.service';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
  put = jasmine.createSpy('httpClient.put')
  delete = jasmine.createSpy('httpClient.delete')
}

describe('ImageService', () => {
  let service: ImageService;
  let httpClientMock: HttpClientMock;
  let imageAddResponseMock: { text: string; }
  let imageDeleteResponseMock: { text: string; }
  let image: File;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImageService,
        {
          provide: HttpClient,
          useClass: HttpClientMock
        }
      ]
    });
    service = TestBed.inject(ImageService);
    httpClientMock = TestBed.get(HttpClient);

    imageAddResponseMock = { "text": "La imagen se ha subido correctamente" }
    imageDeleteResponseMock = { "text": "Imagen eliminada correctamente" }
    image = new File([""], "filename", { type: 'text/html' });
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('check base backend url', () => {
    let url = service.hostURL;
    expect(url).toBeDefined();
  });

  it('should add photo for itinerary', () => {
    const imageObservable: Observable<any> = of(imageAddResponseMock);
    httpClientMock.post.and.returnValue(imageObservable);
    service.addItineraryPhoto(1, image)
      .subscribe(imageResponse => {
        expect(imageResponse.text).toEqual("La imagen se ha subido correctamente")
      });
  });

  it('should delete photo for itinerary', () => {
    const imageObservable: Observable<any> = of(imageDeleteResponseMock);
    httpClientMock.delete.and.returnValue(imageObservable);

    service.deleteItineraryPhoto(1)
      .subscribe(imageResponse => {
        expect(imageResponse.text).toEqual("Imagen eliminada correctamente")
      });
  });

  it('should add photo for landmark', () => {
    const imageObservable: Observable<any> = of(imageAddResponseMock);
    httpClientMock.post.and.returnValue(imageObservable);
    service.addLandmarkPhoto(1, image)
      .subscribe(imageResponse => {
        expect(imageResponse.text).toEqual("La imagen se ha subido correctamente")
      });
  });

  it('should delete photo for landmark', () => {
    const imageObservable: Observable<any> = of(imageDeleteResponseMock);
    httpClientMock.delete.and.returnValue(imageObservable);

    service.deleteLandmarkPhoto(1)
      .subscribe(imageResponse => {
        expect(imageResponse.text).toEqual("Imagen eliminada correctamente")
      });
  });

  it('should add photo for user', () => {

    const imageObservable: Observable<any> = of(imageAddResponseMock);
    httpClientMock.post.and.returnValue(imageObservable);
    service.addUserPhoto(image)
      .subscribe(imageResponse => {
        expect(imageResponse.text).toEqual("La imagen se ha subido correctamente")
      });
  });

  it('should delete photo for user', () => {
    const imageObservable: Observable<any> = of(imageDeleteResponseMock);
    httpClientMock.delete.and.returnValue(imageObservable);

    service.deleteUserPhoto()
      .subscribe(imageResponse => {
        expect(imageResponse.text).toEqual("Imagen eliminada correctamente")
      });
  });
});