import { Component, OnInit } from '@angular/core';
import { Landmark, LandmarkDto } from 'src/app/models/itinerary';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LandmarkService } from 'src/app/services/landmark.service';
import { TokenService } from 'src/app/services/token.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkRange } from '../../itinerary/itineraryupdate/itineraryupdate.component';
import { CountryService } from 'src/app/services/country.service';
import { ImageService } from 'src/app/services/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landmark-show',
  templateUrl: './landmark-show.component.html',
  styleUrls: ['./landmark-show.component.css']
})
export class LandmarkShowComponent implements OnInit {

  constructor(private landmarkService:LandmarkService,
    private route: ActivatedRoute, 
    private tokenService: TokenService, 
    private router: Router,
     private formBuilder: FormBuilder,
      private countryService: CountryService,
      private imageService: ImageService,
      private toastr: ToastrService) { }

  landmark:Landmark;
  isAdmin:boolean;
  containError: boolean = false;
  messageError: string;
  loaded: boolean = false;
  currentlySponsored = false;
  endSponsoredDate = null;
  editForm: FormGroup;
  tieneActividades: boolean = true;
  isAnonymous: boolean = true;
  countries: Array<string>

  checkPrice(control: AbstractControl): {[key: string]: any} | null {
    const price =  parseFloat(control.value)
    if(price<0 || price >=10000 ){
        return {'maxPrice': true}
    }else{
      return null
    }

  }

  ngOnInit(): void {
    if(this.tokenService.getAuthorities().length > 0){
      this.isAdmin=this.tokenService.getAuthorities()[0]['authority'] == 'ROLE_ADMIN';
      this.isAnonymous=false;
    }
    if(this.isAdmin){
      this.countries = this.countryService.getAllCountries()
      this.editForm = this.formBuilder.group({
        name: ['', [Validators.required, this.checkSpaces, Validators.maxLength(50)]],
        description:['', [Validators.required, this.checkSpaces, Validators.maxLength(1000)]],
        price: ['0', [Validators.required,this.checkPrice,Validators.maxLength(8), Validators.pattern("^[+]?[0-9]{1,4}(?:\\.[0-9]{1,2})?$")]],
        country: ['', Validators.required],
        category: [''],
        city: ['', [Validators.required,  this.checkSpaces, Validators.pattern("^([a-zA-Z ñÑá-úÁ-Ú])*$"),Validators.maxLength(100)]],
        latitude: ['', [Validators.pattern("^[+-]?[0-9]{1,3}(?:\\.[0-9]{1,10})?$"), checkRange(-90,90), Validators.required]],
        longitude: ['', [Validators.pattern("^[+-]?[0-9]{1,3}(?:\\.[0-9]{1,10})?$"), checkRange(-180,180), Validators.required]],
        email: ['', [Validators.email, Validators.pattern("^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")]],
        phone: ['', Validators.pattern("^(([+][(][0-9]{1,3}[)][ ])?([0-9]{6,12}))$")],
        website: ['', [Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"), Validators.maxLength(300)]],
        instagram: ['', [Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"),Validators.maxLength(300)]],
        twitter: ['', [Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"), Validators.maxLength(300)]],
        landmarkImage: [this.formBuilder.control(File)]

      })
    }
    this.loadLandmark();
  }

  checkSpaces(control: AbstractControl): {[key: string]: any} | null {
    const input = control.value
    if(input != null && input.trim().length == 0 ){
        return {'required': true}
    }
  }

  loadLandmark(): void {
    this.landmarkService.mostrar(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
      data => {
        
        this.landmark = data;
        this.landmarkService.tieneActividades(this.landmark.id).subscribe(data => this.tieneActividades = data);
        this.containError = false
        this.loaded = true;
        if(new Date(this.landmark.endPromotionDate) > new Date()){
          this.currentlySponsored = true;
          this.endSponsoredDate = (new Date(this.landmark.endPromotionDate)).toLocaleString();
        }

        if(this.isAdmin) {
          this.editForm.controls['name'].setValue(data?.name);
          this.editForm.controls['description'].setValue(data?.description);
          this.editForm.controls['price'].setValue(data?.price);
          this.editForm.controls['country'].setValue(data?.country);
          this.editForm.controls['city'].setValue(data?.city);
          this.editForm.controls['latitude'].setValue(data?.latitude);
          this.editForm.controls['longitude'].setValue(data?.longitude);
          this.editForm.controls['category'].setValue(data?.category.toUpperCase());
          this.editForm.controls['email'].setValue(data?.email);
          this.editForm.controls['phone'].setValue(data?.phone);
          this.editForm.controls['website'].setValue(data?.website);
          this.editForm.controls['instagram'].setValue(data?.instagram);
          this.editForm.controls['twitter'].setValue(data?.twitter);
        }

      },
      err => {
        var returned_error = err.error.text
        if(returned_error == undefined){
          returned_error = 'Ha ocurrido un error'
        }
        this.messageError = returned_error;
        this.containError = true
      }
    );
  }

  hrefWindowLocation(data:any){
    window.location.href= data.text
  }

  upgradeLandmark(){
    this.landmarkService.upgradeLandmark(this.landmark.id).subscribe(
      data => {
        this.hrefWindowLocation(data)
      },
      err => {
        this.messageError=err.error.text;
      }
    )
    
  }

  onUpdate() {


    //Actualizar landmark
    var editedLandmark = new LandmarkDto(
      this.landmark.id,
      this.editForm.value.name,
      this.editForm.value.description,
      this.editForm.value.price,
      this.editForm.value.country,
      this.editForm.value.city,
      this.editForm.value.latitude,
      this.editForm.value.longitude,
      this.editForm.value.category,
      this.editForm.value.email,
      this.editForm.value.phone,
      this.editForm.value.website,
      this.editForm.value.instagram,
      this.editForm.value.twitter,
      0);
    this.landmarkService.editar(editedLandmark).subscribe(
      data => {

        if(this.editForm.controls['landmarkImage'].value.name != undefined && data){
                      
          this.uploadLandmarkImage(this.editForm.controls['landmarkImage'].value, data.id)

          }

          return new Promise((resolve, reject) => {
            setTimeout( () => {
             resolve( this.router.navigate(['/punto_interes/' + this.landmark.id]).then( () => {this.reloadPage()} ))
            }, 500)
          })
      }, err => {
        
      }
    )
  }

  reloadPage(){window.location.reload()}


  onDelete(){
    this.landmarkService.deleteLandmark(this.landmark.id).subscribe(data => {
      this.router.navigateByUrl('/buscador_punto_interes')
    }, err => {
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

    
    addLandmarkImage(files: FileList, value) {
      const file = files.item(0)

      if( file?.size <= 4000000 && file?.type == 'image/jpeg' || file?.type == 'image/png'){
  
        this.editForm.controls['landmarkImage'].setValue(file)
  
      }else{
        
        value.value = ""
        
        if(!(file?.type == 'image/jpeg' || file?.type == 'image/png')){
  
          this.toastr.error("Las imágenes deben ser de tipo jpg o png.")
  
        }else if(!(file?.size <= 4000000)){
          this.toastr.error("Las imágenes no pueden ser superiores a 4mb.")
  
        }
      }
        
     
  
     
    }

    uploadLandmarkImage(file: File, landmarkId: number) {
      this.imageService.addLandmarkPhoto(landmarkId, file).subscribe(
        data => {
        },
        err => {
          this.toastr.success("Se ha producido un error al subir la imagen.")

        }
      )
    }
}
