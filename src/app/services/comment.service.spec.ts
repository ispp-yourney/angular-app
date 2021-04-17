import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment';
import { Observable, of } from 'rxjs';
import { CommentService } from './comment.service';
import { Author } from '../models/itinerary';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
  put = jasmine.createSpy('httpClient.put')
  delete = jasmine.createSpy('httpClient.delete')
}

describe('CommentService', () => {
  let service: CommentService;
  let httpClientMock: HttpClientMock;
  let comment: Comment
  let commentDeleteResponse: { text: string; }



  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentService,
        {
          provide: HttpClient,
          useClass: HttpClientMock
        }
      ]
    });
    service = TestBed.inject(CommentService);
    httpClientMock = TestBed.get(HttpClient);

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
    comment = new Comment(1, "Me parece muy buen itinerario", 5);
    commentDeleteResponse = { "text": "Comentario eliminado correctamente" }
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('check base backend url', () => {
    let url = service.hostURL;
    expect(url).toBeDefined();
  });

  it('should add comment', () => {
    const commentObservable: Observable<any> = of(comment);
    httpClientMock.post.and.returnValue(commentObservable);
    service.nuevo(comment)
      .subscribe(commentResponse => {
        expect(commentResponse.content).toEqual("Me parece muy buen itinerario")
      });
  });

  it('should delete comment', () => {
    const commentObservable: Observable<any> = of(commentDeleteResponse);
    httpClientMock.delete.and.returnValue(commentObservable);
    service.borrar(1)
      .subscribe(commentResponse => {
        expect(commentResponse.text).toEqual("Comentario eliminado correctamente")
      });
  });
});