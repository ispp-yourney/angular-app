import { Component, OnInit } from '@angular/core';
import { Activity, Itinerary } from 'src/app/models/itinerary';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { from, of } from 'rxjs';
import { groupBy, reduce, toArray} from 'rxjs/operators';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-itineraryview',
  templateUrl: './itineraryview.component.html',
  styleUrls: ['./itineraryview.component.css']
})
export class ItineraryViewContoller implements OnInit {

  constructor(private itineraryService: ItineraryService, private route: ActivatedRoute, private tokenService: TokenService) { }

  itinerary: Itinerary
  days: Array<Array<Activity>>
  listNumberDays: Array<number>
  isMyItinerary: boolean

  ngOnInit(): void {
    this.loadItinerary()
    
  }

  loadItinerary(): void {
    this.itineraryService.vista(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
      data => {
        console.log(data)
        this.itinerary = data;
        this.loadDays()
        this.listNumberDays = Array.from({length: Object.keys(this.days).length}, (_, i) => i + 1)
        this.isMyItinerary = (this.tokenService != null) && (this.tokenService.getUsername!=null) && (this.tokenService.getUsername.length>0) && (this.tokenService.getUsername.toString === this.itinerary.username.toString)
      },
      err => {
        console.log(err);
      }
    );
  }


  loadDays(): void {
    const activities: Array<Activity> = this.itinerary.activities
    this.days = this.groupByDay(activities)
  }

  deleteItinerary(): void {
    this.itineraryService.delete(this.itinerary.id).subscribe(
      data => {
        console.log(data)
      },
      err => {
        console.log(err)
      }
    )
  }

  groupByDay(array){
    var a = array.reduce((r, a) => {
          r[a.day] = r[a.day] || [];
          r[a.day].push(a);
          return r;
      }, Object.create(null));
    return a
  }

}
