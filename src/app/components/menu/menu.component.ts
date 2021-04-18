import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;
  loggedUsername: String;
 
  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
    this.loggedUsername=this.tokenService.getUsername()
  }


  reloadMenu(){
    window.location.reload()
  }
  onLogout(): void {
    this.tokenService.logOut();
    this.router.navigate(["/"]).then( () => {this.reloadMenu()} )

  }
}