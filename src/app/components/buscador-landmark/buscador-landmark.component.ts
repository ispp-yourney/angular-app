import { ThisReceiver } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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

  added: string = "block";

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
  initialPages: Array<number> = [];
  prueba: number  = 0;
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

     
      if(this.totalPages>=3 && this.prueba == 0){
        for (let index = 0; index <3; index++) {
          this.initialPages.push(index)
          this.prueba++;
          
        }
      }else{

       if(this.totalPages>0 && this.totalPages <=2 && this.prueba==0){
        this.initialPages[0] = 0
        this.prueba++;
      }else{

      if(this.totalPages>0 && this.totalPages <=2 && this.currentPage != this.initialPages[0]){
        
        if( this.initialPages[0] + 1 < this.totalPages){
          this.initialPages[0] = this.initialPages[0] + 1
        }else if((this.initialPages[0] + 1) -1 > 0){
          this.initialPages[0] = this.initialPages[0] -1
        }
       
      }
    }
      console.log((this.currentPage) == this.initialPages[this.initialPages.length - 1])
      
      if(this.totalPages>=3 && this.prueba>0 ){
        if((this.currentPage) == this.initialPages[0]){
          if(this.initialPages[this.initialPages.length -1]+1 - 3 > 0){
            for (let index = 0; index < 3; index++) {
                
                  
          
              this.initialPages[index] = this.initialPages[index] -1
      
        
      
          }
          }
        }




        if((this.currentPage) == this.initialPages[this.initialPages.length - 1] ) {


          if(this.initialPages[this.initialPages.length -1] +1 < this.totalPages){
                for (let index = 0; index < 3; index++) {
                
                  
                
                    this.initialPages[index] = this.initialPages[index] + 1
            
                }
        }
}  
}
}

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

       
      switchPage(page:number){
        
          this.currentPage=page;

          this.loadLandmarks(this.formFilter.controls.country.value,this.formFilter.controls.city.value,this.currentPage);

      }

      onRegister(){
        this.loadLandmarks(this.formFilter.controls.country.value,this.formFilter.controls.city.value,0);
      }
      
   
     OnChange(pais:string) {
       this.buscadorLandmarkService.getCityByCountry(pais).subscribe(c => {this.city = c; this.formFilter.controls['city'].setValue('');} )
     }




}
