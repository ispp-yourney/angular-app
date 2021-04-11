import { Component, Input, OnInit } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-itinerarylist',
  templateUrl: './itinerarylist.component.html',
  styleUrls: ['./itinerarylist.component.css']
})
export class ItinerarylistComponent implements OnInit {

  constructor(private itineraryService: ItineraryService, private activatedRoute: ActivatedRoute, private tokenService: TokenService, private router: Router) { }

  itineraries: Itinerary[] = [];
  numberOfElements: number;
  //totalPages: Array<Number> = [];
  currentUrl: string;
  username:string;
  loggedUsername:string

  totalPages:number;
  currentPage: number = 0;

  /*@Input()
  username_input: String;*/

 /* @Input()
  base_url: String;*/


  ngOnInit(): void {
    this.username = String(this.activatedRoute.snapshot.paramMap.get('username'));

    this.loggedUsername=this.tokenService.getUsername()
    this.loadUserItineraries(this.username,0);
  }
  loadUserItineraries(username: String,page:number): void {
    this.itineraryService.userItineraries(username,page).subscribe(
      data => {
        this.itineraries = data.content;
        this.totalPages= data.totalPages;
      },
      err => {
     //console.log(err);
      }
    );
  }

  count(totalPages:number): Array<number>{
    return Array(totalPages);
  }

  switchPage(page:number){
    this.currentPage=page;
    this.loadUserItineraries(this.username,this.currentPage);
}
}
