import { Component, Input, OnInit } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buscador-results',
  templateUrl: './buscador-results.component.html',
  styleUrls: ['./buscador-results.component.css']
})
export class BuscadorResultsComponent implements OnInit {

  @Input()
  itineraries: Itinerary[];

  @Input()
  pageId: number;

  @Input()
  totalPagesInput: number;

  constructor(private router: Router) { }

  
  
  totalPages: Array<Number> = [];

  ngOnInit(): void {
    this.doItineraries(this.itineraries,this.pageId,this.totalPagesInput)

  }
    doItineraries(itineraries: Itinerary[], pageId: number, totalPagesInput: number){

    var pageArray: Array<Number> = [];
    for (var i = 0; i < totalPagesInput; i++)
      pageArray.push(i)
    
    this.totalPages = pageArray

    if (this.totalPages.includes(pageId) == false && pageId!=0)
      this.router.navigateByUrl("/error")
    }



  

}
