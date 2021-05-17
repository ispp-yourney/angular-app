import { Component,  OnInit  } from '@angular/core';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { ActivityService } from 'src/app/services/activity.service';
import { LandmarkService } from 'src/app/services/landmark.service';
import { ActivityDto, ItineraryDto, Itinerary, LandmarkDto } from 'src/app/models/itinerary'
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from 'src/app/services/country.service';
import { checkRange } from '../itineraryupdate/itineraryupdate.component';


@Component({
  selector: 'app-itineraryform',
  templateUrl: './itineraryform.component.html',
  styleUrls: ['./itineraryform.component.css']
})
export class ItineraryformComponent implements OnInit {
  idLandmark: number;
  newItinerary: ItineraryDto;
  auxItinerary: Itinerary;
  formItiner: FormGroup;

  createLandmark: string = "none"
  shareLandmark: string = "none"

  itineraryImage: File
  ocultdAddLandmark: boolean = false;

  countries: Array<string>
 

  

  constructor(private formBuilder: FormBuilder,
    private itineraryService: ItineraryService,
    private activityService: ActivityService,
    private landmarkService: LandmarkService,
    private imageService: ImageService,
    private router: Router,
    private toastr: ToastrService,
    private countryService: CountryService) {

    this.formItiner = formBuilder.group({
      name: ['',[Validators.required, this.checkSpaces, Validators.maxLength(50)]],
      description: ['', [Validators.required, this.checkSpaces, Validators.maxLength(1000)]],
      budget: ['0', [Validators.required, Validators.min(0)]],
      recommendedSeason: ['', Validators.required],
      days: this.formBuilder.array([], Validators.required),
    })


  }

  ngOnInit(): void {
    this.toastr.info("Los itinerarios deben contener al menos un día y una actividad en el mismo.")
    this.countries = this.countryService.getAllCountries()

  }

  addDay() {

    const day = this.formBuilder.group({
      activities: this.formBuilder.array([], Validators.required)
    });

    (this.formItiner.get('days') as FormArray).push(day);

  }

  addActivity(pepe: FormArray) {


    const activity = this.formBuilder.group({
      title: ['',[Validators.required, this.checkSpaces, Validators.maxLength(50)]],
      description:  ['', [Validators.required, this.checkSpaces, Validators.maxLength(1000)]],
      landmark: this.formBuilder.array([],Validators.required ),
      landmarkId: [''],
      searchLandmark: ['none'],
      action:['true'],
      landmarkImage:[''],
      landmarkName:[''],
      newActivity:['true']
      
      
    });



    pepe.push(activity);
  }

  checkPrice(control: AbstractControl): {[key: string]: any} | null {
    const price =  parseFloat(control.value)
    if(price<0 || price >=10000 ){
        return {'maxPrice': true}
    }else{
      return null
    }

  }

  checkSpaces(control: AbstractControl): {[key: string]: any} | null {
    const input = control.value
    if( input != null && input.trim().length == 0 ){
        return {'required': true}
    }
  }



  addLandmark(activity: FormArray){
    activity.controls['action'].setValue("false")
    activity.controls['searchLandmark'].reset()
    activity.controls['searchLandmark'].setValue("none")
    activity.controls['landmarkId'].reset()
    activity.controls['landmarkId'].setValue("")
    activity.controls['landmarkImage'].reset()
    activity.controls['landmarkImage'].setValue("")
    activity.controls['landmarkName'].reset()
    activity.controls['landmarkName'].setValue("")

    const landmark = this.formBuilder.group({
      name: ['', [Validators.required, this.checkSpaces, Validators.maxLength(50)]],
      description2: ['', [Validators.required, this.checkSpaces, Validators.maxLength(1000)]],
      price: ['0', [Validators.required,this.checkPrice,Validators.maxLength(8), Validators.pattern("^[+]?[0-9]{1,4}(?:\\.[0-9]{1,2})?$")]],
      country: ['', Validators.required],
      city: ['', [Validators.required, this.checkSpaces, Validators.pattern("^([a-zA-Z ñÑá-úÁ-Ú])*$"),Validators.maxLength(100)]],
      latitude: ['', [Validators.pattern("^[+-]?\\d*\\.?\\d{0,10}$"), checkRange(-90,90), Validators.required]],
      longitude: ['', [Validators.pattern("^[+-]?\\d*\\.?\\d{0,10}$"), checkRange(-180,180), Validators.required]],
      category: [''], 
      email: ['', [Validators.email, Validators.pattern("^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$")]],
      phone: ['', Validators.pattern("^(([+][(][0-9]{1,3}[)][ ])?([0-9]{6,12}))$")],
      website: ['', [Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"), Validators.maxLength(300)]],
      instagram: ['', [Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"),Validators.maxLength(300)]],
      twitter: ['', [Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"), Validators.maxLength(300)]],
      landmarkImage: [this.formBuilder.control(File)]
    });

    activity.controls['landmark'].push(landmark);

  }

  existLandmark(activity: FormGroup, data){

    activity.controls['landmarkId'].setValue(data)
    activity.controls['landmarkImage'].setValue(data.image.imageUrl)
    activity.controls['landmarkName'].setValue(data.name)

    activity.get('landmark').disable()
    activity.controls['searchLandmark'].setValue("none")
  }


  clickLandmarkShare(activity: FormGroup, data) {
    activity.controls['action'].setValue("true")

    activity.controls['searchLandmark'].setValue("block")
    

    activity.get('landmark')['controls'].pop()
    activity.controls['landmark'].reset()
    
   
   
    
  }


  removeDay(i: number) {
    (this.formItiner.get('days') as FormArray).removeAt(i);

    this.toastr.success("Día eliminado correctamente")

    if(i == 0){

      this.toastr.info("Los itinerarios deben contener al menos un día y una actividad en el mismo.")

    }

  }



  removeActivity(daysList: FormArray, i: number) {
    daysList.removeAt(i);
    this.toastr.success("Actividad eliminada correctamente")
  }

  getItineraryPrice(itinerary: FormGroup) {

    let totalPrice: number = 0;

    if (itinerary.get('days')['controls'].length > 0) {

      for (let day of itinerary.get('days')['controls']) {
        if (day.get('activities')['controls'].length > 0) {

          for (let activity of day.get('activities')['controls']) {
            if (activity.value.landmarkId == '') {
              totalPrice = totalPrice + parseFloat(activity.value.landmark[0].price);
              
            } else {
              totalPrice = totalPrice + parseFloat(activity.value.landmarkId.price);
            }
          }
        }
      }
    }
    return totalPrice;
  }



  onCreate(): void {
    var totalDays = this.formItiner.controls.days as FormArray;
    
    var numb = totalDays.length;

    this.getItineraryPrice(this.formItiner)

    this.newItinerary = new ItineraryDto(0,
      this.formItiner.value.name,
      this.formItiner.value.description,
      numb,
      this.getItineraryPrice(this.formItiner),
      this.formItiner.value.recommendedSeason,
      "PUBLISHED");

    this.itineraryService.nuevo(this.newItinerary).subscribe(
      data => {

        var dia = 1

        // add photo
        if(this.itineraryImage != undefined){
          
          this.uploadItineraryImage(this.itineraryImage, data.id)
        }

        for (let day of this.formItiner.get('days')['controls']) {
          for (let activity of day.get('activities')['controls']) {
            let landmark = activity.value.landmarkId
          
            var newAct = new ActivityDto(0, activity.value.title, activity.value.description, dia, data.id, landmark == '' ? 0 : activity.value.landmarkId.id)
            this.activityService.nuevo(newAct).subscribe(
              data => {
                if(landmark == ''){
                  
                 var newLand = new LandmarkDto(0, activity.value.landmark[0].name, activity.value.landmark[0].description2, activity.value.landmark[0].price, activity.value.landmark[0].country,
                   activity.value.landmark[0].city, activity.value.landmark[0].latitude, activity.value.landmark[0].longitude, activity.value.landmark[0].category, activity.value.landmark[0].email == '' ? null : activity.value.landmark[0].email,
                   activity.value.landmark[0].phone == '' ? null : activity.value.landmark[0].phone, activity.value.landmark[0].website,activity.value.landmark[0].instagram, activity.value.landmark[0].twitter, data.id)

                   
                 this.landmarkService.nuevo(newLand).subscribe(
                 data => {
                    
                    if(activity.get('landmark')['controls'][0]['controls'].landmarkImage.value.name != undefined && data){
                      
                      this.uploadLandmarkImage(activity.value.landmark[0].landmarkImage, data.id)
                      }

                 }, err => {
                   this.toastr.error("Se ha producido un error")
                   })
                  }
              
              },
              err => {
                
                this.toastr.error("Se ha producido un error")
              }
            )

          }
          dia++;
        }
        this.toastr.success("Itinerario creado correctamente")
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(this.router.navigate(['/itinerarios/' + data.id]).then(() => { this.reloadPage() }))
          }, 3500)
        })
        
      },
      err => {
        this.toastr.error("Se ha producido un error")
      }

    )

  }

  reloadPage(){window.location.reload()}


  addedImages(form: FormGroup){
    
    let fileNames: Array<any> = [];

    if(form.get('days')['controls'].length > 0){
      
      for (let day of form.get('days')['controls']) {

        if(day.get('activities')['controls'].length > 0){
              
            for (let activity of day.get('activities')['controls']) {
              if(activity.get('landmark')['controls'].length > 0){

              if(activity.value.landmarkId == '' && activity.get('landmark')['controls'][0]['controls'].landmarkImage.value.name != undefined  ){
                  
                
                fileNames.push(activity.get('landmark')['controls'][0]['controls'].landmarkImage.value.name)
                
              }
            }

              }
          }
      }
  }
  return fileNames;
  }

  addItineraryImage(files: FileList,value) {
    const file = files.item(0)

    let fileNames: Array<any> = this.addedImages(this.formItiner)
    
    if(fileNames.indexOf(file?.name) == -1 && file.size <= 4000000 && (file?.type == 'image/jpeg' || file?.type == 'image/png')){
      this.itineraryImage = files.item(0)

    }else{
      value.value = ""
 
      
      if(!(file?.type == 'image/jpeg' || file?.type == 'image/png')){

        this.toastr.error("Las imágenes deben ser de tipo jpg o png.")

      }else if(!(fileNames.indexOf(file?.name) == -1) ){

        this.toastr.error("No puede subir dos fotos iguales. La imagen no se enviará.")

      }else if(!(file.size <= 4000000)){
        this.toastr.error("Las imágenes no pueden ser superiores a 4mb.")

      }
      
    }
    
  }
  
 
  

  addLandmarkImage(files: FileList, activity: FormGroup,value) {
    const file = files.item(0)
    let fileNames: Array<any> = this.addedImages(this.formItiner)

    if(file?.name != this.itineraryImage?.name && fileNames.indexOf(file?.name) == -1 && file.size <= 4000000 && (file?.type == 'image/jpeg' || file?.type == 'image/png')){
      
      activity.get('landmark')['controls'][0]['controls'].landmarkImage.setValue(file)
     
    }else{
      
      value.value = ""
      
      if(!(file?.type == 'image/jpeg' || file?.type == 'image/png')){

        this.toastr.error("Las imágenes deben ser de tipo jpg o png.")

      }else if(!(fileNames.indexOf(file?.name) == -1) ){

        this.toastr.error("No puede subir dos fotos iguales. La imagen no se enviará.")

      }else if(!(file.size <= 4000000)){
        this.toastr.error("Las imágenes no pueden ser superiores a 4mb.")

      }

    }
   
  }

  uploadItineraryImage(file: File, itineraryId: number) {
    this.imageService.addItineraryPhoto(itineraryId, file).subscribe(
      data => {
        
      },
      err => {
        
        this.toastr.error("Se ha producido un error al subir la imagen del itinerario.")

      }
    )
  }

  uploadLandmarkImage(file: File, landmarkId: number) {
    this.imageService.addLandmarkPhoto(landmarkId, file).subscribe(
      data => {
        
      },
      err => {
      
        this.toastr.error("Se ha producido un error al subir la imagen del punto de interés.")

      }
    )
  }

  resetForm(activity: FormGroup){
    activity.reset()
    
    activity.controls['description'].reset()
    activity.controls['description'].setValue("")
    activity.controls['title'].reset()
    activity.controls['title'].setValue("")

    activity.get('landmark')['controls'].pop()

   

    activity.controls['action'].setValue("true")
    activity.controls['searchLandmark'].setValue("none")
    activity.controls['landmarkId'].setValue("")
    activity.controls['landmarkImage'].setValue("")
    activity.controls['landmarkName'].setValue("")
    activity.controls['newActivity'].setValue("true")
    

    if (!activity.valid) {
        this.toastr.error("La actividad no se ha completado.")
    }

    }
  
    


    notificationActivity(activity: FormGroup) {
      if (activity.get('newActivity').value == 'false') {
        this.toastr.success("Actividad editada correctamente")
      } else {
        this.toastr.success("Actividad añadida correctamente")
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            activity.controls['newActivity'].setValue('false')
          }, 1000)
        })
      }
    }

    checkActivity(activity: FormGroup){

      if(!activity.valid){
          this.toastr.error("Actividad no completada")
      }

      

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