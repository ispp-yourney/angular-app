import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment-ci';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }
  hostURL = environment.backendEndpoint;

  public nuevo(comment: Comment): Observable<any> {
    var url=this.hostURL + '/comment/create';
    var req = this.httpClient.post<Comment>(url, comment);
    return req;
  }

  public borrar(id: number): Observable<any> {
    var url = this.hostURL + '/comment/delete/' + id;
    var req = this.httpClient.delete<Comment>(url);
    return req;
  }
}
