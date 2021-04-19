import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isLogged = false;
  username: string;
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
      if(this.tokenService.getToken()){
        this.isLogged = true;
        this.username = this.tokenService.getUsername();
      }
  }
}