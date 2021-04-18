import { Component, OnInit } from '@angular/core';
import { LandmarkDto, Activity } from 'src/app/models/itinerary'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LandmarkService } from 'src/app/services/landmark.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from 'src/app/services/country.service';
import { ImageService } from 'src/app/services/image.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-landmark-create',
  templateUrl: './landmark-create.component.html',
  styleUrls: ['./landmark-create.component.css']
})
export class LandmarkCreateComponent implements OnInit {
  
  formLandmark: FormGroup;
  countries: Array<string>
  
  checkPrice(control: AbstractControl): {[key: string]: any} | null {
    const price =  parseFloat(control.value)
    console.log(control.value )
    if(price>=0 && price <=10000 ){
        return null
    }else{
      return {'maxPrice': true}
    }

  }
  
  constructor(private formBuilder: FormBuilder,
    private landmarkService: LandmarkService, 
    private tokerService: TokenService, 
    private router: Router,
    private toastr: ToastrService,
    private countryService: CountryService,
    private imageService: ImageService,
    ) { 

    
    this.formLandmark = this.formBuilder.group({
            name: ['', [Validators.required,Validators.maxLength(50)]],
            description2: ['', [Validators.required, Validators.maxLength(1000)]],
            price: ['0', [Validators.required,this.checkPrice]],
            country: ['', Validators.required],
            city: ['', [Validators.required, Validators.pattern("^([a-zA-Z ])*$"),Validators.maxLength(100)]],
            latitude: ['', Validators.pattern("^(\\-?([0-8]?[0-9](\\.\\d+)?|90(.[0]+)?)\\s?)$")],
            longitude: ['', Validators.pattern("^(\\-?([1]?[0-7]?[0-9](\\.\\d+)?|180((.[0]+)?)))$")],
            category: [''],
            email: ['', [Validators.email, Validators.pattern("^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")]],
            phone: ['', Validators.pattern("^(([+][(][0-9]{1,3}[)][ ])?([0-9]{6,12}))$")],
            website: ['', [Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"), Validators.maxLength(300)]],
         
            instagram: ['', [Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"),Validators.maxLength(300)]],
            twitter: ['', [Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"), Validators.maxLength(300)]],
            landmarkImage: [this.formBuilder.control(File)]

  });

  }

  activity:Activity;

  ngOnInit(): void {
    this.countries = this.countryService.getAllCountries()

  }
  
  onCreate(){
   
    var newLand = new LandmarkDto(0, this.formLandmark.value.name, this.formLandmark.value.description2, this.formLandmark.value.price, this.formLandmark.value.country, 
      this.formLandmark.value.city, this.formLandmark.value.latitude, this.formLandmark.value.longitude, this.formLandmark.value.category, this.formLandmark.value.email == '' ? null : this.formLandmark.value.email ,
      this.formLandmark.value.phone == '' ? null : this.formLandmark.value.phone , this.formLandmark.value.website, this.formLandmark.value.instagram, this.formLandmark.value.twitter,null)
    this.landmarkService.nuevo(newLand).subscribe(
          data => {
            const wait = () => {
              return new Promise((resolve, reject) => {
                setTimeout( () => {
                  this.router.navigate(["punto_interes/" + data.id]).then( () => window.location.reload())
        
                }, 2000)
              })
            }
        console.log(this.formLandmark.controls['landmarkImage'].value )
        console.log(data.id)
        if(this.formLandmark.controls['landmarkImage'].value != undefined && data){
                      
          this.uploadLandmarkImage(this.formLandmark.controls['landmarkImage'].value, data.id)

          }
        
        this.toastr.success("Punto de interés creado correctamente.")
        wait()
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
        }

        addLandmarkImage(files: FileList) {
          const file = files.item(0)
   
            
          this.formLandmark.controls['landmarkImage'].setValue(file)
      
         
        }

        uploadLandmarkImage(file: File, landmarkId: number) {
          this.imageService.addLandmarkPhoto(landmarkId, file).subscribe(
            data => {
              // console.log(data)
            },
            err => {
              // console.log(err)
            }
          )
        }


}
