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

  constructor(private itineraryService: ItineraryService, private activatedRoute: ActivatedRoute, private tokenService: TokenService,private router: Router) { }

  itineraries: Itinerary[] = [];
  numberOfElements: Number;
  totalPages: Array<Number> = [];
  pageId: Number;
  currentUrl:String;

  @Input()
  userId: Number;

  @Input()
  username: String;

  @Input()
  base_url: String;


  ngOnInit(): void {
    this.pageId = Number(this.activatedRoute.snapshot.paramMap.get('id')) - 1;
    //var currentUrl=this.router.url.replace(/\d+/g, '');
  
    if (this.base_url){
      this.currentUrl=this.base_url;
    }else{
      this.currentUrl="/itinerarios"
    }
    
    this.loadUserItineraries(this.pageId, 2);
  }

  loadUserItineraries(pageId: Number, userId: Number): void {
    this.itineraryService.userItineraries(pageId, userId).subscribe(
      data => {
        this.itineraries = data.content;
        var pageArray: Array<Number> = [];
        for (var i = 0; i < data.totalPages+5; i++) {
          pageArray.push(i)
        }
        this.totalPages = pageArray
      },
      err => {
        console.log(err);
      }
    );
  }

}
