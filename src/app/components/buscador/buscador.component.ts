import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
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
  lastResult: string = ""
  result : string = "";
  city: string[] = [];
  country: string[] = [];
  formFilter: FormGroup;
  filter: searchFilter;
  itineraries: Itinerary[] = [];
  noItinerariesFound:string;

  constructor(private buscadorService:BuscadorService, 
              private formBuilder:FormBuilder,
              private router: Router){
                this.formFilter = formBuilder.group({
                  country: [''],
                  city: [''],
                  maxBudget: ['', Validators.min(0)],
                  maxDays: ['', Validators.min(0)],
                });
              }

  static result = "";

  ngOnInit() {

    this.buscadorService.getAllCountry().subscribe(c => {this.country = c; } )
    //this.buscadorService.getAllCity().subscribe(c => {this.city = c; } )     
  }

  onRegister(){
    console.log('Pais: '+this.formFilter.value.country)
    console.log('Ciudad: '+this.formFilter.value.city)
    console.log('Presupuesto: '+this.formFilter.value.maxBudget)
    console.log('Días: '+this.formFilter.value.maxDays)


    this.filter = new searchFilter(this.formFilter.value.country, 
                                   this.formFilter.value.city,
                                   this.formFilter.value.maxBudget,
                                   this.formFilter.value.maxDays);
    //console.log(this.filter)
      
    this.buscadorService.postFilter(this.filter).subscribe(
     response => {
      var res = response 
      this.itineraries=res.content
      //console.log("Itinerarios: ",this.itineraries)
      //this.router.navigate(['/buscador']); 
      if(!(this.itineraries.length>0)){
        this.noItinerariesFound="No hay itinerarios según el criterio de busqueda introducido."
      }else{
        this.noItinerariesFound=""
      }
     },
     err => {
       console.log(err);
     })                         
  }


  OnChange(pais:string) {
    this.buscadorService.getCityByCountry(pais).subscribe(c => {this.city = c; this.formFilter.controls['city'].setValue('');} )
   
  }

}