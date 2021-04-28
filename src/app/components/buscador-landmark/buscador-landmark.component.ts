import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
import {  Landmark } from 'src/app/models/itinerary';
import { SearchFilterLandmark } from 'src/app/models/search-filters';


import { BuscadorLandmarkService } from 'src/app/services/buscador-landmark.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-buscador-landmark',
  templateUrl: './buscador-landmark.component.html',
  styleUrls: ['./buscador-landmark.component.css']
})
export class BuscadorLandmarkComponent implements OnInit {

  added: string = "block";

  @Output()
  landmarkId: EventEmitter<Landmark> = new EventEmitter<Landmark>();

  passData(landmark: Landmark){
     
      this.landmarkId.emit(landmark);
      

  }
  
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
  filterClick: boolean = false;
  totalElements:number;

  tmpCountry:string = "";
  tmpCity:string = "";


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
    this.buscadorLandmarkService.landmarkPage(country,city,page-1).subscribe(
    response => {

      var res = response;
      this.currentPage = 0
      this.landmarks= res.content;
      this.totalPages= res.totalPages;
      this.totalElements = res.totalElements

      this.tmpCity = city
      this.tmpCountry = country
     

      this.search = true
     
      if(this.landmarks.length<=0){
        this.noLandmarksFound="No hay puntos de interés según el criterio de busqueda introducido."
      }else{
        this.noLandmarksFound=""
      }
     },
     err => {
       
     });

    }


    getPage(page:number){

      



      this.buscadorLandmarkService.landmarkPage(this.tmpCountry,this.tmpCity,page-1).subscribe(
      response => {
        var res = response;
        this.landmarks= res.content;
        this.totalPages= res.totalPages;
        this.totalElements = res.totalElements

       
       
  
        this.search = true
       
        if(this.landmarks.length<=0){
          this.noLandmarksFound="No hay puntos de interés según el criterio de busqueda introducido."
        }else{
          this.noLandmarksFound=""
        }
       },
       err => {
         
       });
  
      }

      onRegister(){
       
        this.loadLandmarks(this.formFilter.controls.country.value,this.formFilter.controls.city.value,1);
      }
      
   
     OnChange(pais:string) {
      
       this.buscadorLandmarkService.getCityByCountry(pais).subscribe(c => {this.city = c; this.formFilter.controls['city'].setValue('');} )

      
         
      
       }

      estaPromocionado(fecha:Date){
        let fechaActual = new Date();
        let fechaLandmark = new Date(fecha);
        return fechaActual<fechaLandmark;
      }

     }