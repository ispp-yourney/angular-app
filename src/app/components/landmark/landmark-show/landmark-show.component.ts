import { Component, OnInit } from '@angular/core';
import { Landmark, LandmarkDto } from 'src/app/models/itinerary';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LandmarkService } from 'src/app/services/landmark.service';
import { TokenService } from 'src/app/services/token.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landmark-show',
  templateUrl: './landmark-show.component.html',
  styleUrls: ['./landmark-show.component.css']
})
export class LandmarkShowComponent implements OnInit {

  constructor(private landmarkService:LandmarkService,private route: ActivatedRoute, private tokenService: TokenService, private router: Router, private formBuilder: FormBuilder) { }

  landmark:Landmark;
  isAdmin:boolean;
  containError: boolean = false;
  messageError: string;
  loaded: boolean = false;
  currentlySponsored = false;
  endSponsoredDate = null;
  editForm: FormGroup;
  tieneActividades: boolean = true;

  ngOnInit(): void {
    this.isAdmin=this.tokenService.getAuthorities()[0]['authority'] == 'ROLE_ADMIN'
    if(this.isAdmin){
      this.editForm = this.formBuilder.group({
        name: ['', Validators.required],
        description:['', Validators.required],
        price: ['0', Validators.min(0)],
        country: [''],
        category: [''],
        city: [''],
        latitude: ['', [Validators.min(-90), Validators.max(90)]],
        longitude: ['', [Validators.min(-180), Validators.max(180)]],
        email: ['', [Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        phone: ['', Validators.pattern("^[+]*\\([0-9]{1,4}\\)[-\\s\\./0-9]*$")],
        website: ['', Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")],
        instagram: ['', Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")],
        twitter: ['', Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")]
      })
    }
    this.loadLandmark();
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
          console.log("Primer paso")
          this.editForm.controls['name'].setValue(data.name);
          this.editForm.controls['description'].setValue(data.description);
          this.editForm.controls['price'].setValue(data.price);
          this.editForm.controls['country'].setValue(data.country);
          this.editForm.controls['city'].setValue(data.city);
          this.editForm.controls['latitude'].setValue(data.latitude);
          this.editForm.controls['longitude'].setValue(data.longitude);
          this.editForm.controls['category'].setValue(data.category);
          this.editForm.controls['email'].setValue(data.email);
          this.editForm.controls['phone'].setValue(data.phone);
          this.editForm.controls['website'].setValue(data.website);
          this.editForm.controls['instagram'].setValue(data.instagra,);
          this.editForm.controls['twitter'].setValue(data.twitter);
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
      this.landmark.country,
      this.editForm.value.city,
      this.editForm.value.latitude,
      this.editForm.value.longitude,
      this.landmark.category,
      this.editForm.value.email,
      this.editForm.value.phone,
      this.editForm.value.website,
      this.editForm.value.instagram,
      this.editForm.value.twitter,
      0);
    this.landmarkService.editar(editedLandmark).subscribe(
      data => {
        () => {
          return new Promise((resolve, reject) => {
            setTimeout( () => {
             resolve( this.router.navigate(['/punto_interes/' + this.landmark.id]).then( () => {window.location.reload()} ))
            }, 500)
          })
        };
      }, err => {
        
      }
    )
  }

  onDelete(){
    this.landmarkService.deleteLandmark(this.landmark.id).subscribe(data => {
      this.router.navigateByUrl('/buscadorLandmark')
    }, err => {
      // console.log(err)
    })
  
  }

}
