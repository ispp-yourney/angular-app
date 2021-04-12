import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Activity, Itinerary, Landmark } from 'src/app/models/itinerary';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LandmarkService } from 'src/app/services/landmark.service';
import { CommentformComponent } from '../../comment/commentform/commentform.component';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-landmark-show',
  templateUrl: './landmark-show.component.html',
  styleUrls: ['./landmark-show.component.css']
})
export class LandmarkShowComponent implements OnInit {

  constructor(private landmarkService:LandmarkService,private route: ActivatedRoute, private tokenService: TokenService, private router: Router,) { }

  landmark:Landmark;
  isAdmin:boolean;
  containError: boolean = false;
  messageError: string;
  loaded: boolean = false;

  ngOnInit(): void {
    this.loadLandmark();
  }

  loadLandmark(): void {
    this.landmarkService.mostrar(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
      data => {
     console.log(data)
        this.landmark = data;
        //console.log(data)
        this.isAdmin=this.tokenService.getAuthorities().includes('admin')
        this.containError = false
        this.loaded = true;
      },
      err => {
     //console.log(err)
        var returned_error = err.error.text
        if(returned_error == undefined){
          returned_error = 'Ha ocurrido un error'
        }
        this.messageError = returned_error;
        this.containError = true
      }
    );
  }

}
