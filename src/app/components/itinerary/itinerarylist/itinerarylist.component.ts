import { Component, OnInit } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-itinerarylist',
  templateUrl: './itinerarylist.component.html',
  styleUrls: ['./itinerarylist.component.css']
})
export class ItinerarylistComponent implements OnInit {

  constructor(private itineraryService: ItineraryService, private activatedRoute: ActivatedRoute, private tokenService: TokenService, private router: Router) { }

  itineraries: Itinerary[] = [];
  totalElements: number;
  currentUrl: string;
  username:string;
  loggedUsername:string

  totalPages:number;
  currentPage: number = 0;
  


  ngOnInit(): void {
    this.username = String(this.activatedRoute.snapshot.paramMap.get('username'));

    this.loggedUsername=this.tokenService.getUsername()
    this.loadUserItineraries(this.username,1);
  }
  loadUserItineraries(username: String,page:number): void {
    this.itineraryService.userItineraries(username,page-1).subscribe(
      data => {

        this.itineraries = data.content;
        this.totalPages= data.totalPages;
        this.totalElements = data.totalElements;
     
      },
      err => {
        
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
