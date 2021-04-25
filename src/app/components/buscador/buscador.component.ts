import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { SearchFilter } from 'src/app/models/search-filters';
import { BuscadorService } from '../../services/buscador.service';
import { Itinerary } from 'src/app/models/itinerary';
import { TokenService } from 'src/app/services/token.service';

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  city: string[] = [];
  country: string[] = [];
  formFilter: FormGroup;
  filter: SearchFilter;
  itineraries: Itinerary[] = [];
  noItinerariesFound:string;
  totalElements: number;

  search: boolean = false;
  totalPages:number;
  currentPage: number = 0;
  initialPages: Array<number> = [];
  
  tmpCountry:string = "";
  tmpCity:string = "";
  tmpMaxBudget:number = 4000000;
  tmpMaxDays:number = 365;

  isLogged: boolean = false;

  constructor(private buscadorService:BuscadorService, 
              private formBuilder:FormBuilder,
              private router: Router,private activatedRoute: ActivatedRoute, private tokenService: TokenService){
                this.formFilter = formBuilder.group({
                  country: [''],
                  city: [''],
                  maxBudget: ['', [Validators.pattern("^[+]?\\d*\\.?\\d{0,6}$"), Validators.maxLength(8)] ],
                  maxDays: ['', Validators.pattern("^\\d{1,3}$") ],
                });
              }

  ngOnInit() {
    this.buscadorService.getAllCountry().subscribe(c => {this.country = c; } )

    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
  }

loadItineraries(country:string,city:string,maxBudget:number,maxDays:number,page:number){
      
    this.buscadorService.postFilter(country,city,maxBudget,maxDays,page-1).subscribe(
     response => {
      var res = response;
      this.currentPage = 0
      this.itineraries=res.content;
      this.totalPages= res.totalPages;
      this.totalElements = res.totalElements

      this.tmpCity = city
      this.tmpCountry = country
      this.tmpMaxBudget = maxBudget
      this.tmpMaxDays = maxDays




      this.search = true
      if(!(this.itineraries.length>0)){
        this.noItinerariesFound="No hay itinerarios según el criterio de busqueda introducido."
      }else{
        this.noItinerariesFound=""
        
      }
     },
     err => {
       
     })                         
  }

  getPage(page:number){
      
    this.buscadorService.postFilter(this.tmpCountry,this.tmpCity,this.tmpMaxBudget,this.tmpMaxDays,page-1).subscribe(
     response => {
      var res = response;
      
      this.itineraries=res.content;
      this.totalPages= res.totalPages;
      this.totalElements = res.totalElements
      this.search = true
      if(!(this.itineraries.length>0)){
        this.noItinerariesFound="No hay itinerarios según el criterio de busqueda introducido."
      }else{
        this.noItinerariesFound=""
        
      }
     },
     err => {
       
     })                         
  }

  

  
  onRegister(){
  
    this.loadItineraries(this.formFilter.controls.country.value,this.formFilter.controls.city.value, this.formFilter.controls.maxBudget.value, this.formFilter.controls.maxDays.value,1);
  }

  OnChange(pais:string) {
    this.buscadorService.getCityByCountry(pais).subscribe(c => {this.city = c; this.formFilter.controls['city'].setValue('');} )
   
  }

  countStars(stars:number){
    return Array(Math.round( stars ))
 }

 countNoStars(stars:number){
  
  return Array(5-Math.round( stars ))
}

inputClass(form:FormGroup,property: string){
  let inputClass: string;

  if(!form.get(property).touched){
    inputClass = "form-control"
  }else if(form?.get(property).touched && form?.get(property).valid){
    inputClass = "form-control is-valid"
  }else if(form?.get(property).touched && form?.get(property).invalid){
    inputClass = "form-control is-invalid"
  }

  return inputClass
  }

}