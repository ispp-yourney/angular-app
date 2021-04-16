import { Component, OnInit } from '@angular/core';
import { LandmarkDto, Activity } from 'src/app/models/itinerary'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LandmarkService } from 'src/app/services/landmark.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-landmark-create',
  templateUrl: './landmark-create.component.html',
  styleUrls: ['./landmark-create.component.css']
})
export class LandmarkCreateComponent implements OnInit {
  
  formLandmark: FormGroup;
  countries: Array<string>
  
  constructor(private formBuilder: FormBuilder,
    private landmarkService: LandmarkService, 
    private tokerService: TokenService, 
    private router: Router,
    private countryService: CountryService) { 

    
    this.formLandmark = this.formBuilder.group({
            name: ['', Validators.required],
            description2: ['', Validators.required],
            price: ['0', Validators.min(0)],
            country: [''],
            city: [''],
            latitude: ['', [Validators.min(-90), Validators.max(90)]],
            longitude: ['', [Validators.min(-180), Validators.max(180)]],
            category: [''],
            email: ['', [Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
            phone: ['', Validators.pattern("^[+]*\\([0-9]{1,4}\\)[-\\s\\./0-9]*$")],
            website: ['', Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")],
            instagram: ['', Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")],
            twitter: ['', Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")]
  });

  }

  activity:Activity;

  ngOnInit(): void {
    this.countries = this.countryService.getAllCountries()

  }
  
  onCreate(){
    
    var newLand = new LandmarkDto(0, this.formLandmark.value.name, this.formLandmark.value.description2, this.formLandmark.value.price, this.formLandmark.value.country, 
      this.formLandmark.value.city, this.formLandmark.value.latitude, this.formLandmark.value.longitude, this.formLandmark.value.category, this.formLandmark.value.email,
      this.formLandmark.value.phone, this.formLandmark.value.website, this.formLandmark.value.instagram, this.formLandmark.value.twitter,null)
    this.landmarkService.nuevo(newLand).subscribe(
          data => {
            
        this.router.navigate(["buscadorLandmark/"]).then( () => window.location.reload())

          }, err => {
            
          })
      }

     



}
