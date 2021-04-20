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

  search: boolean = false;
  totalPages:number;
  currentPage: number = 0;
  initialPages: Array<number> = [];
  prueba: number  = 0;

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
      
    this.buscadorService.postFilter(country,city,maxBudget,maxDays,page).subscribe(
     response => {
      var res = response;
      
      this.itineraries=res.content;
      this.totalPages= res.totalPages;

      if (res.totalPages - 1 < page) {
        this.initialPages = [];
        this.currentPage = 0
        this.initialPages[0] = 0
        this.loadItineraries(country, city, maxBudget, maxDays, 0);
        return;
      }
      

      this.search = true

      if(this.totalPages>=3 && this.prueba == 0){
       
        this.currentPage = 0
        this.initialPages = []
        for (let index = 0; index <3; index++) {
          this.initialPages.push(index)
          this.prueba++;
        }
      }else{
       if(this.totalPages>0 && this.totalPages <=2 && this.prueba==0){
        this.currentPage = 0
        this.initialPages = []
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
      if(!(this.itineraries.length>0)){
        this.noItinerariesFound="No hay itinerarios según el criterio de busqueda introducido."
      }else{
        this.noItinerariesFound=""
        
      }
     },
     err => {
       
     })                         
  }

  count(totalPages:number): Array<number>{
    return Array(totalPages);
  }
      
  switchPage(page:number){
      this.currentPage=page;
      console.log(this.currentPage)
      this.loadItineraries(this.formFilter.controls.country.value,this.formFilter.controls.city.value, this.formFilter.controls.maxBudget.value, this.formFilter.controls.maxDays.value,this.currentPage);
  }

  onRegister(){
    this.prueba = 0
    this.loadItineraries(this.formFilter.controls.country.value,this.formFilter.controls.city.value, this.formFilter.controls.maxBudget.value, this.formFilter.controls.maxDays.value,0);
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