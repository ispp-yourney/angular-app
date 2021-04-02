import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity, Itinerary } from 'src/app/models/itinerary';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-itineraryupdate',
  templateUrl: './itineraryupdate.component.html',
  styleUrls: ['./itineraryupdate.component.css']
})
export class ItineraryupdateComponent implements OnInit {

  constructor(private itineraryService: ItineraryService, private route: ActivatedRoute, private tokenService: TokenService, private router: Router) { }

  itinerary: Itinerary
  days: Array<Array<Activity>>
  listNumberDays: Array<number>
  isMyItinerary: boolean
  containError: boolean = false
  messageError: string

  ngOnInit(): void {
  }

  loadItinerary(): void {
    this.itineraryService.vista(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
      data => {
        console.log(data)
        this.itinerary = data;
        this.loadDays()
        this.listNumberDays = Array.from({length: Object.keys(this.days).length}, (_, i) => i + 1)
        this.isMyItinerary = (this.tokenService != null) && (this.tokenService.getUsername().length>0) && (this.tokenService.getUsername() === this.itinerary.username)
        this.containError = false
      },
      err => {
        console.log(err)
        var returned_error = err.error.text
        if(returned_error == undefined){
          returned_error = 'Ha ocurrido un error'
        }
        this.messageError = returned_error;
        this.containError = true
      }
    );
  }

  loadDays(): void {
    const activities: Array<Activity> = this.itinerary.activities
    this.days = this.groupByDay(activities)
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
