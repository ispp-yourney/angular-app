import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Itinerary, Landmark } from 'src/app/models/itinerary';
import { SearchFilterLandmark } from 'src/app/models/search-filters';


import { BuscadorLandmarkService } from 'src/app/services/buscador-landmark.service';
import { BuscadorService } from 'src/app/services/buscador.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-buscador-landmark',
  templateUrl: './buscador-landmark.component.html',
  styleUrls: ['./buscador-landmark.component.css']
})
export class BuscadorLandmarkComponent implements OnInit {

  @Output()
  landmarkId: EventEmitter<number> = new EventEmitter<number>();

  passData(id: number){
     
      this.landmarkId.emit(id);
  }
  
  //lastResult: string = ""
  //result : string = "";
  city: string[] = [];
  name:string[] = [];
  country: string[] = [];
  formFilter: FormGroup;
  filter: SearchFilterLandmark;
  landmarks: Landmark[] = [];
  noLandmarksFound:string;
  search: boolean = false;
  totalPages:number;
  currentPage: number = 0;
  
  @Input()
  create:boolean;

  isLogged: boolean = false;

  constructor(private buscadorLandmarkService: BuscadorLandmarkService, 
    private formBuilder:FormBuilder,
    private router: Router,private activatedRoute: ActivatedRoute, private tokenService: TokenService) { 

      this.formFilter = formBuilder.group({
        country: [''],
        city: ['']
        
      });


    }

  ngOnInit(): void {
    this.buscadorLandmarkService.getAllCountry().subscribe(c => {this.country = c;} )

    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
    
  }


  loadLandmarks(country:string,city:string,page:number){

    this.buscadorLandmarkService.landmarkPage(country,city,page).subscribe(
    response => {
      var res = response;
      this.landmarks= res.content;
      this.totalPages= res.totalPages;
      console.log(this.landmarks)
      console.log(this.totalPages)
      this.search = true
      //console.log("Itinerarios: ",this.itineraries)
     
      if(!(this.landmarks.length>0)){
        this.noLandmarksFound="No hay puntos de interés según el criterio de busqueda introducido."
      }else{
        this.noLandmarksFound=""
      }
     },
     err => {
         //console.log(err);
     });

    }

      count(totalPages:number): Array<number>{
        return Array(totalPages);
      }
          
      switchPage(page:number){
          this.currentPage=page;
          console.log(this.currentPage)
          this.loadLandmarks(this.formFilter.controls.country.value,this.formFilter.controls.city.value,this.currentPage);
      }

      onRegister(){
        this.loadLandmarks(this.formFilter.controls.country.value,this.formFilter.controls.city.value,0);
      }
      
   
     OnChange(pais:string) {
       this.buscadorLandmarkService.getCityByCountry(pais).subscribe(c => {this.city = c; this.formFilter.controls['city'].setValue('');} )
     }




}
