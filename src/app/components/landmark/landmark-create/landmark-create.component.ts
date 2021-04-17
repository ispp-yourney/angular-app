import { Component, OnInit } from '@angular/core';
import { ActivityDto, ItineraryDto, Itinerary, LandmarkDto, Activity } from 'src/app/models/itinerary'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LandmarkService } from 'src/app/services/landmark.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landmark-create',
  templateUrl: './landmark-create.component.html',
  styleUrls: ['./landmark-create.component.css']
})
export class LandmarkCreateComponent implements OnInit {
  
  formLandmark: FormGroup;
  
  constructor(private formBuilder: FormBuilder,private landmarkService: LandmarkService, private tokerService: TokenService, private router: Router, private toastr: ToastrService) { 

    
    this.formLandmark = this.formBuilder.group({
            name: ['', [Validators.required,Validators.maxLength(50)]],
            description2: ['', [Validators.required, Validators.maxLength(1000)]],
            price: ['0', Validators.min(0)],
            country: ['', Validators.required],
            city: ['', Validators.required],
            latitude: ['', Validators.pattern("^(\\-?([0-8]?[0-9](\\.\\d+)?|90(.[0]+)?)\\s?)$")],
            longitude: ['', Validators.pattern("^(\\-?([1]?[0-7]?[0-9](\\.\\d+)?|180((.[0]+)?)))$")],
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


  }
  
  onCreate(){
    
    var newLand = new LandmarkDto(0, this.formLandmark.value.name, this.formLandmark.value.description2, this.formLandmark.value.price, this.formLandmark.value.country, 
      this.formLandmark.value.city, this.formLandmark.value.latitude, this.formLandmark.value.longitude, this.formLandmark.value.category, this.formLandmark.value.email,
      this.formLandmark.value.phone, this.formLandmark.value.website, this.formLandmark.value.instagram, this.formLandmark.value.twitter,null)
    this.landmarkService.nuevo(newLand).subscribe(
          data => {
        //console.log(data)
        this.router.navigate(["punto_interes/" + data.id]).then( () => window.location.reload())
        this.toastr.success("Punto de interés creado correctamente.")

          }, err => {
        //console.log(err)
        this.toastr.error("Se ha producido un error en la creación del punto de interés.")
          })
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
        console.log(inputClass)
        }


}
