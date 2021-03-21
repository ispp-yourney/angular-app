import { Component, OnInit } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary';
import { ItineraryService } from 'src/app/services/itinerary.service';

@Component({
  selector: 'app-itinerarylist',
  templateUrl: './itinerarylist.component.html',
  styleUrls: ['./itinerarylist.component.css']
})
export class ItinerarylistComponent implements OnInit {

  constructor(private itineraryService: ItineraryService) { }

  itineraries: Itinerary[] = [];

  ngOnInit(): void {
    this.cargarItineraries();
  }

  cargarItineraries(): void {
    this.itineraryService.lista().subscribe(
      data => {
        this.itineraries = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  displayedColumns: string[] = ['id', 'name'];
  //dataSource = this.itineraries;
  
}
