import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import { Router ,ActivatedRoute} from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import { searchFilter } from 'src/app/models/search-filters';
import { BuscadorService } from '../../services/buscador.service';
import { Itinerary } from 'src/app/models/itinerary';

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  //lastResult: string = ""
  //result : string = "";
  city: string[] = [];
  country: string[] = [];
  formFilter: FormGroup;
  filter: searchFilter;
  itineraries: Itinerary[] = [];
  noItinerariesFound:string;

  search: boolean = false;
  totalPages:number;
  currentPage: number = 0;

  constructor(private buscadorService:BuscadorService, 
              private formBuilder:FormBuilder,
              private router: Router,private activatedRoute: ActivatedRoute){
                this.formFilter = formBuilder.group({
                  country: [''],
                  city: [''],
                  maxBudget: ['', Validators.min(0)],
                  maxDays: ['', Validators.min(0)],
                });
              }

  //static result = "";

  ngOnInit() {
    this.buscadorService.getAllCountry().subscribe(c => {this.country = c; } )
    //this.buscadorService.getAllCity().subscribe(c => {this.city = c; } )     
  }

loadItineraries(country:string,city:string,maxBudget:number,maxDays:number,page:number){
      
    this.buscadorService.postFilter(country,city,maxBudget,maxDays,page).subscribe(
     response => {
      var res = response;
      console.log(res)
      this.itineraries=res.content;
      this.totalPages= res.totalPages;
      console.log(this.itineraries)
      console.log('Totalpages ',this.totalPages)
      console.log('Current page  ',this.currentPage)
      this.search = true
   //console.log("Itinerarios: ",this.itineraries)
      //this.router.navigate(['/buscador']); 
      if(!(this.itineraries.length>0)){
        this.noItinerariesFound="No hay itinerarios según el criterio de busqueda introducido."
      }else{
        this.noItinerariesFound=""
        
      }
     },
     err => {
    //console.log(err);
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

}