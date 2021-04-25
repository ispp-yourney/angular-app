import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EmailConfirmationService } from './email-confirmation.service';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
  put = jasmine.createSpy('httpClient.put')
  delete = jasmine.createSpy('httpClient.delete')
}

describe('EmailConfirmationService', () => {
  let service: EmailConfirmationService;
  let httpClientMock: HttpClientMock;
  let nuevoConfirmationResponse: string
  let sendConfirmationCodeResponse: string


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmailConfirmationService,
        {
          provide: HttpClient,
          useClass: HttpClientMock
        }
      ]
    });
    service = TestBed.inject(EmailConfirmationService);
    httpClientMock = TestBed.get(HttpClient);

    nuevoConfirmationResponse = "Se ha creado la confirmacion"
    sendConfirmationCodeResponse = "Se ha mandado la confirmacion"

  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('check base backend url', () => {
    let url = service.hostURL;
    expect(url).toBeDefined();
  });

  it('should return nuevo', () => {
    const emailObservable: Observable<string> = of(nuevoConfirmationResponse);
    httpClientMock.get.and.returnValue(emailObservable);
    service.nuevo('token')
      .subscribe(buscadorResponse => {
        expect(buscadorResponse).toContain("Se ha creado la confirmacion")
      });
  });

  it('should return sendConfirmationCode', () => {
    const emailObservable: Observable<string> = of(sendConfirmationCodeResponse);
    httpClientMock.get.and.returnValue(emailObservable);
    service.sendConfirmationCode('email')
      .subscribe(buscadorResponse => {
        expect(buscadorResponse).toContain("Se ha mandado la confirmacion")
      });
  });
});