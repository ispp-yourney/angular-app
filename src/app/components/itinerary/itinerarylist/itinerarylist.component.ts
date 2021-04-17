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
  numberOfElements: number;
  currentUrl: string;
  username:string;
  loggedUsername:string

  totalPages:number;
  currentPage: number = 0;
  initialPages: Array<number> = [];
  prueba: number  = 0;


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

        if(this.totalPages>=3 && this.prueba == 0){
          for (let index = 0; index <3; index++) {
            this.initialPages.push(index)
            this.prueba++;
          }
        }else{
         if(this.totalPages>0 && this.totalPages <=2 && this.prueba==0){
          this.initialPages[0] = 0
          this.prueba++;
        }else{
        if(this.totalPages>0 && this.totalPages <=2 && this.currentPage != this.initialPages[0]){
          if( this.initialPages[0] + 1 < this.totalPages){
            this.initialPages[0] = this.initialPages[0] + 1
          }else if((this.initialPages[0] + 1) -1 > 0){
            this.initialPages[0] = this.initialPages[0] -1
          }
        }
      }
        if(this.totalPages>=3 && this.prueba>0 ){
          if((this.currentPage) == this.initialPages[0]){
            if(this.initialPages[this.initialPages.length -1]+1 - 3 > 0){
              for (let index = 0; index < 3; index++) {      
                this.initialPages[index] = this.initialPages[index] -1
            }
            }
          }
          if((this.currentPage) == this.initialPages[this.initialPages.length - 1] ) {
            if(this.initialPages[this.initialPages.length -1] +1 < this.totalPages){
                  for (let index = 0; index < 3; index++) {        
                      this.initialPages[index] = this.initialPages[index] + 1
                  }
          }
  }  
  }
  }
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
