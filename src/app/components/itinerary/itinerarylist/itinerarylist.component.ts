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

  constructor(private itineraryService: ItineraryService,private route: ActivatedRoute, private tokenService: TokenService) { }

  itineraries: Itinerary[] = [];
  numberOfElements: Number;
  totalPages: Array<Number>=[];
  pageId: Number;

  @Input()
  userId: Number;
  
  username: String;


  ngOnInit(): void {
    this.pageId = Number(this.route.snapshot.paramMap.get('id')) -1;
    this.username=this.tokenService.getUsername()

    this.loadUserItineraries(this.pageId,this.userId);
  }

  loadUserItineraries(pageId: Number, userId: Number): void {
    this.itineraryService.userItineraries(pageId,userId).subscribe(
      data => {
        //console.log(data)
        this.itineraries = data.content;
        var pageArray:Array<Number>=[];
        for(var i = 0; i < data.totalPages+5; i++)
          {
            pageArray.push(i)
          }
        this.totalPages=pageArray
      },
      err => {
        console.log(err);
      }
    );
  }

}
