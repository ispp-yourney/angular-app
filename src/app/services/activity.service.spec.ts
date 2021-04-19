import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ActivityDto } from '../models/itinerary';
import { Observable, of } from 'rxjs';
import { ActivityService } from './activity.service';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
  put = jasmine.createSpy('httpClient.put')
  delete = jasmine.createSpy('httpClient.delete')
}

describe('ActivityService', () => {
  let service: ActivityService;
  let httpClientMock: HttpClientMock;
  let activityDto: ActivityDto;
  let activityDeleteResponseMock: { text: string; }


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActivityService,
        {
          provide: HttpClient,
          useClass: HttpClientMock
        }
      ]
    });
    service = TestBed.inject(ActivityService);
    httpClientMock = TestBed.get(HttpClient);

    activityDto = new ActivityDto(1, "Test Activity", "This is a test activity", 1, 1, 1);
    activityDeleteResponseMock = { "text": "Actividad eliminada correctamente" }
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('check base backend url', () => {
    let url = service.hostURL;
    expect(url).toBeDefined();
  });

  it('should create activity', () => {
    const activityObservable: Observable<any> = of(activityDto);
    httpClientMock.post.and.returnValue(activityObservable);
    service.nuevo(activityDto)
      .subscribe(activityResponse => {
        expect(activityResponse.title).toEqual("Test Activity")
      });
  });

  it('should edit activity', () => {
    const activityObservable: Observable<any> = of(activityDto);
    httpClientMock.put.and.returnValue(activityObservable);
    service.editar(activityDto)
      .subscribe(activityResponse => {
        expect(activityResponse.title).toEqual("Test Activity")
      });
  });

  it('should delete activity', () => {
    const activityObservable: Observable<any> = of(activityDeleteResponseMock);
    httpClientMock.delete.and.returnValue(activityObservable);
    service.borrar(1)
      .subscribe(activityResponse => {
        expect(activityResponse.text).toEqual("Actividad eliminada correctamente")
      });
  });

  it('should show activity', () => {
    const activityObservable: Observable<any> = of(activityDto);
    httpClientMock.get.and.returnValue(activityObservable);
    service.show(1)
      .subscribe(activityResponse => {
        expect(activityResponse.title).toEqual("Test Activity")
      });
  });

});