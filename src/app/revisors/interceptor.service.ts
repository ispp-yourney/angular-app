import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var newReq = req;
  
    const token = this.tokenService.getToken();



    if( token != null){
      newReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer' + " "+token) })
    }

    return next.handle(newReq);
  }


}


export const interceptor = [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }]

