import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yourney-angular-app';

  constructor(private tokenService: TokenService, private toastr: ToastrService, private router: Router){

  }

  private isExpiredToken(token:string){
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  ngOnInit() {
    if ( this.tokenService.getToken() && this.isExpiredToken(this.tokenService.getToken())) {
      this.tokenService.logOut();
      this.toastr.error("Su sesión ha expirado.")
      this.router.navigate(["/"]).then( () => {window.location.reload()} )
    }
  }


 

}
