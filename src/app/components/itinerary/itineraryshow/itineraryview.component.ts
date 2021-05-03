import { Component, OnInit } from '@angular/core';
import { Activity, Itinerary } from 'src/app/models/itinerary';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-itineraryview',
  templateUrl: './itineraryview.component.html',
  styleUrls: ['./itineraryview.component.css']
})
export class ItineraryViewComponent implements OnInit  {
 
  constructor(private itineraryService: ItineraryService, private route: ActivatedRoute, private tokenService: TokenService, private router: Router, private toastr: ToastrService ) { }

  itinerary: Itinerary;
  days: Array<Array<Activity>>;
  listNumberDays: Array<number>;
  isMyItinerary: boolean;
  containError: boolean = false;
  messageError: string;
  loadedItineraries:boolean;
  isAdmin:boolean = false;

  ngOnInit(): void {
    this.loadItinerary()
    
  }

 
  loadItinerary(): void {
    this.itineraryService.vista(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
      data => {
        this.itinerary = data;
        this.loadDays()
        this.listNumberDays = Array.from({length: Object.keys(this.days).length}, (_, i) => i + 1)
        this.isMyItinerary = (this.tokenService.getUsername() != null) && (this.tokenService.getUsername().length>0) && (this.tokenService.getUsername() == this.itinerary.username)
        if(this.tokenService.getAuthorities().length > 0){
          this.isAdmin = this.tokenService.getAuthorities()[0]['authority'] == 'ROLE_ADMIN';
        }
        this.containError = false
        this.loadedItineraries = true;
      },
      err => {
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

  deleteItinerary(): void {
    this.itineraryService.delete(this.itinerary.id).subscribe(
      data => {
        this.router.navigateByUrl('/perfil/' + this.tokenService.getUsername())
        this.containError = false
        this.toastr.success("Itinerario eliminado correctamente.")
      },
      err => {
        var returned_error = err.error.text
        if(returned_error == undefined){
          returned_error = 'Ha ocurrido un error'
        }
        this.messageError = returned_error;
        this.containError = true
        this.toastr.error("Se ha producido un error en la eliminación.")
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

  
  getSeason(season: string){
      let recommendedSeason: string;

      if(season == 'WINTER'){
        recommendedSeason = 'Invierno'
      }else if(season == 'SUMMER'){
        recommendedSeason = 'Verano'
      }else if(season == 'FALL'){
        recommendedSeason = 'Otoño'
      }else if(season == 'SPRING'){
        recommendedSeason = 'Primavera'
      }else{
        recommendedSeason = 'Cualquiera'
      }

      return recommendedSeason;
  }

  countStars(stars: number) {
    return Array(Math.round(stars))
  }

  countNoStars(stars: number) {
    return Array(5 - Math.round(stars))
  }

}
