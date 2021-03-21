import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService implements CanActivate{

  rol: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const expectedRol = route.data.expectedRol;
    const roles = this.tokenService.getAuthorities();
    this.rol = 'user';

    roles.forEach( rol => {
      if(rol == 'ROLE_ADMIN'){
        this.rol = 'admin'
      }
    });
    
    if(!this.tokenService.getToken() || expectedRol.indexOf(this.rol) === -1){
        this.router.navigate(['/']);
        return false;
    }

    return true;


  }
}
