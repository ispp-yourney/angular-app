import { Component, OnInit } from '@angular/core';
import { Activity, Itinerary } from 'src/app/models/itinerary';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { from, of } from 'rxjs';
import { groupBy, reduce, toArray} from 'rxjs/operators';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-itineraryview',
  templateUrl: './itineraryview.component.html',
  styleUrls: ['./itineraryview.component.css']
})
export class ItineraryViewContoller implements OnInit {

  constructor(private itineraryService: ItineraryService) { }

  itinerary: Itinerary
  days: Array<Array<Activity>>
  listNumberDays: Array<number>

  ngOnInit(): void {
    this.loadItinerary()
    
  }

  loadItinerary(): void {
    this.itineraryService.vista().subscribe(
      data => {
        console.log(data)
        this.itinerary = data;
        this.loadDays()
        this.listNumberDays = Array.from({length: this.itinerary.estimatedDays}, (_, i) => i + 1)
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

  groupByKey(array, key) {
    return array
      .reduce((hash, obj) => {
        if(obj[key] === undefined) return hash; 
        return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
      }, {})
  }

  groupByDay(array){
    return array.reduce((r, a) => {
          r[a.day] = r[a.day] || [];
          r[a.day].push(a);
          return r;
      }, Object.create(null));
  }

}
