import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import { searchFilter } from 'src/app/models/search-filters';
import { BuscadorService } from '../../servicios/buscador.service';

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

  constructor(private buscadorService:BuscadorService, 
              private formBuilder:FormBuilder,
              private router: Router,){
                this.formFilter = formBuilder.group({
                  country: '',
                  city: '',
                  maxBudget: '',
                  maxDays: '',
                });
              }

  static result = "";

  ngOnInit() {

    this.buscadorService.getAllCountry().subscribe(c => {this.country = c; } )
    this.buscadorService.getAllCity().subscribe(c => {this.city = c; } )     
  }

  onRegister(){
    console.log(this.formFilter.value.country, 
      this.formFilter.value.city,
      this.formFilter.value.maxBudget,
      this.formFilter.value.maxDays)
    this.filter = new searchFilter(this.formFilter.value.country, 
                                   this.formFilter.value.city,
                                   this.formFilter.value.maxBudget,
                                   this.formFilter.value.maxDays,)

    this.buscadorService.postFilter(this.filter).subscribe(
     response => {
      var res = response 
      this.router.navigate(['/']); 
     })                         
  }


  OnChange(pais:string) {
    this.buscadorService.getCityByCountry(pais).subscribe(c => {this.city = c; } )
   
  }


}