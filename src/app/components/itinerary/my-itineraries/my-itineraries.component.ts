import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-my-itineraries',
  templateUrl: './my-itineraries.component.html',
  styleUrls: ['./my-itineraries.component.css']
})
export class MyItinerariesComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  loggedUsername: String;

  ngOnInit(): void {
    this.loggedUsername=this.tokenService.getUsername()
  }

}
